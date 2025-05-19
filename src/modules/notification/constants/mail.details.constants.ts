import { TYPE_MAIL } from '../../../shared/constants/mail.types.constants';

type MailInfo = {
  subject: string;
  text: string;
};

export const MAIL_DETAILS: Record<TYPE_MAIL, MailInfo> = {
  [TYPE_MAIL.SUBSCRIBE]: {
    subject: 'Subscribe notification for city: ',
    text: 'Token: ',
  },
  [TYPE_MAIL.WEATHER_NOTIFICATION]: {
    subject: 'Notification about selected cities',
    text: null,
  },
};
