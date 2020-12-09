const express = require("express");
const app = express();
const PORT = 8080; //default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

generateRandomString = function(max) {
  let charSet = "abcdefghijklmnopqrstuvwx123456789";
  let randomString = [];
  
  for(let i = 1; i <= 6; i++) {
    randomString.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
  }
  console.log(randomString); //printing for testing

  return randomString.join("");
}

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  //shortURL = `/urls/${generateRandomString(6)}`;
  //console.log(shortURL); //prinnt for testing
  const templateVars = {shortURL: req.params.shortURL, longURL:req.params.longURL};
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);
    res.send(req.body);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

