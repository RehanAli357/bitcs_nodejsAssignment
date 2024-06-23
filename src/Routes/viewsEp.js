const express = require("express");
const {
  showIndexHtml,
  showCatDetails,
} = require("../controllers/viewsController");
const router = express.Router();

router.get(`/`, showIndexHtml);
router.get(`/cat/:id`, showCatDetails);

module.exports = router;
