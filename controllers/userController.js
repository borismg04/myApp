import modelUser from "../models/User.js";
const handlerRegisterUser = async (req, res) => {
  // Evitar registro de usuarios duplicados
  const { email } = req.body;
  const userDuplicate = await modelUser.findOne({ email });

  if (userDuplicate) {
    const error = new Error("El usuario ya existe ⛔");
    return res.status(400).json({
      message: error.message,
    });
  }

  console.log(`El usuario ${email} ya existe`);
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
