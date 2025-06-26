import React, { useState, useEffect } from 'react';
import './App.css';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import { fetchItems, createItem, updateItem, deleteItem } from './services/api';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch items');
        setLoading(false);
      }
    };
    getItems();
  }, []);

  const handleCreateItem = async (item) => {
    try {
      const newItem = await createItem(item);
      setItems([...items, newItem]);
    } catch (err) {
      setError('Failed to create item');
    }
  };

  const handleUpdateItem = async (item) => {
    try {
      const updatedItem = await updateItem(item.id, item);
      setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
      setSelectedItem(null);
    } catch (err) {
      setError('Failed to update item');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Demo 3-Tier Application</h1>
      </header>
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        <div className="container">
          <div className="form-container">
            <h2>{selectedItem ? 'Edit Item' : 'Create New Item'}</h2>
            <ItemForm
              item={selectedItem}
              onSubmit={selectedItem ? handleUpdateItem : handleCreateItem}
              onCancel={() => setSelectedItem(null)}
            />
          </div>
          <div className="list-container">
            <h2>Items</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ItemList
                items={items}
                onEdit={handleSelectItem}
                onDelete={handleDeleteItem}
              />
            )}
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <p>Demo App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;