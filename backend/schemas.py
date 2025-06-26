from pydantic import BaseModel, constr
from typing import Optional

class ItemBase(BaseModel):
    name: constr(strip_whitespace=True, min_length=1, max_length=255)
    description: Optional[str] = None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    class Config:
        from_attributes = True