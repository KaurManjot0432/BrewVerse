import { connect, connection } from 'mongoose';
import Logger from '../core/Logger';

const dbURI = process.env.MONGODB_URI;
Logger.debug(dbURI);

export const mongoose = {
  run: async () => {
    try {
      const res = await connect(dbURI);
      Logger.info('Mongoose connection successful');
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