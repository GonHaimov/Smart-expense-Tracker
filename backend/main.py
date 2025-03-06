from fastapi import FastAPI
from routes.expense_routes import expense_router
from routes.user_routes import user_router

app = FastAPI()

# חיבור הנתיבים (Routes) ל-API
app.include_router(expense_router)
app.include_router(user_router)

@app.get("/")
def home():
    return {"message": "Welcome to Smart Expense Tracker API!"}

