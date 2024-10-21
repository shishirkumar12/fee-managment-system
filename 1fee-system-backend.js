// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/school_fee_management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define routes
const studentsRouter = require('./routes/students');
const feesRouter = require('./routes/fees');
const paymentsRouter = require('./routes/payments');

app.use('/api/students', studentsRouter);
app.use('/api/fees', feesRouter);
app.use('/api/payments', paymentsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    grade: req.body.grade,
    // Add other fields as necessary
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add routes for updating and deleting students

module.exports = router;

// routes/fees.js and routes/payments.js would be similar, handling CRUD operations for fees and payments
