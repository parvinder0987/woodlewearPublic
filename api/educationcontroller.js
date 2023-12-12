const helper = require("../middlewear/helper");
const User = require("../models/usermodels");

module.exports = {
    education: async (req, res) => {
        try {
            let document = null;
            if (req.files && req.files.document) {
                document = req.files.document;
                document = await helper.fileUpload(document);
            }
            const userId = req.body.id;
            const detail_data = await User.update(
                {
                    education: req.body.education,
                    stream: req.body.stream,
                    employeType: req?.body?.employeType,
                    document: document,
                },
                { where: { id: userId } }
            );


            console.log(detail_data, "=================");
            console.log("data will be updated", detail_data);

            return res.status(200).send({
                data: detail_data,
                message: "successfully",
                success: true,
            });
        } catch (error) {
            console.log("data not updated");

            return res.status(500).send({
                message: "error",
                success: false,
                error: error.message,
            });
        }
    },
};
