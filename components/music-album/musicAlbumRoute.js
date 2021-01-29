const express = require("express");
const router = express.Router();
const maController = require("./musicAlbumController");

router
  .route("/")
  .post(maController.createMethod)
  .get(maController.getAllMethod);

router.route("/search").get(maController.getMusiciansByMusicAlbum);

router.route("/:musicAlbumId").put(maController.updateMethod);

module.exports = router;
