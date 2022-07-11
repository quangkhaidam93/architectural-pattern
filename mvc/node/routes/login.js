const express = require("express");
const { registerView, loginView, registerUser, loginUser } = require("../controllers/loginController");
const router = express.Router();
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");

router.get("/register", registerView);
router.get("/login", loginView);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", protectRoute, dashboardView);

module.exports = router;
