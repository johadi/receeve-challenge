import { SNSClient, SNSClientConfig, PublishCommand, PublishCommandOutput, PublishCommandInput } from "@aws-sdk/client-sns";

import config from '../config';

/**
 * Util function that handles the publish of message to AWS SNS
 *
 * @param {String} message - message to be sent to SNS
 * @param {String} subject - subject of the message
 * @return {Object} - published message result from SNS
 */
export const publishToSNS = async (message: string, subject = 'Email event from Mailgun'): Promise<PublishCommandOutput> => {
    const snsConfig: SNSClientConfig = {};

    const params: PublishCommandInput = {
        Message: message,
        Subject: subject,
        TopicArn: config.snsTopicArn
    };

    if(config.snsRegion) {
        snsConfig.region = config.snsRegion;
    }

    const client = new SNSClient(snsConfig);
    const command = new PublishCommand(params);
    const result = await client.send(command);

    return result;
}
