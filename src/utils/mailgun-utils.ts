import crypto from 'crypto';

import { VerifyMailgunWebhookType } from "../interfaces/mailgun";

/**
 * Util function that verifies that the Mailgun webhook is from the user
 *
 * @param {String} signingKey - user's signing key
 * @param {String} timestamp - Mailgun signature timestamp
 * @param {String} token - Mailgun signature token
 * @param {String} signature - Mailgun signature
 * @return {Boolean} - result of the verified webhook
 */
export const verifyMailgunWebhook = ({ signingKey, timestamp, token, signature }: VerifyMailgunWebhookType): boolean => {
    const encodedToken = crypto
        .createHmac('sha256', signingKey)
        .update(timestamp.concat(token))
        .digest('hex')

    return encodedToken === signature;
}
