from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def migrate_users_table():
    with engine.begin() as connection:
        connection.execute(text(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(50)"
        ))
        connection.execute(text(
            "UPDATE users SET username = 'user_' || id "
            "WHERE username IS NULL OR username = ''"
        ))
        connection.execute(text(
            "CREATE UNIQUE INDEX IF NOT EXISTS ix_users_username "
            "ON users (username)"
        ))


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
