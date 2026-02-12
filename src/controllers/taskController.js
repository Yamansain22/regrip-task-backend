const pool = require('../config/db');

// CREATE TASK
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
      [userId, title, description]
    );

    res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// GET USER TASKS
exports.getTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [tasks] = await pool.query(
      "SELECT * FROM tasks WHERE user_id = ?",
      [userId]
    );

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=?",
      [title, description, status, taskId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: "Unauthorized or task not found" });
    }

    res.json({ message: "Task updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  try {
    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id=? AND user_id=?",
      [taskId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: "Unauthorized or task not found" });
    }

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
