from fastapi.testclient import TestClient
from main import app
import pytest
from database import Base, engine, SessionLocal

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_and_teardown():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Demo App API"}

def test_create_and_read_item():
    response = client.post("/items/", json={"name": "Test Item", "description": "This is a test item"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Item"
    assert data["description"] == "This is a test item"
    assert "id" in data

    item_id = data["id"]
    response = client.get(f"/items/{item_id}")
    assert response.status_code == 200
    assert response.json() == data

def test_update_and_delete_item():
    # Create
    response = client.post("/items/", json={"name": "Item 2", "description": "Desc"})
    item_id = response.json()["id"]

    # Update
    response = client.put(f"/items/{item_id}", json={"name": "Updated", "description": "New Desc"})
    assert response.status_code == 200
    assert response.json()["name"] == "Updated"

    # Delete
    response = client.delete(f"/items/{item_id}")
    assert response.status_code == 204
    # Confirm deletion
    response = client.get(f"/items/{item_id}")
    assert response.status_code == 404