const mongoose = require("mongoose");

// schema
const musicAlbumSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: [true, "Name of the album cannot be empty"],
    trim: true,
    minLength: 5,
  },
  dateOfRelease: {
    type: Date,
    required: [true, "Date of release cannot be empty"],
  },
  genre: [String],
  price: {
    type: Number,
    required: [true, "Price of the album cannot be empty"],
    min: 100,
    max: 1000,
  },
  description: {
    type: String,
    trim: true,
  },
  // constraint 1
  sungOrPlayedByMusicians: [
    { type: mongoose.Schema.Types.ObjectId, ref: "musicians" },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// compile schema to model
module.exports = mongoose.model("musicAlbums", musicAlbumSchema, "musicAlbums");
