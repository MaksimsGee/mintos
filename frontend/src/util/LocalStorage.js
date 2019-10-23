import Debug from 'debug';

const storageKey = name => `mintos:ls:${name}`;
const debug = Debug('component:ls'); // eslint-disable-line

export default {
  write(name, item) {
    return window.localStorage.setItem(storageKey(name), JSON.stringify(item));
  },
  read(name) {
    return JSON.parse(window.localStorage.getItem(storageKey(name)));
  },
};
