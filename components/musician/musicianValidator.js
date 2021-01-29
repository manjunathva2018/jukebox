const Joi = require("joi");

const addNewMusician = Joi.object({
  name: Joi.string().min(3).required(),
  musicianType: Joi.string(),
});

const updateMusician = Joi.object({
  name: Joi.string().min(5).required(),
  musicianType: Joi.string(),
  sungOrPlayedAlbums: Joi.array().items(Joi.string().min(24).max(24)),
});

module.exports = {
  addMusicianSchema: addNewMusician,
  updateSchema: updateMusician,
};
