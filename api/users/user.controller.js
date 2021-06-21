const { create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser } = require("../users/user.service");
const { genSaltSync,hashSync,compareSync } = require('bcrypt');
const { sign } = require("jsonwebtoken");
 
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
            const salt = genSaltSync(7);
            body.password = hashSync(body.password, salt);
            create(body, (err, results) => {
                if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
                }
                return res.status(200).json({
                success: 1,
                data: results
                });
            });
        },
    // login: (req, res) => {
    //     const body = req.body;
    //     getUserByUserEmail(body.email, (err, results) => {
    //         if (err) {
    //         console.log(err);
    //         }
    //         if (!results) {
    //         return res.json({
    //             success: 0,
    //             data: "Invalid email or password"
    //         });
    //         }
    //         const result = compareSync(body.password, results[0].password);
    //         if (result) {
    //         results.password = undefined;
    //         const jsontoken = sign({ result: results[0] }, "process.env.JWT_SecretKEY", {
    //             expiresIn: "1h"
    //         });
    //         return res.json({
    //             success: 1,
    //             message: "login successfully",
    //             token: jsontoken
    //         });
    //         } else {
    //         return res.json({
    //             success: 0,
    //             data: "Invalid email or password"
    //         });
    //         }
    //     });
    //     },
    login: async (req, res, next) => {
        try {
          const body = req.body;
          const user = await getUserByUserEmail(body.email);
          if (!user.length) {
            const err = new Error('Invalid username or password');
          }
          const result = compareSync(body.password, user[0].password);
          if (result) {
            delete user[0].password;
            const jsontoken = sign({
                result: user[0],
              },
              process.env.JWT_SecretKEY, {
                expiresIn: "1h",
              }
            );
            return res.json({
              success: 1,
              message: "login successfully",
              token: jsontoken,
            });
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (e) {
          next(e);
        }
      },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
            console.log(err);
            return;
            }
            if (!results) {
            return res.json({
                success: 0,
                message: "Record not Found"
            });
            }
            results.password = undefined;
            return res.json({
            success: 1,
            data: results
            });
        });
        },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
            console.log(err);
            return;
            }
            return res.json({
            success: 1,
            data: results
            });
        });
        },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
            console.log(err);
            return;
            }
            return res.json({
            success: 1,
            message: "updated successfully"
            });
        });
        },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
            console.log(err);
            return;
            }
            if (!results) {
            return res.json({
                success: 1,
                message: "user deleted successfully"
               
            });
            }
            return res.json({
                success: 0,
                message: "Record Not Found"
            });
        });
        }
};