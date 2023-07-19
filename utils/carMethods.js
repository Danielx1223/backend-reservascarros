const Car = require('../models/car');

const registerCar = async (payload) => {
  try {
    const newCar = new Car(payload);
    await newCar.save();
    return { success: true, data: newCar.plate };
  } catch (ex) {
    //console.log(ex);
    if (ex.code === 11000)
      return {
        success: false,
        error: `Ya existe un carro con el plate (${
          Car(payload).plate
        }) registrado`,
      };
    else return 'Error: ' + ex;
  }
};

module.exports = {
  registerCar,
};
