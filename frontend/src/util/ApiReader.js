import Vue from 'vue';
import qs from 'qs';
import url from 'url';
import _ from 'lodash';
import Debug from 'debug';
import store from '@/store/state';
import { normalizedApiUrl } from '@/util/Functions';

const debug = Debug('util:ApiReader');

const POST = 'POST';
const GET = 'GET';
const HEAD = 'HEAD';
const PATCH = 'PATCH';
const DELETE = 'DELETE';

export const isEmptyObject = (o) => {
  if (!_.isObject(o)) {
    return true;
  }
  return Object.keys(o).every(x => o[x] === '' || o[x] === null);
};

export const authEventBus = new Vue();

function rawRequest(method, path, query = null, body = null) {
  let target = url.resolve(normalizedApiUrl(), path.replace(/^\//, ''));
  target = url.parse(target, true, true);

  if (!isEmptyObject(query)) {
    let cleanQuery = {};
    Object.keys(query).forEach(key => {
      let isResult = true;
      if (_.isObject(query[key])) {
        isResult = Object.keys(query[key])
          .some(innerKey => !_.isEmpty(query[key][innerKey]));
      }

      if (query[key] && isResult) {
        cleanQuery = {
          ...cleanQuery,
          [key]: query[key],
        };
      }
    });
    target.search = qs.stringify(Object.assign(target.query, cleanQuery));
  }
  target = url.format(target);

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const apiKey = store.getters['Auth/token'];
  if (apiKey) {
    headers.set('Authorization', `Bearer ${apiKey}`);
  }

  debug('%s %s %squery: %o, body: %o', method, path, apiKey ? '(authed) ' : '', query, body);

  return fetch(target, {
    method,
    headers,
    body: (method === GET || method === HEAD) ? undefined : JSON.stringify(body),
  })
    .then(res => res.json()
      .then(response => {
        if (res.status !== 200) {
          if (res.status === 401) {
            authEventBus.$emit('logout:force');
          }
          throw response;
        } else {
          return response;
        }
      }));
}

/* GLOBAL REQUESTS */
export function patch(route, object = null, query = null) {
  return rawRequest(PATCH, route, query, object);
}

export function post(route, object = null, query = null) {
  return rawRequest(POST, route, query, object);
}

export function get(route, object = null, query = null) {
  return rawRequest(GET, route, query, object);
}

export function remove(route, object = null, query = null) {
  return rawRequest(DELETE, route, query, object);
}

export default { post, patch, get, remove };
