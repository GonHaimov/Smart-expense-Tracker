from fastapi import APIRouter, HTTPException, Depends
from pymongo.collection import Collection
from models.expense_model import Expense
from services.db_service import get_db
from services.auth_service import get_current_user
from bson import ObjectId

user_router = APIRouter()