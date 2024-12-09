from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, LargeBinary
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(320), unique=True)
    active = Column(Boolean, default=False)
    salt = Column(LargeBinary())
    special_key = Column(LargeBinary())


class Password(Base):
    __tablename__ = "passwords"

    id = Column(Integer, primary_key=True, index=True)
    password = Column(String(320))
    hashed_special_key = Column(LargeBinary())

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(512))
    image = Column(String(512))
    description = Column(String(4094))
    price = Column(Float)
    category = Column(String(512))
    subCategory = Column(String(512))
    stockQuantity = Column(Integer)