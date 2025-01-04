// components/trips/TripSharing.js
import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const TripSharing = ({ tripId, sharing, onUpdate }) => {
  const [shareLink, setShareLink] = useState(sharing?.shareLink || '');
  const [sharedWith, setSharedWith] = useState(sharing?.sharedWith || []);
  const [newEmail, setNewEmail] = useState('');
  const [groupNote, setGroupNote] = useState('');

  const handleGenerateLink = async () => {
    // Generate a unique sharing link
    const link = `${window.location.origin}/shared-trip/${tripId}`;
    setShareLink(link);
    onUpdate({
      isShared: true,
      shareLink: link,
      sharedWith: sharedWith
    });
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (newEmail && !sharedWith.includes(newEmail)) {
      const updatedSharedWith = [...sharedWith, newEmail];
      setSharedWith(updatedSharedWith);
      setNewEmail('');
      onUpdate({
        isShared: true,
        shareLink,
        sharedWith: updatedSharedWith
      });
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    const updatedSharedWith = sharedWith.filter(email => email !== emailToRemove);
    setSharedWith(updatedSharedWith);
    onUpdate({
      isShared: true,
      shareLink,
      sharedWith: updatedSharedWith
    });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (groupNote.trim()) {
      // Add note to group notes
      onUpdate({
        ...sharing,
        groupNotes: [...(sharing.groupNotes || []), {
          note: groupNote,
          createdAt: new Date()
        }]
      });
      setGroupNote('');
    }
  };

  return (
    <div className="trip-sharing">
      <h3>Trip Sharing</h3>

      <div className="share-link mb-4">
        <h5>Sharing Link</h5>
        {shareLink ? (
          <div className="d-flex gap-2 align-items-center">
            <Form.Control
              type="text"
              value={shareLink}
              readOnly
            />
            <Button
              variant="outline-primary"
              onClick={() => navigator.clipboard.writeText(shareLink)}
            >
              Copy
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={handleGenerateLink}>
            Generate Sharing Link
          </Button>
        )}
      </div>

      <div className="share-with mb-4">
        <h5>Share with Others</h5>
        <Form onSubmit={handleAddEmail} className="mb-3">
          <div className="d-flex gap-2">
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </Form>

        <ListGroup>
          {sharedWith.map((email, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {email}
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveEmail(email)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="group-notes">
        <h5>Group Notes</h5>
        <Form onSubmit={handleAddNote} className="mb-3">
          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add a note..."
              value={groupNote}
              onChange={(e) => setGroupNote(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Add Note
          </Button>
        </Form>

        <ListGroup>
          {sharing?.groupNotes?.map((note, index) => (
            <ListGroup.Item key={index} className="mb-2">
              <div className="d-flex justify-content-between">
                <p className="mb-0">{note.note}</p>
                <small className="text-muted">
                  {new Date(note.createdAt).toLocaleString()}
                </small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default TripSharing;
