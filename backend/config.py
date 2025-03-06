from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")  # Default to local MongoDB if not found
DB_NAME = os.getenv("DB_NAME", "expense_tracker")

# JWT Configuration
JWT_SECRET = os.getenv("JWT_SECRET", "fallback_secret")  # Fallback in case the variable is missing
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")  # Algorithm for JWT
JWT_EXPIRATION_MINUTES = int(os.getenv("JWT_EXPIRATION_MINUTES", 60))  # Convert expiration to integer
