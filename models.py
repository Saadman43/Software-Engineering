from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary
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
