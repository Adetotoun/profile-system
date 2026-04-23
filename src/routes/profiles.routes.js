const express = require("express");
const { getProfiles, searchProfile } = require("../controller/profile.controller");
const router = express.Router();


router.get('/', getProfiles);
router.get('/search', searchProfile);


module.exports = router;