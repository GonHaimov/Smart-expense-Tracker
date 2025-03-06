from fastapi import APIRouter, HTTPException, Depends
from pymongo.collection import Collection
from models.expense_model import Expense
from services.db_service import get_db
from services.auth_service import get_current_user
from bson import ObjectId

expense_router = APIRouter()

# Adds a new expense for the authenticated user
@expense_router.post("/expenses/add")
def add_expense(expense: Expense,
                db: Collection = Depends(get_db),
                current_user: dict = Depends(get_current_user)):

    user_id = current_user["_id"]  # Retrieve the user ID from the token
    expense_dict = expense.dict() # 'expense' is Pydantic object and Mongo do not work with it so we need to convert it into dict 
    expense_dict["_id"] = str(ObjectId())  
    expense_dict["user_id"] = user_id  # Attach the user ID to the expense dict

    db["expenses"].insert_one(expense_dict)  # Save the expense into the "expense" collection in MongoDB
    
    db["users"].update_one(
        {"_id": user_id}, # find the user first in the collection by his ID
        {"$push": {"expenses": expense_dict["_id"]}} # adding the new expense id to the 'expense list' of the user
    )

    return {"message": "Expense added successfully", "expense": expense_dict}



# Displaying all the user expenses
@expense_router.get("/expenses")
def get_user_expenses(db: Collection = Depends(get_db), current_user: dict = Depends(get_current_user)):
    

    user_id = current_user["_id"]
    expenses_list = list(db["expenses"].find({"user_id": user_id})) # pulling out all the expenses who belongs to user_id and adding them to a list

    for expense in expenses_list:
        expense["_id"] = str(expense["_id"])
    
    return {"user_id": user_id, "expenses": expenses_list}



# Updates an existing expense (only if it belongs to the authenticated user)
@expense_router.put("/expenses/update/{expense_id}")
def update_expense( expense_id: str,
                    updated_data: dict,
                    db: Collection = Depends(get_db),
                    current_user: dict = Depends(get_current_user)):
    
    
    expense = db["expenses"].find_one({"_id": ObjectId(expense_id)})
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    user_id = current_user["_id"]
    if str(expense["user_id"]) != str(user_id):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if not updated_data:
        raise HTTPException(status_code=400, detail="No update data provided")

    db["expenses"].update_one(
                                {"_id": ObjectId(expense_id)}, 
                                {"$set": updated_data}  
                            )

    return {"message": "Expense updated successfully", "updated_fields": updated_data}



# deleting an expense
@expense_router.delete("/expenses/delete/{expense_id}")
def delete_expense(expense_id: str,
                   db: Collection = Depends(get_db),
                   current_user: dict = Depends(get_current_user)):
    
    expense = db["expenses"].find_one({"_id": ObjectId(expense_id)})
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    user_id = current_user["_id"]
    if str(expense["user_id"]) != str(user_id):
        raise HTTPException(status_code=403, detail="Not authorized")

    db["expenses"].delete_one({"_id": ObjectId(expense_id)})

    db["expenses"].update_one(
                                {"_id": ObjectId(expense_id)}, 
                                {"$pull": {"expenses": expense_id}}  
                            )

    return {"message": "Expense deleted successfully"}
