from fastapi.testclient import TestClient

from api.routes import store
from main import app


client = TestClient(app)


def setup_function() -> None:
    store.clear()


def test_set_key_stores_value() -> None:
    response = client.post("/set", json={"key": "language", "value": "python"})

    assert response.status_code == 200
    assert response.json() == {
        "key": "language",
        "value": "python",
        "message": "Key stored successfully.",
    }


def test_get_key_returns_stored_value() -> None:
    client.post("/set", json={"key": "language", "value": "python"})

    response = client.get("/get/language")

    assert response.status_code == 200
    assert response.json() == {"key": "language", "value": "python"}


def test_get_missing_key_returns_404() -> None:
    response = client.get("/get/missing")

    assert response.status_code == 404
    assert response.json() == {"detail": "Key 'missing' was not found."}


def test_delete_key_removes_value() -> None:
    client.post("/set", json={"key": "language", "value": "python"})

    delete_response = client.delete("/delete/language")
    get_response = client.get("/get/language")

    assert delete_response.status_code == 200
    assert delete_response.json() == {
        "key": "language",
        "deleted": True,
        "message": "Key deleted successfully.",
    }
    assert get_response.status_code == 404


def test_list_keys_returns_all_stored_values() -> None:
    client.post("/set", json={"key": "language", "value": "python"})
    client.post("/set", json={"key": "database", "value": "atlaskv"})

    response = client.get("/keys")

    assert response.status_code == 200
    assert response.json() == {
        "items": [
            {"key": "database", "value": "atlaskv"},
            {"key": "language", "value": "python"},
        ],
        "count": 2,
    }
