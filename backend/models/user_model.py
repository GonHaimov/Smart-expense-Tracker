from pydantic import BaseModel, EmailStr
from typing import List, Optional

class User(BaseModel):
    id: Optional[str] # ObjectId that create auto by MongoDB, not mandatory 
    user_name: str
    email: EmailStr
    hashed_password: str # with bcrypt
    expenses: List[str] = []

