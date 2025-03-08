from pydantic import BaseModel, EmailStr
from typing import List, Optional

class User(BaseModel):
    user_name: str
    email: EmailStr
    password: str # with bcrypt
    expenses: List[str] = []

