from pymongo import MongoClient
from config import MONGO_URI, DB_NAME

def get_db():
    client = MongoClient(MONGO_URI) # create connection to MongoDB
    db = client[DB_NAME] # connecting to our database
    print("✅ Connected to MongoDB!")
    return db # returning the object who allow access to DB in all the other files

