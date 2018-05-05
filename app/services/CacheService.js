import Promise from 'bluebird';
import {
  AsyncStorage,
} from 'react-native';

/* A simple wrapper over React Native's AsyncStorage (with bluebird.Promises). */
export default class CacheService {
  static set = (key, value) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
        return error ? reject(error) : resolve();
      });
    });
  }

  static get = (key) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, item) => {
        return error ? reject(error) : resolve(item ? JSON.parse(item) : null);
      });
    });
  }
}
