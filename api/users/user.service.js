const pool = require("../../config/database");


module.exports = {
    create: (data, callBack) => {
        pool.query(`insert into registration1(first_name,last_name,email,password,address,gender) values(?,?,?,?,?,?)`,
        [
            data.first_name,
            data.last_name,
            data.email,
            data.password,
            data.address,
            data.gender,
        ],
        (error, results) => {
            if (error) {
            return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
     getUserByUserEmail: (email) => {
        return new Promise((resolve, reject) => {
          pool.query(
            `select * from registration1 where email = ?`,
            [email],
            (error, results, fields) => {
              if (error) {
                return reject(error);
              }
              return resolve(results);
            }
          );
        })
      },
    getUserByUserId: (id, callBack) => {
        pool.query(
        `select id,first_name,last_name,email,password,address,gender from registration1 where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) {
            callBack(error);
            }
            return callBack(null, results[0]);
        }
        );
    },
    getUsers: callBack => {
        pool.query(
        `select * from registration1`,
        [],
        (error, results, fields) => {
            if (error) {
            callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
        `update registration1 set first_name=?, last_name=?, email=?, password=?, address=?, gender=? where id = ?`,
        [
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.password,
            data.address,
            data.gender
        ],
        (error, results, fields) => {
            if (error) {
            callBack(error);
            }
            return callBack(null, results[0]);
        }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
        `delete from registration1 where id = ?`,
        [data.id],
        (error, results, fields) => {
            if (error) {
            callBack(error);
            }
            return callBack(null, results[0]);
        }
        );
    }
    };