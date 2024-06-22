const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/getUsers").get(userController.getAllUsers);

router.route("/addUser").post(userController.createUser);

router.route("/getUser/:id").get(userController.getUser);

router.route("/updateUser/:id").patch(userController.updateUser);

router.route("/deleteUser/:id").delete(userController.deleteUser);

module.exports = router;
