const catchAndPrintErrors = require('../utils/CatchAndPrintErrors')
import { json } from 'body-parser';
import { Request, Response } from 'express';
const Book = require("../models/Book");
const Author = require("../models/Author");

const getAllBooks = catchAndPrintErrors(async (req: Request, res: Response) => {
  const booksFound = await Book.find({})

  res.status(200).json(booksFound)
})

const createBook = catchAndPrintErrors(async (req: Request, res: Response) => {
  const name = req.body.name
  const chapters = req.body.chapters
  const pages = req.body.pages
  const authors = req.body.authors

  const bookFound = await Book.findOne({ name })

  if(bookFound) return res.status(404).json({ message: "Book already in library", errorCode: 1 })

  for(const author of authors){
    const dbAuthor = await Author.findOne({ name: author })
    if(!dbAuthor){
      const newAuthor = new Author({ name: author })
      await newAuthor.save()
    }
  }

  const newBook = new Book({ name, pages, chapters, authors: [] })
  const savedBook = await newBook.save()

  for(const author of authors){
    const dbAuthor = await Author.findOne({ name: author })
    dbAuthor.books.push(savedBook._id)
    await dbAuthor.save()
    savedBook.authors.push(dbAuthor._id)
  }

  await savedBook.save()

  res.status(200).json({ message: "Book successfuly created" })
})

const getAverage = catchAndPrintErrors(async (req: Request, res: Response) => {
  const name = req.body.name

  const bookFound = await Book.findOne({ name })

  if(!bookFound) return res.status(404).json({ message: "Book not found", errorCode: 1 })

  res.status(200).json({ _id: bookFound._id, average: (bookFound.pages / bookFound.chapters).toFixed(2) })
})

module.exports = {
  getAllBooks,
  createBook,
  getAverage
}