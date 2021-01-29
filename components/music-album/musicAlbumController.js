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

// 3 API to retrieve the list of Music albums sorted by Date of release in ascending order (i.e
// Oldest first)
module.exports.getAllMethod = async function (req, res, next) {
  const q = req.query.sortDateOfRelease;
  try {
    let albumData = await musicAlbumDAL.getAllMusicAlbums({});

    let filteredData = albumData;

    // code level date sorting (date of release)
    if (q === "asc" || q === "ASC") {
      filteredData = albumData.sort((a, b) => {
        return new Date(a.dateOfRelease) - new Date(b.dateOfRelease);
      });
    } else if (q === "desc" || q === "DESC") {
      filteredData = albumData.sort((a, b) => {
        return new Date(b.dateOfRelease) - new Date(a.dateOfRelease);
      });
    }

    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: filteredData });
  } catch (err) {
    console.log(colors.red, `getAllMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

// 5. API to retrieve the list of musicians for a specified music album sorted by musician's
// Name in ascending order.
module.exports.getMusiciansByMusicAlbum = async function (req, res, next) {
  const q = { albumName: req.query.albumname };
  if (q.albumName == null || q.albumName == undefined)
    return next(
      new AppError("The albumname query parameter is not present!", 403)
    );

  try {
    let albumExists = await musicAlbumDAL.getSingleAlbumByName(q);
    if (!albumExists)
      return next(new AppError("The Album does not exsits!", 404));
    let musicianData = await musicAlbumDAL.getMusiciansByAlbum(q);
    return res.status(200).json({
      status: "SUCCESS",
      message: null,
      data: musicianData.sungOrPlayedByMusicians,
    });
  } catch (err) {
    console.log(colors.red, `getMusiciansByMusicAlbum err ${err}`);
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
