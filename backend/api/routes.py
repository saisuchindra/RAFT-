from fastapi import APIRouter, HTTPException, status

from api.models import (
    DeleteResponse,
    GetResponse,
    KeyListResponse,
    KeyValueItem,
    SetRequest,
    SetResponse,
)
from storage.memory_store import MemoryKeyValueStore


router = APIRouter()
store = MemoryKeyValueStore()


@router.post("/set", response_model=SetResponse, status_code=status.HTTP_200_OK)
async def set_key(request: SetRequest) -> SetResponse:
    store.set(request.key, request.value)
    return SetResponse(
        key=request.key,
        value=request.value,
        message="Key stored successfully.",
    )


@router.get("/get/{key}", response_model=GetResponse)
async def get_key(key: str) -> GetResponse:
    value = store.get(key)
    if value is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Key '{key}' was not found.",
        )

    return GetResponse(key=key, value=value)


@router.get("/keys", response_model=KeyListResponse)
async def list_keys() -> KeyListResponse:
    items = [
        KeyValueItem(key=key, value=value)
        for key, value in store.items().items()
    ]

    return KeyListResponse(items=items, count=len(items))


@router.delete("/delete/{key}", response_model=DeleteResponse)
async def delete_key(key: str) -> DeleteResponse:
    deleted = store.delete(key)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Key '{key}' was not found.",
        )

    return DeleteResponse(
        key=key,
        deleted=True,
        message="Key deleted successfully.",
    )
