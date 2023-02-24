const catchAndPrintErrors = require('../utils/CatchAndPrintErrors')
import { Request, Response } from 'express';
const Author = require("../models/Author");

const getAllAuthors = catchAndPrintErrors(async (req: Request, res: Response) => {
  const authorsFound = await Author.find({})

  res.status(200).json(authorsFound)
})

const createAuthor = catchAndPrintErrors(async (req: Request, res: Response) => {
  const name = req.body.name

  const newAuthor = new Author({ name, books: [] })
  await newAuthor.save()

  res.status(200).json({ message: "Author successfuly created" })
})

module.exports = {
  getAllAuthors,
  createAuthor
}