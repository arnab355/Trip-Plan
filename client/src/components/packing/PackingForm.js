// components/packing/PackingForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PackingForm = ({ onSubmit }) => {
  const [item, setItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.trim()) {
      onSubmit({
        item: item.trim(),
        isPacked: false
      });
      setItem('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex gap-2">
      <Form.Group className="flex-grow-1">
        <Form.Control
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Add item to pack..."
          required
        />
      </Form.Group>
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default PackingForm;
