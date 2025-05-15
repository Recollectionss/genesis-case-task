export const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';

export const WEATHER_API_PATHS = {
  CURRENT: '/current',
};

export const WEATHER_API_TYPE_RESPONSE = {
  JSON: '.json',
};

export const WEATHER_API_PARAMS = {
  lang: 'en',
};

export const REQUIRED_API_PARAMS = {
  lang: '',
  q: '',
  key: '',
};

export type RequiredApiParamKey = keyof typeof REQUIRED_API_PARAMS;
