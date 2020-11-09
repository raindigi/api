import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { Configuration } from './configuration.interface';
dotenvExpand(config());

export const int = (val: string | undefined, num: number): number =>
  val ? (isNaN(parseInt(val)) ? num : parseInt(val)) : num;

const configuration: Configuration = {
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  meta: {
    totpServiceName: process.env.TOPT_SERVICE_NAME ?? 'Staart',
    domainVerificationFile:
      process.env.DOMAIN_VERIFICATION_FILE ?? 'staart-verify.txt',
  },
  caching: {
    geolocationLruSize: int(process.env.GEOLOCATION_LRU_SIZE, 100),
    apiKeyLruSize: int(process.env.API_KEY_LRU_SIZE, 100),
  },
  security: {
    saltRounds: int(process.env.SALT_ROUNDS, 10),
    jwtSecret: process.env.JWT_SECRET ?? 'staart',
    totpWindowPast: int(process.env.TOTP_WINDOW_PAST, 1),
    totpWindowFuture: int(process.env.TOTP_WINDOW_PAST, 0),
    mfaTokenExpiry: process.env.MFA_TOKEN_EXPIRY ?? '10m',
    mergeUsersTokenExpiry: process.env.MERGE_USERS_TOKEN_EXPIRY ?? '30m',
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY ?? '1h',
    passwordPwnedCheck: !!process.env.PASSWORD_PWNED_CHECK,
    unusedRefreshTokenExpiryDays: int(process.env.DELETE_EXPIRED_SESSIONS, 30),
    inactiveUserDeleteDays: int(process.env.INACTIVE_USER_DELETE_DAYS, 30),
  },
  email: {
    name: process.env.EMAIL_NAME ?? 'Staart',
    from: process.env.EMAIL_FROM ?? '',
    ses: !!process.env.EMAIL_SES,
    transport: {
      host: process.env.EMAIL_HOST ?? '',
      port: int(process.env.EMAIL_PORT, 587),
      secure: !!process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_USER ?? process.env.EMAIL_FROM ?? '',
        pass: process.env.EMAIL_PASSWORD ?? '',
      },
    },
  },
  sms: {
    smsServiceName: process.env.SMS_SERVICE_NAME ?? '',
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? '',
  },
  payments: {
    stripeApiKey: process.env.STRIPE_API_KEY ?? '',
    stripeProductId: process.env.STRIPE_PRODUCT_ID ?? '',
    stripeEndpointSecret: process.env.STRIPE_ENDPOINT_SECRET ?? '',
    paymentMethodTypes: ['card'],
  },
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
