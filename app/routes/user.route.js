const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user.controller");
const uuidValidator = require("../middleware/uuidValidator");
const { validateUser, validateUserUpdate } = require("../middleware/validationMiddleware");

router.get("/",user_controller.getUsers);
router.get("/:uuid",uuidValidator,user_controller.getUser);
router.post("/",validateUser,user_controller.createUser);
router.patch("/:uuid",uuidValidator,validateUserUpdate,user_controller.updateUser);
router.delete("/:uuid",uuidValidator,user_controller.deleteUser);

module.exports = router;