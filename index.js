const app = require('./app');
const db = require('./db/client');
const port = process.env.PORT;

const main = async () => {
  await db.connectToMongoDB();

  app.listen(port, () => {
    console.log('Backend escuchando en puerto: ' + port);
  });
};

main();
