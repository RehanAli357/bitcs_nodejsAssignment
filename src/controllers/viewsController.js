const path = require("path");

const showIndexHtml = (req, res) => {
  res.sendFile(path.join(__dirname,'..','views','/index.html'));
};

const showCatDetails = (req,res)=>{
  res.sendFile(path.join(__dirname,"..","views",'/cat.html'));
}

module.exports = { showIndexHtml,showCatDetails };
