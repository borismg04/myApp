import modelUser from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

//Registro de Usuario
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
    user.token = generateId();

    const userRegister = await user.save();
    res.json({message: "Usuario registrado correctamente✅", userRegister});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar el usuario ⛔" });
  }
};

const handlerAuthenticateUser = async (req, res) => {
  const { email , password } = req.body;
  //Verificar si el usuario existe o no esta en la base de datos
  const user = await modelUser.findOne({ email });
    if (!user) {
      const error = new Error("El usuario no existe ⛔");
      return res.status(404).json({
        message: error.message,
      });
    }
  //verificar si el usuario esta confirmad o no
    if (!user.confirmado) {
      const error = new Error("Tu cuenta no ha sido confirmada ⚠️");
      return res.status(403).json({
        message: error.message,
      });
    }
    //Verificar si la contraseña es correcta
    if (await user.isValidPassword(password)) {
      res.json({
        message: "Usuario autenticado correctamente ✅",
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        token: generateJWT(user._id),
      });
    }else{
      const error = new Error("Contraseña incorrecta ⛔");
      return res.status(403).json({
        message: error.message,
      });
    }
  }


export {
  handlerRegisterUser,
  handlerAuthenticateUser,
}
