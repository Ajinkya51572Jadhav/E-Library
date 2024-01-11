

const express =require("express");
  
const router = express.Router();

const {home,register, login, user, admin,userdelete,msgdelete,userhistorydelete} = require("../controllers/auth-controllers");
const jwtVerify = require("../middleware/auth-verfiy-jwt");

router.route("/").get(home);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").get(jwtVerify,user);
router.route("/admin").get(admin);
router.route("/userdelete/:id").delete(userdelete);
router.route("/msgdelete/:id").delete(msgdelete);
router.route("/userhistorydelete/:id").delete(userhistorydelete);

module.exports=router; 



   