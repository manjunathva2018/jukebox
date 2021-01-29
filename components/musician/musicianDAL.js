// import mongoose models
const musicianModel = require("./musicianModel");

// CRUD operations

async function createMusician(data) {
  const details = new musicianModel(data);
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

async function getSingleMusicianByName(data) {
  try {
    let result = await musicianModel.findOne({ name: data.name }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function getMusicianById(data) {
  try {
    let result = await musicianModel.findById({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateMusician(data) {
  try {
    let result = await musicianModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// export 4 functions i.e create,read,update,delete
module.exports = {
  createMusician: createMusician,
  getSingleMusicianByName: getSingleMusicianByName,
  getMusicianById: getMusicianById,
  updateMusician: updateMusician,
};
