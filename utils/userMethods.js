const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = async (payload) => {
  try {
    if (payload?.email == null || payload?.role == null)
      throw new Error('Datos del token inválidos.');

    if (payload?.email === '' || payload?.role === '')
      throw new Error('Datos del token vacíos.');

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_TTL,
    });
    return token;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

const registerUser = async (payload) => {
  try {
    const newUser = new User(payload);
    await newUser.save();
    return { success: true, data: newUser.email };
  } catch (ex) {
    //console.log(ex);
    if (ex.code === 11000)
      return {
        success: false,
        error: `Ya existe un usuario con el email (${
          User(payload).email
        }) registrado`,
      };
    else return 'Error: ' + ex;
  }
};

const loginUser = async (username, password) => {
  const usr = await User.findOne({ email: username }); //convierte el email en username
  if (!usr) throw new Error('Usuario no encontrado');

  const passwordMatch = await usr.comparePassword(password);
  if (!passwordMatch)
    throw new Error('Nombre de usuario o contrasena no valida.');
  else
    return await createToken({
      email: usr.email,
      role: usr.role,
    });
};

module.exports = {
  createToken,
  registerUser,
  loginUser,
};
