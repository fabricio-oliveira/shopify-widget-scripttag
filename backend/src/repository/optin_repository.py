from sqlalchemy.orm import Session
from models.opt_in import OptIn


class OptInRepository:
    def __init__(self, session: Session):
        self.session = session

    def add(self, merchant_url: str, user_email: str, cart_token: str,
            carbon_offset_value: float) -> OptIn:

        opt_in = OptIn(
            merchant_url=merchant_url,
            user_email=user_email,
            cart_token=cart_token,
            carbon_offset_value=carbon_offset_value,
        )

        self.session.add(opt_in)
        self.session.commit()
        self.session.refresh(opt_in)
        return opt_in

    def get_by_id(self, tracking_id: int) -> OptIn | None:
        return self.session.query(OptIn).filter(OptIn.id == tracking_id).first()

    def list_all(self) -> list[OptIn]:
        return self.session.query(OptIn).all()
