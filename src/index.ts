import moment from "moment";
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';

import { verifyMailgunWebhook, saveJSONToS3, publishToSNS, handleResponse } from './utils';
import { MailgunWebhookType } from "./interfaces/mailgun";
import config from './config';

/**
 * Lambda handler that stores Mailgun event in S3 bucket and publishes transformed version to SNS
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
        return handleResponse(500, 'Invalid request. Request payload must have a body');
    }

    try {
        const rawData = event.body;
        const parsedData: MailgunWebhookType = JSON.parse(event.body);
        const mailgunEventData = parsedData["event-data"];

        // Verify Webhook is from Mailgun
        const verifyWebhookData = {
            signingKey: config.mailgunSigningKey,
            timestamp: parsedData.signature.timestamp,
            token: parsedData.signature.token,
            signature: parsedData.signature.signature
        };
        const webhookVerified = verifyMailgunWebhook(verifyWebhookData);

        if(!webhookVerified) {
            return handleResponse(500, 'Invalid Webhook. This webhook is not from this user');
        }

        // Store raw data in S3
        // Constructing a descriptive name for our stored file using event ID and datetime obtained from timestamp
        const filename = `${moment.unix(mailgunEventData.timestamp)
            .format('DD-MM-YYYY:hh:mm:ss')}-${mailgunEventData.id.toLowerCase()}.json`;

        await saveJSONToS3(rawData, filename);

        // Publish a transformed Mailgun data into SNS
        const snsMessage = {
            provider: config.messageProvider,
            timestamp: mailgunEventData.timestamp,
            type: mailgunEventData.event.toLowerCase()
        };

        await publishToSNS(JSON.stringify(snsMessage));

        return handleResponse(200, 'Webhook data stored in S3 bucket successfully and a message has been published into SNS');
    } catch(e) {
        return handleResponse(500, e);
    }
};


