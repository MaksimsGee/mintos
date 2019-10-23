export const API_LARAVEL = 'laravel';
export const API_SYMFONY = 'symfony';
export const API_YII2 = 'yii2';

export const apiSlug = () => {
  if (process.env.API_URL.includes(':9000')) {
    return API_LARAVEL;
  }
  if (process.env.API_URL.includes(':9001')) {
    return API_SYMFONY;
  }
  return API_YII2;
};

export const normalizedApiUrl = () => (process.env.API_URL.endsWith('/')
  ? process.env.API_URL : `${process.env.API_URL}/`);
