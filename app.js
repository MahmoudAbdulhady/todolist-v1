
const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;

// Array of items
const items=["Buy Food" , "Cook Food" , "Eat Food"];
const workItems=[];

app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// TO DO LIST
app.get("/" , function (req , res)
{
  let day=date.getDate();

    res.render("list" , {listTitle: day , newListItems: items});
});

app.post("/", function(req , res)
{

  let item = req.body.newItem;
  if (req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }

});


// WORK list
app.get("/work" , function(req , res)
{
  res.render("list", {listTitle: "Work List" , newListItems: workItems});
});

app.post("/work" , function(req , res)
{
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


// About us

app.get("/about" , function(req , res)
{
  res.render("about");
});



// RUNNING THE SERVER ON PORT 3000
app.listen(port , function ()
{
  console.log("Server is up and running on port 3000");
})
