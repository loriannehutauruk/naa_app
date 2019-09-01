const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goals');

router.get('/', goalsController.getGoals)

router.get('/:id', goalsController.getGoalById)

router.post('/', goalsController.createGoal)

router.put('/:id', goalsController.updateGoalById)

router.delete('/:first_name', goalsController.deleteGoalById)

module.exports = router;

