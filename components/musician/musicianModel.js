const mongoose = require("mongoose");
// schema
const musicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the musician cannot be empty"],
    trim: true,
    minLength: 3,
  },
  musicianType: {
    type: String,
    enum: ["Vocalist", "Instrumentalist"],
  },
  // constraint 2
  sungOrPlayedAlbums: [
    { type: mongoose.Schema.Types.ObjectId, ref: "musicAlbums" },
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
module.exports = mongoose.model("musicians", musicianSchema, "musicians");
