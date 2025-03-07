import bcrypt  # Password hashing
import jwt  # JWT Token generation and verification
from datetime import datetime, timedelta  # Handling expiration of tokens
from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPBearer
from config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRATION_MINUTES
from services.db_service import get_db
from bson import ObjectId

security = HTTPBearer()

# Hashes the given password using bcrypt
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')


# Verifies a given plain password against the stored hashed password 
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


# Generates a JWT access token for authentication 
def create_access_token(user_id: str) -> str:
    
    expiration = datetime.utcnow() + timedelta(minutes=JWT_EXPIRATION_MINUTES)  # Set expiration time
    payload = {"user_id": user_id, "exp": expiration}  # JWT payload
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)  # Generate JWT token
    return token


# Decodes and validates a JWT token, returning the payload if valid 
def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])  # Decode token
        return payload  # Return the token payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# Extracts user information from the JWT token and retrieves the user from the database 
def get_current_user(token: str = Security(security), db=Depends(get_db)):
    
    payload = decode_access_token(token.credentials)  # Decode JWT token
    user_id = payload.get("user_id")  # Extract user ID
    user = db["users"].find_one({"_id": ObjectId(user_id)})  # Fetch user from database
    
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user  # Return the authenticated user
