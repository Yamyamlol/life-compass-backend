import { Console } from "console";
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  console.log("cookie: ", req.cookies)

  if (!token) {
    console.log("token not here")
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }
  try {
    console.log("decoding token")
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token: ", tokenDecode)
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
      console.log("req: ",req)
    } else {
      console.log("user id could not be attatched")
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    next();
  } catch (error) {
    console.log("caught an error: ", error)
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
