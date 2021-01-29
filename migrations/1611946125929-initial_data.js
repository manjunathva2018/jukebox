require("dotenv").config();
const mongoose = require("mongoose");
const musicAlbumModel = require("./../components/music-album/musicAlbumModel");
const musicianModel = require("./../components/musician/musicianModel");

mongoose.connect(process.env.MIGRATE_dbConnectionUri, {
  useNewUrlParser: true,
});

async function up() {
  try {
    const musicAlbums = [
      {
        _id: mongoose.Types.ObjectId("601442d5ea6778333008eee8"),
        genre: ["Bollywood OGT"],
        sungOrPlayedByMusicians: [],
        albumName: "Dangal",
        dateOfRelease: "2016-11-22T18:30:00.000Z",
        price: 110,
        description:
          "1. Haanikaarak Bapu-Sarwar Khan & Sartaz Khan Barna\n 2. Dhaakad-Raftaar 3. Gilehriyaan-Jonita Gandhi 4. Dangal-Daler Mehndi\n5.Idiot Banna-Jyoti Nooran & Sultana Nooran 6. Dhaakad ( Aamir Khan Version)-Aamir khan",
        createdAt: "2021-01-29T17:16:05.645Z",
        updatedAt: "2021-01-29T17:16:05.645Z",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("6014464ec56b7f14106ae5fb"),
        genre: ["Feature", "Romantic"],
        sungOrPlayedByMusicians: [
          mongoose.Types.ObjectId("601449ce9fec8436ac007d47"),
          mongoose.Types.ObjectId("601449889fec8436ac007d46"),
          mongoose.Types.ObjectId("601446ebc56b7f14106ae5fc"),
        ],
        albumName: "Chennai Express",
        dateOfRelease: "2013-06-30T18:30:00.000Z",
        price: 150,
        description:
          "1. One Two Three Four (Get on the Dance Floor)\n2. Titli\n3. Tera Rastaa Chhodoon Na\n4. Kashmir Main, Tu Kanyakumari\n5. Ready Steady Po\n6. Chennai Express\n7. Titli Dubstep Version\n8. Chennai Express Mashup",
        createdAt: "2021-01-29T17:30:54.876Z",
        updatedAt: "2021-01-29T18:16:56.695Z",
        __v: 0,
      },
    ];
    const musicians = [
      {
        _id: mongoose.Types.ObjectId("601446ebc56b7f14106ae5fc"),
        sungOrPlayedAlbums: [
          mongoose.Types.ObjectId("6014464ec56b7f14106ae5fb"),
        ],
        name: "Shankar Mahadevan",
        musicianType: "Vocalist",
        createdAt: "2021-01-29T17:33:31.372Z",
        updatedAt: "2021-01-29T17:47:50.768Z",
        __v: 0,
      },

      {
        _id: mongoose.Types.ObjectId("601449889fec8436ac007d46"),
        sungOrPlayedAlbums: [
          mongoose.Types.ObjectId("601442d5ea6778333008eee8"),
        ],
        name: "A. R. Rahman",
        musicianType: "Vocalist",
        createdAt: "2021-01-29T17:44:40.780Z",
        updatedAt: "2021-01-29T17:55:07.491Z",
        __v: 0,
      },

      {
        _id: mongoose.Types.ObjectId("601449ce9fec8436ac007d47"),
        sungOrPlayedAlbums: [],
        name: "Zakir Hussain",
        musicianType: "Instrumentalist",
        createdAt: "2021-01-29T17:45:50.749Z",
        updatedAt: "2021-01-29T17:45:50.749Z",
        __v: 0,
      },
    ];
    await musicAlbumModel.insertMany(musicAlbums);
    return await musicianModel.insertMany(musicians);
  } catch (err) {
    throw err;
  }
}

async function down() {}

module.exports = { up, down };
