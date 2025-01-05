import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const PackingList = ({ tripId, initialItems = [], onUpdate }) => {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const newPackingItem = {
      item: newItem.trim(),
      isPacked: false
    };

    const updatedItems = [...items, newPackingItem];
    setItems(updatedItems);
    onUpdate(updatedItems);
    setNewItem('');
  };

  const togglePacked = (index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, isPacked: !item.isPacked };
      }
      return item;
    });
    setItems(updatedItems);
    onUpdate(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onUpdate(updatedItems);
  };

  const packedItemsCount = items.filter(item => item.isPacked).length;

  return (
    <div className="packing-list">
      <h3>Packing List</h3>
      <div className="packing-stats mb-3">
        <p>
          Packed Items: {packedItemsCount} / {items.length}
          {items.length > 0 && 
            ` (${Math.round((packedItemsCount / items.length) * 100)}%)`
          }
        </p>
      </div>

      <Form onSubmit={handleAddItem} className="mb-3">
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item..."
          />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </div>
      </Form>

      <ListGroup>
        {items.map((item, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                checked={item.isPacked}
                onChange={() => togglePacked(index)}
                label={item.item}
                className={item.isPacked ? 'text-decoration-line-through' : ''}
              />
            </div>
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => removeItem(index)}
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {items.length === 0 && (
        <p className="text-muted text-center mt-3">
          Your packing list is empty. Start adding items!
        </p>
      )}
    </div>
  );
};

export default PackingList;
