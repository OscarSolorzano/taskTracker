const { app } = require('./app');

//Utils
const { db } = require('./utils/database.util');
const { initModels } = require('./models/initModels');

const startServer = async () => {
  try {
    //Database authenticated
    await db.authenticate();

    //Establish relations
    initModels();

    //Database synced
    await db.sync();

    //Set server to listen
    const PORT = 4000;

    app.listen(PORT, () => {
      console.log(`Express app running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
