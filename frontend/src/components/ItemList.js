import React from 'react';

function ItemList({ items, onEdit, onDelete }) {
  if (!items.length) {
    return <p>No items found</p>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          <h3>{item.name}</h3>
          <p>{item.description || 'No description'}</p>
          <div className="item-actions">
            <button className="edit-btn" onClick={() => onEdit(item)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;