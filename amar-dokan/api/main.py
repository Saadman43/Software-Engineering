from fastapi import FastAPI, Depends,  status, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
from jose import jwt
import bcrypt
import models, schemas
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
import random
import smtplib
from email.message import EmailMessage
from datetime import datetime, timedelta, timezone
from typing import Union, Optional
from io import BytesIO
from fastapi.responses import StreamingResponse
from sqlalchemy import func
from urllib.parse import unquote

app = FastAPI()


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)


models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==================
# User Management
# ==================

@app.post("/user_registration/", status_code=status.HTTP_201_CREATED, tags=["User Management"])
def create_user(requested_user: schemas.UserBase, db: Session = Depends(get_db)):
    print(requested_user) 
    salt = bcrypt.gensalt()
    id = ""
    for i in range(10):
        id += str(random.randint(0,9))
    hashed_password = bcrypt.hashpw(requested_user.password.encode(), salt)
    hashed_login_id = bcrypt.hashpw(id.encode(), salt)
    check_user_mail = db.query(models.User).filter(models.User.email == requested_user.email).first()
    check_user_name = db.query(models.User).filter(models.User.user_name == requested_user.user_name).first()
    check_user_mobile = db.query(models.User).filter(models.User.mobile_number == requested_user.mobile_number).first()
    if check_user_mail is not None:
        return {"detail": "Email already used"}
    elif check_user_name is not None:
        return {"detail": "Username already taken"}
    elif check_user_mobile is not None:
        return {"detail": "Mobile Number already used"}
    else:
        new_user = models.User(name = requested_user.name,
                               user_name = requested_user.user_name, 
                               email = requested_user.email,
                               mobile_number = requested_user.mobile_number, 
                               is_active = "0",
                               user_id = id,
                               role = 'customer',
                               salt = salt)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        new_user_password = models.Login(password = hashed_password, 
                                         user_id = hashed_login_id)
        db.add(new_user_password)
        db.commit()
        db.refresh(new_user_password)

        user_otp = ""
        for i in range(5):
            user_otp += str(random.randint(0,9))
        send_otp(requested_user.email, user_otp)
        new_user_otp = models.OTP(email = requested_user.email, 
                                  otp = user_otp)
        db.add(new_user_otp)
        db.commit()
        db.refresh(new_user_otp)
        return {"detail": "OTP Sent"}
    

@app.post("/user_login", tags=["User Management"])
def login(userLogin: schemas.UserLogin, db: Session = Depends(get_db)):
    #get_role = db.query(models.Login).filter(models.Login.role == "user").first()
    print(userLogin.email)
    get_user_name = db.query(models.User).filter(models.User.email == userLogin.email).first()
    if get_user_name is None:
        return {"detail": "Please do the registration first"}
    else:
        hashed_user_id = bcrypt.hashpw(get_user_name.user_id.encode(), get_user_name.salt if isinstance(get_user_name.salt, bytes) else get_user_name.salt.encode())
        result_set = db.query(models.Login).filter(models.Login.user_id == hashed_user_id).first() 
        if bcrypt.checkpw(get_user_name.user_id.encode(), result_set.user_id):       
            if get_user_name.is_active == "1":  
                hashed_password = result_set.password
                if bcrypt.checkpw(userLogin.password.encode(), hashed_password):
                    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
                    access_token = create_access_token(data={"sub": get_user_name.user_name,"name": get_user_name.name,"mobile_number": get_user_name.mobile_number,"is_active": get_user_name.is_active, "role": get_user_name.role}, expires_delta=access_token_expires)
                    return schemas.Token(access_token=access_token, token_type="bearer")
                else:
                    return {"detail": "invalid username or password"}
            else:
                return {"detail": "Activate your account by using OTP"}   


@app.put("/user_update/", tags=["User Management"])
def update_user(update_data: schemas.UserUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == update_data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if update_data.name:
        user.name = update_data.name
    if update_data.user_name:
        existing_user = db.query(models.User).filter(models.User.user_name == update_data.user_name).first()
        if existing_user and existing_user.user_id != update_data.user_id:
            raise HTTPException(status_code=400, detail="Username already taken")
        user.user_name = update_data.user_name
    if update_data.email:
        existing_email = db.query(models.User).filter(models.User.email == update_data.email).first()
        if existing_email and existing_email.user_id != update_data.user_id:
            raise HTTPException(status_code=400, detail="Email already in use")
        user.email = update_data.email
    if update_data.mobile_number:
        existing_mobile = db.query(models.User).filter(models.User.mobile_number == update_data.mobile_number).first()
        if existing_mobile and existing_mobile.user_id != update_data.user_id:
            raise HTTPException(status_code=400, detail="Mobile number already in use")
        user.mobile_number = update_data.mobile_number
    db.commit()
    db.refresh(user)
    return {"detail": "User updated successfully"}

    
@app.post("/delete_user_account/", tags=["User Management"])
def user_delete(delete_user: schemas.UserDelete, db: Session = Depends(get_db)):
    check_user_name = db.query(models.User).filter(models.User.user_name == delete_user.user_name).first()
    if check_user_name is None:
        return {"detail": "Something went wrong"}
    else:
        hashed_user_id = bcrypt.hashpw(check_user_name.user_id.encode(), check_user_name.salt if isinstance(check_user_name.salt, bytes) else check_user_name.salt.encode())
        db.query(models.Login).filter(models.Login.user_id == hashed_user_id).delete()
        db.query(models.User).filter(models.User.user_name == delete_user.user_name).delete()
        db.query(models.OTP).filter(models.OTP.email == check_user_name.email).delete()
        db.commit()
        return {"detail": "Account deleted"}    
    

# ==================
# OTP Management
# ==================
@app.get("/verify_otp/{email}/{otp}", tags=["OTP Management"])
def verify_otp(email, otp, db: Session = Depends(get_db)):
    print(email)
    print(unquote(email))
    check_otp = db.query(models.OTP).filter(models.OTP.email == unquote(email)).first()
    if check_otp is not None:
        if check_otp.otp == otp:
            activate = db.query(models.User).filter(models.User.email == check_otp.email).first()
            if activate is not None:
                activate.is_active = "1"
                db.commit()
                db.query(models.OTP).filter(models.OTP.email == email).delete()
                db.commit()
                return {"detail": "OTP used"}
        else:
            return {"detail": "Wrong OTP"}
    else:
        return {"detail": "No such user"}
    

@app.get("/resend_otp/{email}", tags=["OTP Management"])
def verify_otp(email, db: Session = Depends(get_db)):
    check_otp = db.query(models.OTP).filter(models.OTP.email == email).first()
    if check_otp is not None:
        db.query(models.OTP).filter(models.OTP.email == email).delete()
        db.commit()
        user_otp = ""
        for i in range(5):
            user_otp += str(random.randint(0,9))
        send_otp(email, user_otp)
        new_user_otp = models.OTP(email = email, 
                                  otp = user_otp)
        db.add(new_user_otp)
        db.commit()
        db.refresh(new_user_otp)
        return {"detail": "OTP Sent"}
    else:
        return {"detail": "No such user"}


# ==================
# Password Management
# ==================
@app.post("/forget_password/", tags=["Password Management"])
def user_forget_password(forget_user_password: schemas.UserForgetPassword, db: Session = Depends(get_db)):
    check_user_mail = db.query(models.User).filter(models.User.email == forget_user_password.email).first()
    if check_user_mail is not None:
        if check_user_mail.is_active == "1":
            check_user_password = db.query(models.Login).filter(models.Login.id == check_user_mail.id).first()
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(forget_user_password.password.encode(), salt)
            check_user_mail.is_active = "0"
            db.commit()
            check_user_password.password = hashed_password
            db.commit()
            user_otp = ""
            for i in range(5):
                user_otp += str(random.randint(0,9))
            send_otp(forget_user_password.email, user_otp)
            new_user_otp = models.OTP(email = forget_user_password.email, 
                                    otp = user_otp)
            db.add(new_user_otp)
            db.commit()
            db.refresh(new_user_otp)
            return {"detail": "OTP Sent"}
        else:
            return {"detail": "No account on this email"}
    else:
        return {"detail": "No account on this email"}
    

# ==================
# Delivery Man Management
# ==================
@app.get("/delivery_men/", tags=["Delivery Man Management"])
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).filter(models.User.role == 'delivery_man').all()
    return users

@app.get("/assigned_orders_to_delivery_man/{user_name}/{order_ids}", tags=["Delivery Man Management"])
def login(user_name: str, order_ids: str, db: Session = Depends(get_db)):
    user_details = db.query(models.User).filter(models.User.user_name == user_name).first()
    if not user_details:
        return {"detail": "Delivery man not found"}

    orderIds = order_ids.split(',');
    for item in orderIds:
        if item:
            print("item: " + item)
            db.query(models.Order).filter(models.Order.id == int(item)).update({'delivery_man': user_name})
    
    # Commit changes
    db.commit()
    
    return { "detail": "Delivery man assigned." }


# ==================
# Product Management
# ==================

# Add product item
@app.post("/product/", tags=["Product Management"])
async def add_product(
    product: schemas.ProductCreate = Depends(),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    image_data = await image.read()
    new_product = models.Product(
        name=product.name,
        image=image_data,
        price=product.price,
        description=product.description,
        category=product.category
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return {"detail": "Product item created", "product_id": new_product.id}


# Get all food items
@app.get("/products/", tags=["Product Management"])
def get_all_products(
    category: Optional[str] = None, 
    subCategory: Optional[str] = None, 
    searchText: Optional[str] = None,
    db: Session = Depends(get_db)):
    
    products = db.query(models.Product).filter((category is None or (category is not None and category == models.Product.category)) and(subCategory is None or (subCategory is not None and subCategory == models.Product.subCategory)) and (searchText is None or (searchText is not None and searchText in models.Product.name))).all()
    return products


# Get a single food item by ID
@app.get("/product/{product_id}/", tags=["Product Management"])
def get_product(product_id: int, db: Session = Depends(get_db)):
    product_item = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product_item:
        raise HTTPException(status_code=404, detail="Product item not found")
    return {
        "id": product_item.id,
        "name": product_item.name,
        "price": product_item.price,
        "description": product_item.description,
        "category": product_item.category,
        "image_url": f"http://localhost:8000/product/{product_id}/image"
    }

# Get the image of a food item
@app.get("/product/{product_id}/image", tags=["Product Management"])
def get_product_image(product_id: int, db: Session = Depends(get_db)):
    product_item = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product_item or not product_item.image:
        raise HTTPException(status_code=404, detail="Image not found")
    return StreamingResponse(BytesIO(product_item.image), media_type="image/png")

# Update Food Item
@app.put("/product/{product_id}/", tags=["Product Management"])
async def update_product(
    product_id: int,
    product: schemas.ProductCreate = Depends(),
    image: UploadFile = File(None),  # Image is optional for update
    db: Session = Depends(get_db)
):
    product_item = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product_item:
        raise HTTPException(status_code=404, detail="Product item not found")
    
    product_item.name = product.name
    product_item.price = product.price
    product_item.description = product.description
    product_item.category = product.category
    
    if image:
        image_data = await image.read()
        product_item.image = image_data

    db.commit()
    db.refresh(product_item)

    return {"detail": "Product item updated successfully", "product_id": product_item.id}


# Delete Food Item
@app.delete("/product/{product_id}/", tags=["Product Management"])
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product_item = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product_item:
        raise HTTPException(status_code=404, detail="Product item not found")

    db.delete(product_item)
    db.commit()

    return {"detail": "Product item deleted successfully"}


# ==================
# Order Management
# ==================
@app.post("/orders/", response_model=schemas.OrderResponse, tags=["Orders"])
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    # Create Order
    db_order = models.Order(
        user_name=order.user_name,
        address = order.address,
        total_amount=order.total_amount,
    )
    
    # Add to session
    db.add(db_order)
    db.flush()  # This will generate the order ID
    
    # Create Order Items
    order_items = []
    for item in order.order_items:
        db_order_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            quantity=item.quantity,
            unit_price=item.unit_price
        )
        order_items.append(db_order_item)
        db.add(db_order_item)
    
    # Commit changes
    db.commit()
    
    # Refresh to get full object with relationships
    db.refresh(db_order)
    
    return db_order


@app.get("/orders/{order_id}", response_model=schemas.OrderResponse, tags=["Orders"])
def get_order(order_id: int, db: Session = Depends(get_db)):

    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    order_items = db.query(models.OrderItem).filter(models.OrderItem.order_id == order_id).all()
    results = []
    for orderItem in order_items:
      results.append(schemas.OrderItemResponse(id=orderItem.id, order_id=orderItem.order_id, product_id=orderItem.product_id, product_name= orderItem.product_name, quantity=orderItem.quantity, unit_price=orderItem.unit_price))
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    orderResponse = schemas.OrderResponse(
        id= order.id,
        user_name=order.user_name,
        address= order.address,
        total_amount=order.total_amount,
        delivery_man= order.delivery_man,
        order_items=results
    )

    return orderResponse

# Get all food items
@app.get("/orders/", tags=["Orders"])
def get_all_orders(
    customer: Optional[str] = None, 
    delivery_man: Optional[str] = None, 
    db: Session = Depends(get_db)):
    orders = db.query(models.Order).filter((customer is None or (customer is not None and customer == models.Order.user_name)) and(delivery_man is None or (delivery_man is not None and delivery_man == models.delivery_man))).all()
    return orders

 
def send_otp(email, otp):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()

    from_mail = 'amardokan001@gmail.com'
    server.login(from_mail, 'mdiw fyor cvpq zril')
    to_mail = email

    msg = EmailMessage()
    msg['Subject'] = "OTP verification"
    msg['From'] = from_mail
    msg['TO'] = to_mail

    msg.set_content("Your OTP is: " + otp)

    server.send_message(msg)    