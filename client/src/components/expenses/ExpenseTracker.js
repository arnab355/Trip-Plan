// components/expenses/ExpenseTracker.js
import React, { useState } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';

const ExpenseTracker = ({ tripId, initialExpenses = [], budget, onUpdate }) => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  // State for editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const updatedExpenses = [...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }];
    setExpenses(updatedExpenses);
    onUpdate(updatedExpenses);
    setNewExpense({
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Delete expense
  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    onUpdate(updatedExpenses);
  };

  // Open edit modal
  const handleEditClick = (expense, index) => {
    setEditingExpense({ ...expense });
    setEditIndex(index);
    setShowEditModal(true);
  };

  // Handle update
  const handleUpdate = () => {
    const updatedExpenses = expenses.map((expense, index) => 
      index === editIndex ? { ...editingExpense, amount: parseFloat(editingExpense.amount) } : expense
    );
    setExpenses(updatedExpenses);
    onUpdate(updatedExpenses);
    setShowEditModal(false);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expense-tracker">
      <h3>Expense Tracker</h3>
      {budget && (
        <div className="budget-info mb-3">
          <h5>Budget: ${budget}</h5>
          <h5>Remaining: ${budget - totalExpenses}</h5>
        </div>
      )}

      <Form onSubmit={handleAddExpense}>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={newExpense.category}
            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
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
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEditClick(expense, index)}
                >
                  Update
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={editingExpense?.category || ''}
                onChange={(e) => setEditingExpense({...editingExpense, category: e.target.value})}
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
                value={editingExpense?.amount || ''}
                onChange={(e) => setEditingExpense({...editingExpense, amount: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editingExpense?.description || ''}
                onChange={(e) => setEditingExpense({...editingExpense, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editingExpense?.date || ''}
                onChange={(e) => setEditingExpense({...editingExpense, date: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExpenseTracker;
