const User = require("../models/usermodels")


module.exports = {
    viewpage: async (req, res) => {
        try {
            const userID = req.body.id

            const user = await User.findByPk(userID)
            if (!user) {
                res.status(500).send("id not found")
            }
            res.json({ user })
        } catch (error) {
            console.log("internal error");
        }
    }
}