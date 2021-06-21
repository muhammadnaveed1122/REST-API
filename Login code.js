login: (req, res) => {
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
        "qwe1234", {
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
  
}