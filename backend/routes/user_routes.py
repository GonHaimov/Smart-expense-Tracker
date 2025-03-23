from fastapi import APIRouter, HTTPException, Depends
from pymongo.collection import Collection
from pydantic import EmailStr, BaseModel
from models.user_model import User
from services.db_service import get_db
from services.auth_service import hash_password, verify_password, create_access_token, get_current_user
from bson import ObjectId

class LoginRequest(BaseModel):
    email: str
    password: str

user_router = APIRouter()

# register a new user
@user_router.post("/users/register")
def register_user(user: User, 
                  db: Collection = Depends(get_db)):
    
    existing_user = db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already taken")
    
    hashed_password = hash_password(user.password)
    user_dict = user.dict()
    user_dict["_id"] = ObjectId()
    user_dict["password"] = hashed_password

    db["users"].insert_one(user_dict)

    return {"message": "User added successfully"}


# logging in by a user and returns a JWT token
@user_router.post("/users/login")
def login_user(login_data: LoginRequest,
               db: Collection = Depends(get_db)):
    
    existing_user = db["users"].find_one({"email": login_data.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="User not found")
    
    expected_hashed_password = existing_user["password"]

    if not verify_password(login_data.password, expected_hashed_password): # check if the input password matches to the hash password
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    token = create_access_token(str(existing_user["_id"]))
    
    return { 
        "message": "User logged in successfully", 
        "token": token,
        "user_name": existing_user["user_name"]  # ✅ Send user_name to frontend
    }


# Returns the authenticated user's details
@user_router.get("/users/me")
def get_me(current_user: dict = Depends(get_current_user)):
    
    return {
        "user_id": str(current_user["_id"]),
        "user_name": current_user["user_name"],
        "email": current_user["email"]
    }



""" THINGS TO ADD LATER"""
# (/users/update)- PUT - UPDATING THE USERS DETAILS(name, email..)
# (/users/update-password) - PUT - CHANGING PASSWORD AFTER LOGIN
# (/users/delete) - DELETE - DELETING THE USER'S ACCOUNT
