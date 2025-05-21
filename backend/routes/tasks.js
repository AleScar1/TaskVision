import authenticateUser from '../middleware/authMiddleware.js';
import Task from '../models/Task.js';

// Crea un nuovo task
router.post('/tasks', authenticateUser, async (req, res) => {
  const { title, description, status, dueDate, assignedUsers } = req.body;
  const userId = req.user.id; // ID dell'utente da JWT

  try {
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      userId,
      assignedUsers
    });
    
    await newTask.save();
    res.status(201).json({ message: 'Task creato con successo', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel creare il task', error: error.message });
  }
});