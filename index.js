// const express = require("express");
// const app = express();
// const path = require("path");
// const router = express.Router();
// const bodyParser = require("body-parser"); // add body-parser module

// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

// app.use(bodyParser.urlencoded({ extended: true })); // use body-parser

// router.get("/", (req, res) => {
//   res.render("popup");
// });

// router.get("/index", (req, res) => {
//   res.render("index");
// });

// app.post("/login", (req, res) => {
//   const { name, password } = req.body;

//   if (name === "admin" && password === "admin") {
//     res.render("success", {
//       username: name,
//     });
//   } else {
//     res.render("failure");
//   }
// });

// router.get("/about", (req, res) => {
//   res.render("about", { title: "Hey", message: "The file is getting rendered" });
// });

// app.use("/", router);
// app.listen(process.env.PORT || 3000, () => { 
//   console.log("Running at Port 3000");
// });



const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs"); // add the fs module to read the data.json file

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("popup");
});

router.get("/index", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  // read the data.json file and parse its contents
  const data = JSON.parse(fs.readFileSync("data.json"));

  // check if the user exists in the data.json file
  const user = data.users.find((user) => user.name === name && user.password === password);

  if (user) {
    res.render("success", {
      username: name,
    });
  } else {
    res.render("failure");
  }
});

router.get("/about", (req, res) => {
  res.render("about", { title: "Hey", message: "The file is getting rendered" });
});

app.use("/", router);
app.listen(process.env.PORT || 3000, () => {
  console.log("Running at Port 3000");
});
