// DEPENDENCIES AND VARIABLES
// ===============================================
const express = require("express");
const router = express.Router();
const userRoutes = require("./user")


// SUBROUTES
// ===============================================
router.use("/api/users",userRoutes)


// EXPORT
// ===============================================
module.exports = router