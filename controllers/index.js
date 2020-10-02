// DEPENDENCIES AND VARIABLES
// ===============================================
const express = require("express");
const router = express.Router();
const userRoutes = require("./user")
const classRoutes = require("./class")


// SUBROUTES
// ===============================================
router.use("/api/users",userRoutes)
router.use("/api/classes",classRoutes)


// EXPORT
// ===============================================
module.exports = router