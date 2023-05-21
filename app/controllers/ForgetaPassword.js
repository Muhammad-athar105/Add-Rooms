import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

class UserController {
  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password don't match" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });
        res.send({ "status": "success", "message": "Password changed successfully" });
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" });
    }
  }

  static loggedUser = async (req, res) => {
    res.send({ "user": req.user });
  }

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
        console.log(link);
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`
        });
        res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" });
      } else {
        res.send({ "status": "failed", "message": "Email doesn't exist" });
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" });
    }
  }

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password don't match" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });
          res.send({ "status": "success", "message": "Password Reset Successfully" });
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ "status": "failed", "message": "Invalid Token" });
    }
  }
}

export default UserController;

