require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});
const User = mongoose.model("user", userSchema);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("home");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/login", function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email:username},function(err,foundUser){
        if (!err){
            if (foundUser){
                if (foundUser.password === password){
                    res.render("secrets");
                }
            }
        } else{
            console.log(err);
        }
    });
});

app.post("/register", function(req,res) {
    
});





app.listen(3000, function(){
    console.log("Server started on port 3000");
    
});