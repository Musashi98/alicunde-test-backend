"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAndPrintErrors = require('../utils/CatchAndPrintErrors');
const Book = require("../models/Book");
const Author = require("../models/Author");
const getAllBooks = catchAndPrintErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booksFound = yield Book.find({});
    res.status(200).json(booksFound);
}));
const createBook = catchAndPrintErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const chapters = req.body.chapters;
    const pages = req.body.pages;
    const authors = req.body.authors;
    const bookFound = yield Book.findOne({ name });
    if (bookFound)
        return res.status(404).json({ message: "Book already in library", errorCode: 1 });
    for (const author of authors) {
        const dbAuthor = yield Author.findOne({ name: author });
        if (!dbAuthor) {
            const newAuthor = new Author({ name: author });
            yield newAuthor.save();
        }
    }
    const newBook = new Book({ name, pages, chapters, authors: [] });
    const savedBook = yield newBook.save();
    for (const author of authors) {
        const dbAuthor = yield Author.findOne({ name: author });
        dbAuthor.books.push(savedBook._id);
        yield dbAuthor.save();
        savedBook.authors.push(dbAuthor._id);
    }
    yield savedBook.save();
    res.status(200).json({ message: "Book successfuly created" });
}));
const getAverage = catchAndPrintErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const bookFound = yield Book.findOne({ name });
    if (!bookFound)
        return res.status(404).json({ message: "Book not found", errorCode: 1 });
    res.status(200).json({ _id: bookFound._id, average: (bookFound.pages / bookFound.chapters).toFixed(2) });
}));
module.exports = {
    getAllBooks,
    createBook,
    getAverage
};
