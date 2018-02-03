// @flow
import Promise from 'bluebird';
import {
  AsyncStorage,
} from 'react-native';

/* A simple wrapper over React Native's AsyncStorage (with bluebird.Promises). */
export default class CacheService {
  set = (key: string, value: Object): Promise<*> => {
    return new Promise((resolve: *, reject: *) => {
      AsyncStorage.setItem(key, JSON.stringify(value), (error: Error) => {
        return error ? reject(error) : resolve();
      });
    });
  }

  get = (key: string): Promise<?Object> => {
    return new Promise((resolve: *, reject: *) => {
      AsyncStorage.getItem(key, (error: Error, item: ?string) => {
        return error ? reject(error) : resolve(item ? JSON.parse(item) : null);
      });
    });
  }
}
