import mongoose from 'mongoose';

const createConnection = async () => {
  await mongoose
    .connect(process.env.mongoURI || '', {
      dbName: process.env.mongoDBName || '',
      socketTimeoutMS: 1000
    })
    .then(() => console.log('MongoDB is connected'))
    .catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
};

export default createConnection;
