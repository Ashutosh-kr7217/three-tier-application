import React, { useState, useEffect } from 'react';

function ItemForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Update form data when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || ''
      });
    } else {
      setFormData({
        name: '',
        description: ''
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }
    
    // Submit form data
    onSubmit({
      ...(item && { id: item.id }),
      ...formData
    });
    
    // Reset form if it's a new item
    if (!item) {
      setFormData({ name: '', description: '' });
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {item ? 'Update' : 'Create'}
        </button>
        {item && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ItemForm;