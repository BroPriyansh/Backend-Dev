const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); 

const students = [
  { id: 1, name: 'Alice', branch: 'Computer Science' },
  { id: 2, name: 'Bob', branch: 'Electrical Engineering' },
  { id: 3, name: 'Charlie', branch: 'Mechanical Engineering' }
];

app.get('/', (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send({ error: 'Student not found' });
  }
});

app.get('/students/name/:name', (req, res) => {
  const studentName = req.params.name.toLowerCase();
  const student = students.find(s => s.name.toLowerCase() === studentName);
  if (student) {
    res.json(student);
  }
  else {
    res.status(404).send({ error: 'Student not found' });
  }
});


app.post("/students/register", (req, res) => {
  const data = req.body;
  if (!data || !data.id || !data.name || !data.branch) {
    return res.status(400).send({ error: 'Invalid student data' });
  }
  fs.readFile("./students.json", "utf-8", (err, jsonString) => {
    if (err) {
      return res.status(500).send({ error: 'Error reading student data' });
    }

    const existingStudents = JSON.parse(jsonString || '[]');
    const newStudent = { id: data.id, name: data.name, branch: data.branch };
    existingStudents.push(newStudent);
    fs.writeFile("./students.json", JSON.stringify(existingStudents, null, 2), (err) => {
      if (err) {
        return res.status(500).send({ error: 'Error saving student data' });
      }
      return res.status(201).json({ message: 'Student registered successfully', student: newStudent });
    });
  });
});

app.put('/students/update/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === userId);
  if (studentIndex === -1) {
    return res.status(404).send({ error: 'Student not found' });
  }
  students[studentIndex] = { ...students[studentIndex], ...req.body };
  const result = { message: 'Student updated successfully', students: students };
  return res.status(200).json(result);
});
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});