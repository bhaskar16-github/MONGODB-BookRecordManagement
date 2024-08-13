const express = require("express");

const {UserModel, BookModel} = require("../models");

const {
  getAllUsers,
  getSingleUserbyId,
  deleteUser,
  updateUserById,
  createNewUser,
  getSubscriptionDetailsById
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getSingleUserbyId);

router.post("/", createNewUser);

router.put("/:id", updateUserById);

router.delete("/:id", deleteUser);

router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;