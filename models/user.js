const { Schema, model } = require('mongoose');
const { compare, genSalt, hash } = require('bcrypt');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Debe ingresar el correo electrónico.'],
    },
    name: {
      type: String,
      required: [true, 'Debe ingresar el nombre completo'],
    },
    role: {
      type: String,
      require: [true, 'Debe ingresar el rol del usuario'],
    },
    birthdate: {
      type: Date,
      required: [true, 'Debe ingresar la fecha de nacimiento'],
    },
    password: {
      type: String,
      required: [true, 'Debe ingresar su password'],
    },
  },
  {
    timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdate' },
  }
);

//CIFRAR PASSWORD ANTES DE GUARDAR
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await genSalt(+process.env.SALTING_ROUNDS); //el + convierte cadena en un número
  this.password = await hash(this.password, salt);
  next();
});

//comparar contraseñas
userSchema.methods.comparePassword = async function (plainTextPwd) {
  return await compare(plainTextPwd, this.password);
};

const User = model('User', userSchema);
module.exports = User;
