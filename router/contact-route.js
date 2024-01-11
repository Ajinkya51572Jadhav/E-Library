


const express = require("express");
const { contact } = require("../controllers/auth-controllers");

          const router = express.Router();
        

          router.route("/contact").post(contact);


          module.exports=router;