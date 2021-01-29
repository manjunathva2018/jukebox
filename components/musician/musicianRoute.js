const express = require("express");
const router = express.Router();
const mController = require("./musicianController");

router.route("/").post(mController.createMethod).get(mController.getAll);

router.route("/search").get(mController.getMusicAlbumsByMusicianName);

router.route("/:musicianId").put(mController.updateMethod);

module.exports = router;
