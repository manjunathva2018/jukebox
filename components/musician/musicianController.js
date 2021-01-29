const mongoose = require("mongoose");
const AppError = require("./../../helpers/appError");
const colors = require("./../../helpers/colors");
const musicianDAL = require("./musicianDAL");
const musicianValidator = require("./musicianValidator");

module.exports.createMethod = async function (req, res, next) {
  const data = req.body;
  try {
    // validation
    await musicianValidator.addMusicianSchema.validateAsync(data);

    // check if the music album already exists
    let musicianExists = await musicianDAL.getSingleMusicianByName(data);
    if (musicianExists != null)
      return next(new AppError("The Musician already exsits!", 403));

    // save it to DB
    let musicianData = await musicianDAL.createMusician(data);
    return res.status(201).json({ status: "SUCCESS", data: musicianData });
  } catch (err) {
    if (err.isJoi === true) return next(new AppError(err.message, 422));
    return next(new AppError(err, 400));
  }
};

module.exports.getMusicAlbumsByMusicianName = async function (req, res, next) {
  const q = { name: req.query.musicianname };
  if (q.name == null || q.name == undefined)
    return next(
      new AppError("The musician name query parameter is not present!", 403)
    );
  try {
    let albumData = await musicianDAL.getMusicAlbumByMusician(q);
    return res.status(200).json({
      status: "SUCCESS",
      message: null,
      data: albumData.sungOrPlayedAlbums,
    });
  } catch (err) {
    console.log(colors.red, `getMusicAlbumsByMusicianName err ${err}`);
    return next(new AppError(err, 400));
  }
};

module.exports.updateMethod = async function (req, res, next) {
  const data = req.body;
  try {
    const musicianExists = await musicianDAL.getMusicianById({
      _id: req.params.musicianId,
    });
    if (!musicianExists)
      return next(new AppError("The Musician does not exists!", 404));
    let result = await musicianValidator.updateSchema.validateAsync(data);
    result._id = mongoose.Types.ObjectId(req.params.musicianId);
    result.updatedAt = new Date();
    let musicianData = await musicianDAL.updateMusician(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "The musician has been updated successfully",
      data: musicianData,
    });
  } catch (err) {
    if (err.isJoi === true) return next(new AppError(err.message, 422));
    console.log(colors.red, `updateMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};
