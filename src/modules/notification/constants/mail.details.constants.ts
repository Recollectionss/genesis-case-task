import { TYPE_MAIL } from '../../../constants/mail.types.constants';

type MailInfo = {
  subject: string;
  text: string;
};

export const MAIL_DETAILS: Record<TYPE_MAIL, MailInfo> = {
  [TYPE_MAIL.SUBSCRIBE]: {
    subject: 'Subscribe notification for city: ',
    text: 'Token: ',
  },
  [TYPE_MAIL.UNSUBSCRIBE]: {
    subject: 'Unsubscribe notification for city: ',
    text: 'Token: ',
  },
};
