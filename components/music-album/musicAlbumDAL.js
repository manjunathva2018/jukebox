// import mongoose models
const musicAlbumModel = require("./musicAlbumModel");

// CRUD operations
async function createMusicAlbum(data) {
  const details = new musicAlbumModel(data);
  details.createdAt = new Date();
  details.updatedAt = new Date();

  try {
    let result = await details.save();
    return result;
  } catch (err) {
    if (err.message) {
      throw err.message;
    } else {
      throw err;
    }
  }
}

async function getSingleAlbumByName(data) {
  try {
    let result = await musicAlbumModel
      .findOne({ albumName: data.albumName })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function getMusicAlbumById(data) {
  try {
    let result = await musicAlbumModel.findById({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

// Get All
async function getAllMusicAlbums(data) {
  try {
    let result = await musicAlbumModel
      .find()
      .populate({
        model: "musicians",
        path: "sungOrPlayedByMusicians",
      })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

// 5. API to retrieve the list of musicians for a specified music album sorted by musician's
// Name in ascending order.
async function getMusiciansByAlbum(data) {
  try {
    let result = await musicAlbumModel
      .findOne({ albumName: { $regex: data.albumName, $options: "i" } })
      .populate({
        model: "musicians",
        path: "sungOrPlayedByMusicians",
        sort: { name: -1 },
      })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateMusicAlbum(data) {
  try {
    let result = await musicAlbumModel.findOneAndUpdate(
      { _id: data._id },
      data,
      {
        new: true,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

// export 4 functions i.e create,read,update,delete
module.exports = {
  createMusicAlbum: createMusicAlbum,
  getSingleAlbumByName: getSingleAlbumByName,
  getMusicAlbumById: getMusicAlbumById,
  getMusiciansByAlbum: getMusiciansByAlbum,
  updateMusicAlbum: updateMusicAlbum,
  getAllMusicAlbums: getAllMusicAlbums,
};
