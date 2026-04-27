const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let customers = [];

app.get('/customers', (req, res) => {
  res.json(customers);
});

app.post('/customers', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }

  const newCustomer = {
    id: Date.now().toString(),
    name,
    email,
    phone
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = customers.length;

  customers = customers.filter(customer => customer.id !== id);

  if (customers.length < initialLength) {
    res.status(200).json({ message: 'Customer deleted successfully' });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
