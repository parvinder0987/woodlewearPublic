const { userId } = require("../middlewear/helper")
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
            const { status } = req.body;
            console.log('status =================.' , status)
            if (status === undefined) {
                return res.status(400).send("Invalid data");
            }
            let numericstatus;
            if (status == "active") {
                numericstatus = '1';
            } else if (status == "inactive") {
                numericstatus = '0';
            } else {
                return res.status(400).send("Invalid status");
            }
    
            const userId = req.user.id;
            const change = await User.update(
                { status: numericstatus },
                { where: { id: userId } }
            );
    
            if (!change[0]) {
                return res.status(404).send("User ID not found");
            }
            const updatedUserData = await User.findOne({ where: { id: userId } });
            if (!updatedUserData) {
                return res.status(404).send("User not found after update");
            }
            res.status(200).send({ message: "Status updated successfully", user: updatedUserData });
        } catch (error) {
            console.log("Please check issue", error);
            res.status(500).send("Internal server error");
        }
    }




}