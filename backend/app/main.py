from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, sentiment, database

from typing import List




models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/analyze", response_model=schemas.FeedbackOut)
def analyze(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    result = sentiment.analyze_sentiment(feedback.text)
    fb = models.Feedback(text=feedback.text, sentiment=result)
    db.add(fb)
    db.commit()
    db.refresh(fb)
    return fb
 
@app.get("/feedbacks", response_model=List[schemas.FeedbackOut])
def get_feedbacks(db: Session = Depends(get_db)):
    return db.query(models.Feedback).all()