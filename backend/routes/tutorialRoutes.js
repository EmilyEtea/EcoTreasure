const express = require('express');
const router = express.Router();
const {
  getTutorials,
  getTutorial,
  createTutorial,
  updateTutorial,
  deleteTutorial
} = require('../controllers/tutorialController');

// /api/tutorials
router.route('/')
  .get(getTutorials)
  .post(createTutorial);

// /api/tutorials/:id
router.route('/:id')
  .get(getTutorial)
  .put(updateTutorial)
  .delete(deleteTutorial);

module.exports = router;