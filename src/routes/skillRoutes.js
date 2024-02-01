const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

// Route to get all skills
router.get('/', skillController.getAllSkills);

// Route to post a new skill
router.post('/', skillController.postSkill);


module.exports = router;
