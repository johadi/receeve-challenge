import {APIGatewayProxyResult} from "aws-lambda";

import {handler} from '../src';
import * as s3Utils from '../src/utils/s3-utils';
import * as snsUtils from '../src/utils/sns-utils';
import * as mailgunUtils from '../src/utils/mailgun-utils';
// @ts-ignore
import {mailgunLambdaProxyEventMock} from './mocks/mailgun';

describe('Test For Mailgun events handler', () => {
    const s3UtilsMock = jest.spyOn(s3Utils, 'saveJSONToS3');
    const snsUtilsMock = jest.spyOn(snsUtils, 'publishToSNS');
    const mailgunUtilsMock = jest.spyOn(mailgunUtils, 'verifyMailgunWebhook');

    it('should return a failure if lambda request payload has no body', async () => {
        const errorMessage = 'Invalid request. Request payload must have a body';

        s3UtilsMock.mockResolvedValue({$metadata: {requestId: 'S3RequestId'}});
        snsUtilsMock.mockResolvedValue({$metadata: {requestId: 'SNSRequestId'}});
        mailgunUtilsMock.mockReturnValue(true);

        const result = await handler({
                ...mailgunLambdaProxyEventMock,
                body: null // body set to null
            },
            null,
            null) as APIGatewayProxyResult;

        expect(result.statusCode).toBe(500);
        expect(result.body).toBe(errorMessage);
    })

    it('should return a failure if request payload is not from user\'s Mailgun', async () => {
        const errorMessage = 'Invalid Webhook. This webhook is not from this user';

        s3UtilsMock.mockResolvedValue({$metadata: {requestId: 's3requestId'}});
        snsUtilsMock.mockResolvedValue({$metadata: {requestId: 'snsrequestId'}});
        mailgunUtilsMock.mockReturnValue(false); // Mailgun verification failed

        const result = await handler(mailgunLambdaProxyEventMock, null, null) as APIGatewayProxyResult;
        expect(result.statusCode).toBe(500);
        expect(result.body).toBe(errorMessage);
    })

    it('should return a failure if storing data in S3 bucket return an error', async () => {
        const errorMessage = 'Something went wrong while storing data in S3 bucket';

        s3UtilsMock.mockRejectedValue(errorMessage); // Storing in S3 failed
        snsUtilsMock.mockResolvedValue({$metadata: {requestId: 'snsrequestId'}});
        mailgunUtilsMock.mockReturnValue(true);

        const result = await handler(mailgunLambdaProxyEventMock, null, null) as APIGatewayProxyResult;
        expect(result.statusCode).toBe(500);
        expect(result.body).toBe(errorMessage);
    });

    it('should return a failure if publishing message into SNS return an error', async () => {
        const errorMessage = 'Something went wrong while publishing message into SNS';

        s3UtilsMock.mockResolvedValue({$metadata: {requestId: 's3requestId'}});
        snsUtilsMock.mockRejectedValue(errorMessage); // Publishing event to SNS failed
        mailgunUtilsMock.mockReturnValue(true);

        const result = await handler(mailgunLambdaProxyEventMock, null, null) as APIGatewayProxyResult;
        expect(result.statusCode).toBe(500);
        expect(result.body).toBe(errorMessage);
    })

    it('should return success if the webhook data is successfully stored in S3 bucket and transformed version published into SNS', async () => {
        const successMessage = 'Webhook data stored in S3 bucket successfully and a message has been published into SNS';

        s3UtilsMock.mockResolvedValue({$metadata: {requestId: 's3requestId'}});
        snsUtilsMock.mockResolvedValue({$metadata: {requestId: 'snsrequestId'}});
        mailgunUtilsMock.mockReturnValue(true);

        const result = await handler(mailgunLambdaProxyEventMock, null, null) as APIGatewayProxyResult;
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe(successMessage);
    })
})
