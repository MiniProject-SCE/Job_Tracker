const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const upload = require("../routes/fileUpload");
const DetailJobUser = require("../models/DetailJobUser");
const ApplicationJobUser = require("../models/Applications");
const ContactJobUser = require("../models/Contact");
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
    body("about", "Enter a valid About").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      console.log("hai");
      console.log(req.user.id);
      const { name, mobileno, designation, working, about } = req.body;
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
        about,
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
  const { name, mobileno, designation, working, about } = req.body;

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
    if (about) {
      newUser.about = about;
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

//ROUTE 6 - Logged in  user details to view documents : GET "/api/jobtracker/uploadDoc/:id
router.get("/uploadDoc/:id", async (req, res) => {
  const userpost = await DetailJobUser.findone({ id: `${req.params.id}` });
  if (userpost != null) {
    res.json(userpost.file);
  } else {
    res.status(404).send("File not found");
  }
});

//ROUTE 7 - GET JOB APPLICATION DETAILS
router.get("/getApplication", fetchuser, async (req, res) => {
  try {
    const detailuser = await ApplicationJobUser.find({ user: req.user.id });
    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 8- ADD JOB APPLICATION
router.post(
  "/addApplication",
  fetchuser,
  [
    body("company", "Enter a valid Company Name").isLength({ min: 3 }),
    body("salary", "Enter a valid Salary").isLength({ min: 3 }),
    body("title", "Enter a valid Name").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 6 }),
    body("usernameUsed", "Enter a valid userName").isLength({ min: 3 }),
    body("pwdUsed", "Enter a valid Password").isLength({ min: 3 }),
    body("urlUsed", "Enter a valid Url").isLength({ min: 3 }),
    body("deadLine", "Enter a valid DeadLine").isLength({ min: 3 }),
    body("interviewDate", "Enter a valid Interview Date").isLength({ min: 3 }),
    body("category", "Enter a valid Category").isLength({ min: 3 }),
    body("location", "Enter a valid Location").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      console.log("hai");
      console.log(req.user.id);
      const {
        company,
        salary,
        title,
        description,
        usernameUsed,
        pwdUsed,
        deadLine,
        interviewDate,
        category,
        location,
        urlUsed,
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userdet = new ApplicationJobUser({
        user: req.user.id,
        company,
        salary,
        title,
        description,
        usernameUsed,
        pwdUsed,
        deadLine,
        interviewDate,
        category,
        location,
        urlUsed,
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

//ROUTE 9 - UPDATE APPLICATION
router.put("/updateApplication/:id", fetchuser, async (req, res) => {
  const {
    company,
    salary,
    title,
    description,
    usernameUsed,
    pwdUsed,
    deadLine,
    interviewDate,
    category,
    location,
    urlUsed,
  } = req.body;

  console.log(req.body);
  try {
    //Create a newUser object
    const newApplication = {};
    //validate and check which field is available and update accordingly
    if (company) {
      newApplication.company = company;
    }
    if (salary) {
      newApplication.salary = salary;
    }
    if (title) {
      newApplication.title = title;
    }
    if (description) {
      newApplication.description = description;
    }
    if (usernameUsed) {
      newApplication.usernameUsed = usernameUsed;
    }
    if (pwdUsed) {
      newApplication.pwdUsed = pwdUsed;
    }
    if (deadLine) {
      newApplication.deadLine = deadLine;
    }
    if (interviewDate) {
      newApplication.interviewDate = interviewDate;
    }
    if (category) {
      newApplication.category = category;
    }
    if (location) {
      newApplication.location = location;
    }
    if (urlUsed) {
      newApplication.urlUsed = urlUsed;
    }
    console.log("i am in");
    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    console.log(req.params.id);
    let applicationupdate = await ApplicationJobUser.findById(req.params.id);
    console.log(applicationupdate);
    if (!applicationupdate) {
      return req.status(404).send("Not Found");
    }
    if (applicationupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    console.log("i am in 2");

    applicationupdate = await ApplicationJobUser.findByIdAndUpdate(
      req.params.id,
      { $set: newApplication },
      { new: true }
    );
    res.json({ applicationupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 10 - DELETE JOB APPLICATION
router.delete("/deleteApplication/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await ApplicationJobUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await ApplicationJobUser.findByIdAndDelete(req.params.id);
    res.json({
      Success: "User Details has been deleted",
      userupdate: userupdate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 11 - Notes for user : POST "/api/jobtracker/notes/:id
router.post("/notes/:id", fetchuser, async (req, res) => {
  const { title, descriptions } = req.body;
  console.log(req.user.id);
  const userdet = new NotesUser({
    user: req.user.id,
    title,
    descriptions,
  });
  const savedPost = await userdet.save();
  res.json(savedPost);
});

//ROUTE 12 - Notes for user : GET "/api/jobtracker/notes"
router.get("/notes", fetchuser, async (req, res) => {
  try {
    const detailuser = await NotesUser.find({ user: req.user.id });
    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 13 - Notes for user : PUT "/api/jobtracker/updateNote/:id"
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  const { title, descriptions } = req.body;

  console.log(req.body);
  try {
    //Create a newUser object
    const newNote = {};
    //validate and check which field is available and update accordingly
    if (title) {
      newNote.title = title;
    }
    if (descriptions) {
      newNote.descriptions = descriptions;
    }

    console.log("i am in");
    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    let noteupdate = await NotesUser.findById(req.params.id);
    console.log(noteupdate);
    if (!noteupdate) {
      return req.status(404).send("Not Found");
    }
    if (noteupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    noteupdate = await NotesUser.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ noteupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 14 - DELETE Notes for user : DELETE "/api/jobtracker/deleteNote/:id"
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await NotesUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await NotesUser.findByIdAndDelete(req.params.id);
    res.json({
      Success: "User Details has been deleted",
      userupdate: userupdate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 15 - GET CONTACTS
router.get("/getContacts", fetchuser, async (req, res) => {
  try {
    const detailuser = await ContactJobUser.find({ user: req.user.id });
    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 16 - ADD CONTACTS
router.post(
  "/addContact",
  fetchuser,
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("designation", "Enter a valid Designation").isLength({ min: 3 }),
    body("location", "Enter a valid Location").isLength({ min: 3 }),
    body("phoneno", "Enter a valid Phone No").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isLength({ min: 3 }),
    body("linkedin", "Enter a valid LinkedIn url").isLength({ min: 3 }),
    body("github", "Enter a valid Github url").isLength({ min: 3 }),
    body("portfolio", "Enter a valid Portfolio").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      console.log("hai");
      console.log(req.user.id);
      const {
        name,
        designation,
        location,
        phoneno,
        email,
        linkedin,
        github,
        portfolio,
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userdet = new ContactJobUser({
        user: req.user.id,
        name,
        designation,
        location,
        phoneno,
        email,
        linkedin,
        github,
        portfolio,
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

//ROUTE 17 - UPDATE CONTACTS
router.put("/updateContact/:id", fetchuser, async (req, res) => {
  const {
    name,
    designation,
    location,
    phoneno,
    email,
    linkedin,
    github,
    portfolio,
  } = req.body;

  console.log(req.body);
  try {
    //Create a newUser object
    const newApplication = {};
    //validate and check which field is available and update accordingly
    if (name) {
      newApplication.name = name;
    }
    if (designation) {
      newApplication.designation = designation;
    }
    if (location) {
      newApplication.location = location;
    }
    if (phoneno) {
      newApplication.phoneno = phoneno;
    }
    if (email) {
      newApplication.email = email;
    }
    if (linkedin) {
      newApplication.linkedin = linkedin;
    }
    if (github) {
      newApplication.github = github;
    }
    if (portfolio) {
      newApplication.portfolio = portfolio;
    }

    console.log("i am in");
    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    console.log(req.params.id);
    let applicationupdate = await ContactJobUser.findById(req.params.id);
    console.log(applicationupdate);
    if (!applicationupdate) {
      return req.status(404).send("Not Found");
    }
    if (applicationupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    console.log("i am in 2");

    applicationupdate = await ContactJobUser.findByIdAndUpdate(
      req.params.id,
      { $set: newApplication },
      { new: true }
    );
    res.json({ applicationupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 18 - DELETE CONTACTS
router.delete("/deleteContact/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await ContactJobUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await ContactJobUser.findByIdAndDelete(req.params.id);
    res.json({
      Success: "User Details has been deleted",
      userupdate: userupdate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
