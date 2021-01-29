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
  updateMusicAlbum: updateMusicAlbum,
};
