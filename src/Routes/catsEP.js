const express = require("express");
const {
  getAllCats,
  getSearchCats,
  updateCat,
  addCat,
  deleteCat,
} = require("../controllers/catsController");
const { verifyAuthToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get(`/cats/:id?`, getAllCats);
router.get(`/cat/search`, getSearchCats);
router.put(`/cat/:id`, verifyAuthToken, updateCat);
router.post(`/add-cat`, verifyAuthToken, addCat);
router.delete(`/cat/:id`, verifyAuthToken, deleteCat);
module.exports = router;
