enum TYPE_MAIL {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
}

export interface ISendMail {
  to: string;
  city: string;
  token: string;
  type: TYPE_MAIL;
}
