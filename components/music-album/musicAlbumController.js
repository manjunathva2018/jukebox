const mongoose = require("mongoose");
const AppError = require("./../../helpers/appError");
const colors = require("./../../helpers/colors");
const musicAlbumDAL = require("./musicAlbumDAL");
const musicAlbumValidator = require("./musicAlbumValidator");

module.exports.createMethod = async function (req, res, next) {
  const data = req.body;
  try {
    // validation
    await musicAlbumValidator.addMusicAlbumSchema.validateAsync(data);

    // check if the music album already exists
    let albumExists = await musicAlbumDAL.getSingleAlbumByName(data);
    if (albumExists != null)
      return next(new AppError("The Album already exsits!", 403));

    // save it to DB
    let albumData = await musicAlbumDAL.createMusicAlbum(data);
    return res.status(201).json({ status: "SUCCESS", data: albumData });
  } catch (err) {
    if (err.isJoi === true) return next(new AppError(err.message, 422));
    return next(new AppError(err, 400));
  }
};

module.exports.updateMethod = async function (req, res, next) {
  const data = req.body;
  try {
    const albumExists = await musicAlbumDAL.getMusicAlbumById({
      _id: req.params.musicAlbumId,
    });
    if (!albumExists)
      return next(new AppError("The Album does not exists!", 404));
    let result = await musicAlbumValidator.updateSchema.validateAsync(data);
    result._id = mongoose.Types.ObjectId(req.params.musicAlbumId);
    result.updatedAt = new Date();
    let albumData = await musicAlbumDAL.updateMusicAlbum(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "The album has been updated successfully",
      data: albumData,
    });
  } catch (err) {
    if (err.isJoi === true) return next(new AppError(err.message, 422));
    console.log(colors.red, `updateMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};
