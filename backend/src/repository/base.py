import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models.opt_in import Base


DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql+psycopg2://admin:admin@localhost:5432/db")

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def init_db():
    Base.metadata.create_all(bind=engine)


def get_session() -> Session:
    return SessionLocal()
