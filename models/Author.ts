import * as mongoose from 'mongoose'

const { Schema } = mongoose;

const AuthorSchema = new Schema({
    name: String,
    books: [{
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }]
});

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author