import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;
