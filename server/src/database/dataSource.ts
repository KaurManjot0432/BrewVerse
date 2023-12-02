import { connect, connection } from 'mongoose';
import Logger from '../core/Logger';
import { db } from '../config';

// const dbURI = process.env.MONGODB_URI;
// console.log(dbURI);
// Logger.debug(dbURI);

export const mongoose = {
  run: async () => {
    try {
      const res = await connect('mongodb://127.0.0.1:27017/brew_verse');
      console.log("connected mongodb");
      return res;
    } catch (e) {
        Logger.info('Mongoose connection error');
        Logger.error(e);
    }
  },

  stop: async () => {
    try {
      return await connection.destroy()
    } catch (e) {
        Logger.info('Mongoose disconnection error');
        Logger.error(e);
    }
  }
}