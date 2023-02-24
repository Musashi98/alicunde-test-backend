"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController = require('../controllers/BookController');
const router = express_1.default.Router();
//route:Follow
router.get("/all", bookController.getAllBooks);
router.get("/average");
router.post("/create", bookController.createBook);
module.exports = router;
