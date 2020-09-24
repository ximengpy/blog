const mongoose = require("mongoose");


let articleInfo = mongoose.model("articleInfo",new mongoose.Schema({
  tags : {
    type : Array,
    default : ["HTML&Css","JavaScript","Node","Vue&React","Other"]
  },
  num : Number,

}));

articleInfo.create({
  tags : ["HTML&Css","JavaScript","Node","Vue&React","Other"],
  num : 0
});

module.exports = articleInfo;
