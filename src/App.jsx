import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function App() {
  const [people, setPeople] = useState(profiles);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleLike(id) {
    setPeople(ps => ps.map(p => p.id===id? { ...p, likes: p.likes+1 } : p));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    const exists = people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());
    
    if (!trimmed) {
      setError('Name is required');
      return;
    }

    if (exists) {
      setError('That name already exists');
      return;
    }

    const newPerson = { id: people.length + 1, name: trimmed, likes: 0, };

    setPeople([...people, newPerson]);
    setName('');
    setError('');
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      
      <Form onSubmit={handleSubmit} className="mb-4 text-center">
        <Form.Group className="d-inline-block me-2">
          <Form.Control 
            type='text'
            placeholder='Enter Full Name'
            value={name}
            onChange={e => setName(e.target.value)}
            isInvalid={!!error}
          />
          <Form.Control.Feedback type='invalid'>
            {error}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type='submit'>Add Profile</Button>
      </Form>
      
      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} onLike={() => handleLike(p.id)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}