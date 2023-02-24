"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController = require('../controllers/AuthorController');
const router = express_1.default.Router();
//route:Follow
router.get("/all", authorController.getAllAuthors);
router.post("/create", authorController.createAuthor);
module.exports = router;
