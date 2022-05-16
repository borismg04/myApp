import modelUser from "../models/User.js";
const handlerRegisterUser = async (req, res) => {
  try {
    const user = new modelUser(req.body);
    const userRegister = await user.save();
    res.json({message: "Usuario registrado correctamente✅", userRegister});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar el usuario ⛔" });
  }
}

export {
  handlerRegisterUser
}
