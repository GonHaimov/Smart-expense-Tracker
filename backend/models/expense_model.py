from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Expense(BaseModel):
    user_id: Optional[str] = None
    amount: float
    category: str
    date: datetime
    
    
