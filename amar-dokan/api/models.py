from sqlalchemy import Column, Integer, Float, String, LargeBinary, ForeignKey
from database import Base
from sqlalchemy.orm import relationship



class User(Base):
    __tablename__ = "user_registration"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    user_name = Column(String(255), unique=True)
    email = Column(String(320), unique=True)
    mobile_number = Column(String(15), unique=True)
    is_active = Column(String(5))
    user_id = Column(String(20))
    salt = Column(String(255))
    role = Column(String(20))


class Login(Base):
    __tablename__ = "login"
   
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    user_name = Column(String)
    password = Column(String)
    role = Column(String(255))


class OTP(Base):
    __tablename__ = "user_otp"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(320), unique=True)
    otp = Column(String(10))


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    image = Column(LargeBinary, nullable=False)  # Store image as binary data
    price = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)
    subCategory = Column(String, nullable=False)
    stock = Column(Integer, nullable=False)
    

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    total_amount = Column(Float, default=0.0)
    delivery_man = Column(String(255), nullable=True)
    
    order_items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer)
    product_name = Column(String)
    quantity = Column(Integer)
    unit_price = Column(Float)
    
    # Relationship back to Order
    order = relationship("Order", back_populates="order_items")
