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
    },
    statuschange: async (req, res) => {
        try {

            console.log(req.user.status, '-----=-=============')

            const { id, status } = req.body;
            console.log(id, '=--==--=-=-=-=--=-=-=-=-=-=-=-d-=-=-=-==-d')
            return
            if (!id || status === undefined) {
                return res.status(400).send("Invalid data");
            }
            // console.log("id=======".id);return

            const change = await User.update(
                { status: status },
                { where: { id: id } }
            );

            if (!change[0]) {
                return res.status(404).send("id not found");
            }

            res.status(200).send({ message: "Status updated successfully", change });
        } catch (error) {
            console.log("Please check issue", error);
            res.status(500).send("Internal server error");
        }
    }

}