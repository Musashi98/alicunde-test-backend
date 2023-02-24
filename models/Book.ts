import * as mongoose from 'mongoose'

const { Schema } = mongoose;

const BookSchema = new Schema({
    title: String,
    chapters: Number,
    pages: Number,
    authors: [{
      type: Schema.Types.ObjectId,
      ref: 'Author'
    }]
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book