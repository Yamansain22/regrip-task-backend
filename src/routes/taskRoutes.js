const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Backend
 *               description:
 *                 type: string
 *                 example: Complete Regrip assignment
 *               status:
 *                 type: string
 *                 example: pending
 *     responses:
 *       201:
 *         description: Task created successfully
 */

router.get('/', authMiddleware, taskController.getTasks);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);
router.post('/', authMiddleware, taskController.createTask);

module.exports = router;
