import express from 'express';
const bookController = require('../controllers/BookController');

const router = express.Router();

//route:Follow
router.get("/all", bookController.getAllBooks)
router.get("/average")
router.post("/create", bookController.createBook)

module.exports = router