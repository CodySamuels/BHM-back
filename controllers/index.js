// DEPENDENCIES AND VARIABLES
// ===============================================
const express = require("express");
const router = express.Router();
const userRoutes = require("./user")
const classRoutes = require("./class")
const shopRoutes = require("./stripeController")


// SUBROUTES
// ===============================================
router.use("/api/users", userRoutes)
router.use("/api/classes", classRoutes)
router.use("/api/classes", shopRoutes)

// EXPORT
// ===============================================
module.exports = router