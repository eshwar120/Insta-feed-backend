const jwt = require("jsonwebtoken");
const User = require("../model/User");
// const cookieParser = require('cookie-parser')

const refreshToken = async (req, res, next) => {
  console.log(req.cookies)
  try {
    let data;
    // console.log(req)
    jwt.verify(
      req.cookies.jwt,
      process.env.REFRESH_TOKEN_KEY,
      (err, decoded) => {
        // console.log(err)
        if (err) return res.clearCookie("jwt").status(403).json({ status: "unauthorized entry" , logOut : true});
        else {
          data = decoded;
        }
      }
    );

    if (data) {
        if (req.error.message === "jwt expired") {
            const accessToken = await jwt.sign(
              {
                  id: userDataFromDB._id,
                  email: userDataFromDB.email,
              },
              process.env.ACCESS_TOKEN_KEY,
              { expiresIn: "30s" }
            );
            req.accessToken = accessToken;
            next();
        }
        else {
          const userData = await User.findOne({ _id: data.id });
          userData.refreshToken = [];
          await userData.save();
          return res.clearCookie("jwt").status(403).json({ status: "unauthorized entry" , logOut : true});
        }
    }
  } catch (err) {
    res.status(500).json({ "status": err.message });
  }
};


module.exports = refreshToken;