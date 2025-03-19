from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.expense_routes import expense_router
from routes.user_routes import user_router

app = FastAPI()

# Middleware to connect the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # allowing only to my frontend 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# חיבור הנתיבים (Routes) ל-API
app.include_router(expense_router)
app.include_router(user_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Smart Expense Tracker API!",
        "endpoints": [
            { "method": "POST", "route": "/users/register", "description": "Register a new user" },
            { "method": "POST", "route": "/users/login", "description": "Login and receive a JWT token" },
            { "method": "GET", "route": "/users/me", "description": "Get user details" },
            { "method": "POST", "route": "/expenses/add", "description": "Add a new expense" },
            { "method": "GET", "route": "/expenses", "description": "Get all user expenses" }
        ]
    }

# פונקציה שרצה כשהשרת עולה
@app.on_event("startup")
async def startup_event():
    print("✅ Smart Expense Tracker API is running!")
