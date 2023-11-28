const mv = require('mv'); 

module.exports = {
  userId: () => {
    return "65097965bb8ecec67f5959f5";
  },
  checkValidation: async (v) => {
    var errorsResponse;

    await v.check().then(function (matched) {
      if (!matched) {
        var valdErrors = v.errors;
        var respErrors = [];
        Object.keys(valdErrors).forEach(function (key) {
          if (valdErrors && valdErrors[key] && valdErrors[key].message) {
            respErrors.push(valdErrors[key].message);
          }
        });
        errorsResponse = respErrors.join(", ");
      }
    });
    return errorsResponse;
  },

  failed: (res, message = "") => {
    message =
      typeof message === "object"
        ? message.message
          ? message.message
          : ""
        : message;
    return res.status(400).json({
      success: false,
      code: 400,
      message: message,
      body: {},
    });
  },
  success: (res, message = "", body = {}) => {
    return res.status(200).json({
      success: true,
      code: 200,
      message: message,
      body: body,
    });node
  },
   fileUpload:async (files, folder = "users") =>{
    const file_name_string = files.name;
    const file_name_array = file_name_string.split(".");
    const file_ext = file_name_array[file_name_array.length - 1];

    const letters = "ABCDE1234567890FGHJK1234567890MNPQRSTUXY";
    let result = "";

    while (result.length < 28) {
      const rand_int = Math.floor(Math.random() * 19 + 1);
      const rand_chr = letters[rand_int];
      if (result.substr(-1, 1) !== rand_chr) result += rand_chr;
    }

    const resultExt = `${result}.${file_ext}`;

    console.log("🚀 ~ file: file.js:2--1 ~ fileUpload ~ resultExt:", resultExt);
    await files.mv(`public/images/${folder}/${resultExt}`, function (err) {
      if (err) {
        throw err;
      }
    });

    return `/images/${folder}/${resultExt}`;
  },
  // async fileUpload(files, folder = "users") {
  //   const file_name_string = files.name;
  //   const file_name_array = file_name_string.split(".");
  //   const file_ext = file_name_array[file_name_array.length - 1];

  //   const letters = "ABCDE1234567890FGHJK1234567890MNPQRSTUXY";
  //   let result = "";

  //   while (result.length < 28) {
  //     const rand_int = Math.floor(Math.random() * 19 + 1);
  //     const rand_chr = letters[rand_int];
  //     if (result.substr(-1, 1) !== rand_chr) result += rand_chr;
  //   }

  //   const resultExt = `${result}.${file_ext}`;

  //   console.log("🚀 ~ file: file.js:2--1 ~ fileUpload ~ resultExt:", resultExt);
  //   await files.mv(`public/images/${folder}/${resultExt}`, function (err) {
  //     if (err) {
  //       throw err;
  //     }
  //   });

  //   return resultExt;
  // },
};
