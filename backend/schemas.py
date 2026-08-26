from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime, date


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True


class QuizCreate(BaseModel):
    question: str
    options: List[str] = Field(..., min_items=4, max_items=4)
    correct_index: int
    date: date
    expiry: datetime


class QuizOut(BaseModel):
    id: int
    question: str
    options: List[str]
    date: date
    expiry: datetime

    class Config:
        orm_mode = True


class SubmitAnswer(BaseModel):
    quiz_id: int
    selected_index: int
