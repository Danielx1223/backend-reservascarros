//conexión base de datos

const { connect, connection } = require('mongoose');
const { setUpMongoDBWatchers, gracefulShutdown } = require('./watchers');

const connectToMongoDB = async () => {
  const connectionString = process.env.DB_URL;

  try {
    await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.on('open', () => console.log('Conexión establecidad'));
    connection.on('error', () =>
      console.error.bind(console, 'Error en la conexión: ')
    );

    setUpMongoDBWatchers();
  } catch (error) {
    console.log(error);
  }
};

const closeMongoDB = gracefulShutdown;

module.exports = { connectToMongoDB, closeMongoDB };
