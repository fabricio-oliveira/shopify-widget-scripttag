from sqlalchemy import Column, BigInteger, JSON, TIMESTAMP, func
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class OptIn(Base):
    __tablename__ = "tracking_optin"

    def __init__(self, merchant_url: str, user_email: str, cart_token: str,
                 carbon_offset_value: float):
        self.payload = {
            "merchant_url": merchant_url,
            "user_email": user_email,
            "cart_token": cart_token,
            "carbon_offset_value": carbon_offset_value,
        }

    id = Column(BigInteger, primary_key=True)
    payload = Column(JSON, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)

    # virtual attribute merchant_url
    @property
    def merchant_url(self) -> str:
        return self.payload.get("merchant_url")

    @merchant_url.setter
    def merchant_url(self, value: str):
        print("test123", self.payload, flush=True)
        self.payload["merchant_url"] = value

    # virtual attribute user_email
    @property
    def user_email(self) -> str:
        return self.payload.get("user_email")

    @user_email.setter
    def user_email(self, value: str):
        self.payload["user_email"] = value

    # virtual attribute cart_token
    @property
    def cart_token(self) -> str:
        return self.payload.get("cart_token")

    @cart_token.setter
    def cart_token(self, value: str):
        self.payload["cart_token"] = value

    # virtual attribute carbon_offset_value
    @property
    def carbon_offset_value(self) -> float:
        return self.payload.get("carbon_offset_value")

    @carbon_offset_value.setter
    def carbon_offset_value(self, value: float):
        self.payload["carbon_offset_value"] = value

    # Método opcional para mapear todo o JSON para uma classe
    def payload_as_object(self, cls):
        return cls(**self.payload)
