// components/expenses/ExpenseForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ExpenseForm = ({ onSubmit }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...expense, amount: parseFloat(expense.amount) });
    setExpense({
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={expense.category}
          onChange={(e) => setExpense({...expense, category: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          <option value="Transportation">Transportation</option>
          <option value="Accommodation">Accommodation</option>
          <option value="Food">Food</option>
          <option value="Activities">Activities</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          value={expense.amount}
          onChange={(e) => setExpense({...expense, amount: e.target.value})}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={expense.description}
          onChange={(e) => setExpense({...expense, description: e.target.value})}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={expense.date}
          onChange={(e) => setExpense({...expense, date: e.target.value})}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Expense
      </Button>
    </Form>
  );
};

export default ExpenseForm;
