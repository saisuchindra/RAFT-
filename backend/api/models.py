from pydantic import BaseModel, Field


class SetRequest(BaseModel):
    key: str = Field(..., min_length=1, description="The key to store.")
    value: str = Field(..., description="The value to store for the key.")


class SetResponse(BaseModel):
    key: str
    value: str
    message: str


class GetResponse(BaseModel):
    key: str
    value: str


class KeyValueItem(BaseModel):
    key: str
    value: str


class KeyListResponse(BaseModel):
    items: list[KeyValueItem]
    count: int


class DeleteResponse(BaseModel):
    key: str
    deleted: bool
    message: str


class ErrorResponse(BaseModel):
    detail: str
