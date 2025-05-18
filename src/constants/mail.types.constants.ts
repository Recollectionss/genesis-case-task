export enum TYPE_MAIL {
  SUBSCRIBE = 'subscribe',
  WEATHER_NOTIFICATION = 'weather_notification',
}

export interface ISendMail {
  to: string;
  city: string;
  token: string;
  type: TYPE_MAIL;
}
