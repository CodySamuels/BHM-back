// DEPENDENCIES
// ======================================================
const db = require("../models");
const router = require("express").Router();
const bcrypt = require('bcrypt');


// ROUTES
// ======================================================
// READS SESSION COOKIE
router.get('/readsessions', ({ session: { user } }, res) => {
    (!user) ? res.status(403).end() : res.json(user)
})

// LOGOUT
router.get("/logout", ({ session }, res) => {
    session.destroy();
    res.send("logout complete!")
})

// LOGIN
router.post('/login', async ({ body: { email, password }, session }, res) => {
    try {
        let user = await db.User.findOne({ where: { email: email } })
        if (!user) res.status(404).send("No such user exists")
        if (!bcrypt.compareSync(password, user.password)) res.status(401).send("Incorrect password")
        session.user = {
            email: user.email,
            isAdmin: user.isAdmin
        }

        res.json(session)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// REGISTER
router.post("/register", async (req, res) => {
    try {
        let userData = await db.User.create(req.body)
        res.json(userData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// UPDATE
// router.put('/update/', async (req, res) => {
//     try {

//         console.log('err')
//     }

//     catch (err) {
//         console.error(err)
//         res.status(500).end()
//     }
// })

// EXPORT
// ======================================================
module.exports = router;