const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const upload = require("../routes/fileUpload");
const DetailJobUser = require("../models/DetailJobUser");
const ApplicationJobUser = require("../models/Applications");
const NotesUser = require("../models/Notes");
// const UploadUsers = require("../models/UploadDetail");
const app = express();
app.use("/uploads", express.static("uploads"));

const { body, validationResult } = require("express-validator");

//ROUTE 1 - Logged in  user details retrieval using : GET "/api/userdetails/getuser.LOGIN REQUIRED

router.get("/fetchuserdetails", fetchuser, async (req, res) => {
  try {
    const detailuser = await DetailJobUser.find({ user: req.users.id });

    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//To fetch all user list without authentication
router.get("/fetchAlluserdetails", async (req, res) => {
  try {
    const detailuser = await DetailJobUser.find();

    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE 2 - Logged in  user details adding details : GET "/api/userdetails/adduser.LOGIN REQUIRED
router.post(
  "/adduser",
  fetchuser,
  [
    // body("dob", "Enter a valid DateofBirth").isDate(),
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("mobileno", "Enter a valid mobile").isLength({ min: 10 }),
    body("designation", "Enter a valid designation").isLength({ min: 3 }),
    body("working", "Enter a valid working").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      console.log("hai");
      console.log(req.user.id);
      const { name, mobileno, designation, working } = req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //   console.log(req.user.id);
      // console.log(req.users.id);

      const userdet = new DetailJobUser({
        user: req.user.id,
        // user:req.user.id,
        name,
        mobileno,
        designation,
        working,
      });

      console.log(userdet);

      const saveduser = await userdet.save();

      res.json([saveduser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 - Logged in  user details updating details : GET "/api/userdetails/updateuser.LOGIN REQUIRED
router.put("/updateuser/:id", fetchuser, async (req, res) => {
  const { name, mobileno, designation, working } = req.body;

  console.log(req.body);
  try {
    //Create a newUser object
    const newUser = {};
    //validate and check which field is available and update accordingly
    if (name) {
      newUser.name = name;
    }
    if (mobileno) {
      newUser.mobileno = mobileno;
    }
    if (designation) {
      newUser.designation = designation;
    }
    if (working) {
      newUser.working = working;
    }
    console.log("i am in");
    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    console.log(req.params.id);
    let userupdate = await DetailJobUser.findById(req.params.id);
    console.log(userupdate);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }
    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    console.log("i am in 2");

    userupdate = await DetailJobUser.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json({ userupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4 - Logged in  user details deleting details : GET "/api/userdetails/deleteuser.LOGIN REQUIRED
router.delete("/deleteuser/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await DetailJobUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await DetailJobUser.findByIdAndDelete(req.params.id);
    res.json({
      Success: "User Details has been deleted",
      userupdate: userupdate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 5 - Logged in  user details upload documents : POST "/api/userdetails/uploadDoc/:id
router.post("/uploadDoc/:id", upload.array("file[]"), async (req, res) => {
  const userpost = await DetailJobUser.findOne({ id: `${req.params.id}` });
  if (req.files) {
    let path = "";
    req.files.forEach((files, index, arr) => {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    userpost.file = path;
    const savedPost = await userpost.save();
    res.json(savedPost);
  }
});

//ROUTE 6 - Logged in  user details to view documents : GET "/api/userdetails/uploadDoc/:id
router.get("/uploadDoc/:id", async (req, res) => {
  const userpost = await DetailJobUser.findone({ id: `${req.params.id}` });
  if (userpost != null) {
    res.json(userpost.file);
  } else {
    res.status(404).send("File not found");
  }
});
//ROUTE 5- Logged in  user details
router.post(
  "/addApplication",
  fetchuser,
  [
    // body("dob", "Enter a valid DateofBirth").isDate(),
    body("title", "Enter a valid Name").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 6 }),
    body("usernameUsed", "Enter a valid userName").isLength({ min: 3 }),
    body("pwdUsed", "Enter a valid Password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      console.log("hai");
      console.log(req.user.id);
      const { title, description, usernameUsed, pwdUsed } = req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //   console.log(req.user.id);
      // console.log(req.users.id);

      const userdet = new ApplicationJobUser({
        user: req.user.id,
        // user:req.user.id,
        title,
        description,
        usernameUsed,
        pwdUsed,
      });

      console.log(userdet);

      const saveduser = await userdet.save();

      res.json([saveduser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 7 - Notes for user : POST "/api/jobtracker/notes/:id
router.post("/notes/:id", async (req, res) => {
  const { title, description } = req.body;
  const userdet = new NotesUser({
    user: req.user.id,
    title,
    description,
  });
  const savedPost = await userdet.save();
  res.json(savedPost);
});

module.exports = router;
