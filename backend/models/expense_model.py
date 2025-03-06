from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Expense(BaseModel):
    id: Optional[str] #ObjectId that create auto by MongoDB, not mandatory 
    user_id: str
    amount: float
    category: str
    date: datetime
    
    
