const User = require("../models/usermodels")
// const  auth = require("../middlewear/auth")
const helper = require("../middlewear/helper")


module.exports = {
    getprofle: async (req, res) => {
        try {
            //  const userId = req.params.id

            const user = await User.findByPk(req.user.id)

            if (!user) {
                return helper.success(res, "profile get success", userInfo);

            }
            res.json({ user })
        } catch (error) {
            console.log(error, "error");
            console.log(error)
            res.status(500).json({ message: "internal error" })
        }
    }
}