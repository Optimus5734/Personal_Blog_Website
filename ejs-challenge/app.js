//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _= require('lodash');
const mongoose = require("mongoose");

//contents
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//dataBase
mongoose.connect("mongodb+srv://sagar-5734:Test123@cluster0.oc0kmhu.mongodb.net/blogDB",{useNewUrlParser:true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});


const postSchema = {
  title: String,
  content: String
  };

const Post = mongoose.model("Post", postSchema);

app.get("/",(req,res)=>{
  Post.find({}).then(posts => {
  res.render("home.ejs",{ homeStartingContent:homeStartingContent,
  posts:posts
  });
});
});
app.get("/about",(req,res)=>{
  res.render("about.ejs",{ aboutContent});
})
app.get("/contact",(req,res)=>{
  res.render("contact.ejs",{ contactContent});
})
app.get("/compose",(req,res)=>{
  res.render("compose.ejs",{ contactContent});
})

app.post("/compose",(req,res)=>{
  const post1=new Post({
    title:req.body.compose,
    content:req.body.postBody
  });
  // post1.save().then(err=>{
  //   if(!err){
  //     res.redirect("/");
  //   }
  // });
  post1.save();
      res.redirect("/");
});

app.get("/posts/:topic",(req,res)=>{
  const requestedPostId=req.params.postId;
  Post.find({_id:requestedPostId}).then(posts => {
    res.render("post.ejs",{title:homeStartingContent,
    content:posts
    });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
