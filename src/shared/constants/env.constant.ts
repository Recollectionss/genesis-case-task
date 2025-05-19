export const NODE_ENV = {
  Development: 'development',
  Production: 'production',
  Testing: 'testing',
} as const;

export type ENV = (typeof NODE_ENV)[keyof typeof NODE_ENV];
