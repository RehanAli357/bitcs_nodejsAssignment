const {
  fetchCats,
  searchCats,
  updateCatRecords,
  addCatRecords,
  deleteCatRecord,
} = require("../models/db");

const getAllCats = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const data = await fetchCats(id, limit, offset);
    res.status(200).json({ data, totalData: data.length });
  } catch (err) {
    console.log("Error on getAllCats()=>", err.message);
    res.status(403).json({ error: err.message });
  }
};

const getSearchCats = async (req, res) => {
  const rangeFrom = parseInt(req.query.rangeFrom);
  const rangeTo = parseInt(req.query.rangeTo);
  if (rangeFrom && rangeTo && rangeFrom <= rangeTo) {
    const data = await searchCats(rangeFrom, rangeTo);
    res.status(200).json(data);
  } else {
    res.status(403).json({ error: "Enter correct Field" });
  }
};

const updateCat = async (req, res) => {
  const { id } = req.params;
  const { name, age, breed } = req.body;
  if (id) {
    const data = await updateCatRecords(id, name, age, breed);
    if (data) {
      res.status(200).json({ message: "Record Updated" });
    } else {
      res.status(500).json({ message: "Unable to update Records" });
    }
  } else {
    res.status(403).json({ message: "No Such Id Found" });
  }
};

const addCat = async (req, res) => {
  const { name, age, breed } = req.body;
  try {
    const data = await addCatRecords(name, age, breed);
    if (data) {
      res.status(200).json({ message: "Record Added" });
    } else {
      res.status(500).json({ message: "Unable to add Record" });
    }
  } catch (error) {
    console.log("Error on addCat()=>", err.message);
    res.status(403).json({ error: err.message });
  }
};

const deleteCat = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const data = await deleteCatRecord(id);
      if (data) {
        res.status(200).json({ message: "Record Deleted" });
      } else {
        res.status(500).json({ message: "Unable to delete Record" });
      }
    }
  } catch (error) {
    console.log("Error on deleteCat()=>", err.message);
    res.status(403).json({ error: err.message });
  }
};
module.exports = { getAllCats, getSearchCats, updateCat, addCat, deleteCat };
