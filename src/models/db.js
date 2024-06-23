const mysql = require("mysql2");
const env = require("dotenv");

env.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

const fetchCats = async (id, limit, offset) => {
  if (id) {
    try {
      const [rows] = await pool.query("SELECT * FROM Cats WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      console.log("Error on db.js fetchCats specific()=>", error.message);
      throw error.message;
    }
  } else {
    try {
      const [rows] = await pool.query("SELECT * FROM Cats LIMIT ? OFFSET ?", [
        limit,
        offset,
      ]);
      const [totalCount] = await pool.query(
        "SELECT COUNT(*) as total FROM Cats"
      );
      return { data: rows, totalCount: totalCount[0].total };
    } catch (error) {
      console.log("Error on db.js fetchCats all()=>", error.message);
      throw error.message;
    }
  }
};

const searchCats = async (rangeFrom, rangeTo) => {
  try {
    const [row] = await pool.query(
      "SELECT * FROM Cats WHERE age BETWEEN ? AND ?",
      [rangeFrom, rangeTo]
    );
    return row;
  } catch (error) {
    console.log("Error on db.js searchCats()=>", error.message);
    throw error.message;
  }
};

const updateCatRecords = async (id, name, age, breed) => {
  try {
    await pool.query("UPDATE Cats SET name= ?, age= ?, breed= ? where id= ?", [
      name,
      age,
      breed,
      id,
    ]);
    return true;
  } catch (error) {
    console.log("Error on db.js updateCatRecords()=>", error.message);
    throw error.message;
  }
};

const addCatRecords = async (name, age, breed) => {
  try {
    await pool.query("INSERT INTO Cats (name, age, breed) VALUES (?, ?, ?)", [
      name,
      age,
      breed,
    ]);
    return true;
  } catch (error) {
    console.error("Error on db.js addCatRecords()=>", error.message);
    return false;
  }
};

const deleteCatRecord = async (id) => {
  try {
    await pool.query("DELETE from Cats WHERE id= ?", [id]);
    return true;
  } catch (error) {
    console.error("Error on db.js deleteCatRecord()=>", error.message);
    return false;
  }
};

module.exports = {
  fetchCats,
  searchCats,
  updateCatRecords,
  addCatRecords,
  deleteCatRecord,
};
