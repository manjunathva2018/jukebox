const Joi = require("joi");

const addNewMusicAlbum = Joi.object({
  albumName: Joi.string().min(5).required(),
  dateOfRelease: Joi.string().required(),
  genre: Joi.array().items(Joi.string()),
  price: Joi.number().integer().min(100).max(1000).required(),
  description: Joi.string(),
});

const updateMusicAlbum = Joi.object({
  albumName: Joi.string().min(5).required(),
  dateOfRelease: Joi.string().required(),
  genre: Joi.array().items(Joi.string()),
  price: Joi.number().integer().min(100).max(1000).required(),
  description: Joi.string(),
  sungOrPlayedByMusicians: Joi.array().items(Joi.string().min(24).max(24)),
});

module.exports = {
  addMusicAlbumSchema: addNewMusicAlbum,
  updateSchema: updateMusicAlbum,
};
