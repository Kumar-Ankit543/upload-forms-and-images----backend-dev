const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const app = express();

cloudinary.config({
  cloud_name: "purpl543hays",
  api_key: "141698237541695",
  api_secret: "ZO-iZkr2Bs4LLzgpv3AUDvcIVcs",
});

app.set("view engine", "ejs");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/myget", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/mypost", async (req, res) => {
  //use case for multiple image
  let result;
  let imageArray = [];
  for (let index = 0; index < req.files.samplefile.length; index++) {
    result = await cloudinary.uploader.upload(
      req.files.samplefile[index].tempFilePath,
      {
        folder: "users",
      }
    );
    imageArray.push({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  }

  //use case for single image
  // let file = req.files.samplefile;
  // result = await cloudinary.uploader.upload(file.tempFilePath, {
  //   folder: "users",
  // });
  details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray,
  };
  console.log(details);
  res.send(details);
});

app.get("/mygetform", (req, res) => {
  res.render("getform");
});

app.get("/mypostform", (req, res) => {
  res.render("postform");
});

app.listen(4000, () => {
  console.log(`Server running at port 4000...`);
});
