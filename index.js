const express = require("express");
const { request } = require("https");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended : true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

let posts =[
    {
        id : uuidv4(),
        username : "SarveshShinde",
        content : "I love coding"
    },
      {
        id : uuidv4(),
        username : "SujalLubal",
        content : "Hard is important to achieve success"
    },
      {
        id : uuidv4(),
        username : "DishaJadhav",
        content : "I got selected for my first internship!"
    },
    
];


app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let {username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{ //: phkt backend sathi vaprtat
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res)=> {
     let { id } = req.params;
     let newContent = req.body.content;
     let post = posts.find((p)=> id === p.id)
     post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let { id } = req.params;
     let post = posts.find((p)=> id === p.id);
     res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res)=> {
    let { id } = req.params;
     posts = posts.filter((p)=> id !== p.id);
     res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log(`listening to the port: ${port}`);
});

