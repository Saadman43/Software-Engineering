from symtable import Class
from pydantic import BaseModel
from typing import Optional, List

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    name: str
    user_name: str
    email: str
    mobile_number: str
    password: str
    role: str
    
class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    user_id: str
    name: Optional[str] = None
    user_name: Optional[str] = None
    email: Optional[str] = None
    mobile_number: Optional[str] = None

class CheckUser(BaseModel):
    user_name: str
    password: str
    
class UserForgetPassword(BaseModel):
    email: str
    password: str

class UserDelete(BaseModel):
    user_name: str


class ProductCreate(BaseModel):
    name: str
    price: float
    description: str
    category: str


class Order(BaseModel):
    user_name: str
    product_id: int
    quantity: int
    address: str
    delivery_man: str
    
class OrderItemCreate(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    unit_price: float

class OrderCreate(BaseModel):
    user_name: str
    address: str
    total_amount: float
    order_items: List[OrderItemCreate]

class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    product_name: str
    quantity: int
    unit_price: float



class OrderResponse(BaseModel):
    id: int
    user_name: str
    address: str
    total_amount: float
    delivery_man: Optional[str] = None
    order_items: List[OrderItemResponse]
    

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str
    category: str
    subCategory: str
    stock: int

    class Config:
        orm_mode = True


