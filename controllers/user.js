// DEPENDENCIES
// ======================================================
const db = require("../models");
const router = require("express").Router();
const bcrypt = require('bcrypt');


// ROUTES
// ======================================================
// READS SESSION COOKIE
router.get('/readsessions', ({ session: { user } }, res) => { (!user) ? res.status(403).end() : res.json(user) })

// LOGOUT
router.get("/logout", ({ session } = req, res) => {
    if (!session.user) res.status(403).end()
    session.destroy();
    res.send("logout complete!")
})

// LOGIN
router.post('/login', async ({ body: { email, password } = req, session }, res) => {
    try {
        let user = await db.user.findOne({ where: { email: email } })
        if (!user) res.status(404).send("No such user exists")
        if (!bcrypt.compareSync(password, user.password)) res.status(401).send("Incorrect password")
        session.user = user

        res.json(session)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// REGISTER. NEEDS TO CREATE A CART ASSOCIATED WITH THE USER.
router.post("/register", async (req, res) => {
    try {
        let userData = await db.user.create(req.body)
        res.json(userData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// UPDATE
router.put('/update/:userId', async ({ session, body, params: { userId } } = req, res) => {
    if (session.user.userId !== userId) res.status(403).end()
    try {
        const userData = await db.user.update(body, { where: { userId: userId } })
        session.user = await db.user.findOne({ where: { userId: userId } })
        res.json(session)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// DELETE USER
router.delete('/delete/:userId', async ({ session, params: { userId } } = req, res) => {
    if (session.user.userId !== userId) res.status(403).end()
    try {
        const userData = await db.user.destroy({ where: { userId: userId } })
        session.destroy()
        res.json(userData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})


// EXPORT
// ======================================================
module.exports = router;