import mongoose from 'mongoose';

const createConnection = async () => {
  return await mongoose.connect(process.env.mongoURI || '', {
    dbName: process.env.mongoDBName || '',
    socketTimeoutMS: 1000
  });
};

export default createConnection;
