import express from 'express';
const authorController = require('../controllers/AuthorController');

const router = express.Router();

//route:Follow
router.get("/all", authorController.getAllAuthors)
router.post("/create", authorController.createAuthor)

module.exports = router