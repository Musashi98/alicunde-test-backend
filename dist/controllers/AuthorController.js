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
const Author = require("../models/Author");
const getAllAuthors = catchAndPrintErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorsFound = yield Author.find({});
    res.status(200).json(authorsFound);
}));
const createAuthor = catchAndPrintErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const newAuthor = new Author({ name, books: [] });
    yield newAuthor.save();
    res.status(200).json({ message: "Author successfuly created" });
}));
module.exports = {
    getAllAuthors,
    createAuthor
};
