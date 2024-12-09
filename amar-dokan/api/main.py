
import bcrypt
import uuid
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

# from passlib.context import CryptContext
from fastapi import status
from database import engine, SessionLocal
import models, schemas
from otp import send_otp, verify_otp_service
from sqlalchemy.orm import Session


models.Base.metadata.create_all(bind=engine)


def db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


SECRET_KEY = "25bacc49d96159274d071f31f491fa10330d39daba559f46bd52c97c08a20024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr | None = None
    active: bool | None = None

# Product Model
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), description="Unique identifier for the product")
    name: str = Field(..., description="Name of the product")
    image: str = Field(..., description="Image of the product")
    description: Optional[str] = Field(None, description="Detailed description of the product")
    price: float = Field(..., gt=0, description="Product price (must be positive)")
    category: Optional[str] = Field(None, description="Product category")
    subCategory: Optional[str] = Field(None, description="Product sub-category")
    stockQuantity: int = Field(0, description="Product availability status")

class OAuth2PasswordRequestJSON(BaseModel):
    email: str
    password: str


class UserInDB(User):
    hashed_password: str


class OTPVerificaiton(BaseModel):
    email: str
    otp: str


# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = HTTPBearer()

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode(), hashed_password)


# def get_password_hash(password):
#     return pwd_context.hash(password)


def get_user(db, email: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    return user
    # if username in db:
    #     user_data = db[username]
    #     return UserInDB(**user_data)


def authenticate_user(db, username: str, password: str):
    user: models.User = get_user(db, username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    hashed_sk = bcrypt.hashpw(user.special_key, user.salt)
    password_obj: models.Password = (
        db.query(models.Password)
        .filter(models.Password.hashed_special_key == hashed_sk)
        .first()
    )
    if not verify_password(password, password_obj.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.active:
        raise HTTPException(401, detail="user is not active")
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(db=Depends(db), token: str = Depends(oauth2_scheme)):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credential_exception

        token_data = TokenData(email=email)
    except JWTError:
        raise credential_exception

    user = get_user(db, email=token_data.email)
    if user is None:
        raise credential_exception

    return user


async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    if not current_user.active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return current_user


@app.post("/login", response_model=Token, tags=["Authentication"])
async def login_for_access_token(form_data: OAuth2PasswordRequestJSON, db=Depends(db)):
    user = authenticate_user(db, form_data.email, form_data.password)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "firstname": user.first_name, "lastname": user.last_name, "is_active": user.active }, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=User, tags=["User Perform"])
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/users/me/items", tags=["User Perform"])
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": 1, "owner": current_user}]


@app.post("/register", tags=["Registration"])
def create_user(requested_user: schemas.UserCreate, db: Session = Depends(db)):
    check_user = (
        db.query(models.User).filter(models.User.email == requested_user.email).first()
    )
    if check_user is not None:
        raise HTTPException(400, detail="user is already registered")
    else:
        salt = bcrypt.gensalt()
        sk = bcrypt.hashpw(requested_user.email.encode(), salt)
        new_user = models.User(
            first_name=requested_user.first_name,
            last_name=requested_user.last_name,
            email=requested_user.email,
            special_key=sk,
            salt=salt,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        hashed_password = bcrypt.hashpw(
            requested_user.password.encode(), bcrypt.gensalt()
        )
        hashed_special_key = bcrypt.hashpw(sk, salt)
        user_password = models.Password(
            password=hashed_password, hashed_special_key=hashed_special_key
        )
        db.add(user_password)
        db.commit()
        db.refresh(user_password)
        send_otp(new_user.email)
        return {"detail": "User Created"}


@app.post("/verify", tags=["Registration"])
def verify_otp(data: OTPVerificaiton, db: Session = Depends(db)):
    is_valid = verify_otp_service(data.email, otp=data.otp)
    if is_valid:
        user = db.query(models.User).filter(models.User.email == data.email).first()
        print(user)
        user.active = True
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"detail": "User activation successful"}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid otp"
        )


@app.get("/products", response_model=List[Product], summary="List all products")
async def list_products(
    category: Optional[str] = None, 
    search_Text: Optional[float] = None
):
    database = Depends(db)
    filtered_products = database.query(models.Product).filter(category is None or (category is not None and category == models.Product.category) and search_Text is None or (search_Text is not None and search_Text in models.Product.name))
    return filtered_products