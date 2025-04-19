const express = require("express");
const { getAdmitCards } = require("../controller/admitCardController");

const router = express.Router();

router.get("/admin/admit-cards", getAdmitCards);

module.exports = router;
