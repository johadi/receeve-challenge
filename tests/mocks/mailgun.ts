import {APIGatewayProxyEvent} from "aws-lambda";

export const mailgunEventMock = {
    signature: {
        timestamp: "1622932423",
        token: "smapletoken",
        signature: "samplesignature"
    },
    "event-data": {
        tags: [
            "my_tag_1",
            "my_tag_2"
        ],
        timestamp: 1521472262.908181,
        storage: {
            "url": "sample_storage_url",
            "key": "message_key"
        },
        envelope: {
            "transport": "smtp",
            "sender": "jimoh.hadi@test.com",
            "sending-ip": "100.50.150.250",
            "targets": "receeve@example.com"
        },
        "recipient-domain": "receeve.com",
        event: "delivered",
        campaigns: [],
        "user-variables": {
            "my_var_1": "Mailgun Variable #1",
            "my-var-2": "awesome"
        },
        flags: {
            "is-routed": false,
            "is-authenticated": true,
            "is-system-test": false,
            "is-test-mode": false
        },
        "log-level": "info",
        message: {
            headers: {
                to: "Someone <receeve@example.com>",
                "message-id": "some_message_id_from_mailgun",
                from: "Jimoh <jimohhadi@test.com>",
                subject: "Test delivered webhook"
            },
            attachments: [],
            size: 111
        },
        recipient: "receeve@example.com",
        id: "testid",
        "delivery-status": {
            tls: true,
            "mx-host": "smtp-in.example.com",
            "attempt-no": 1,
            description: "",
            "session-seconds": 0.4331989288330078,
            utf8: true,
            code: 250,
            message: "OK",
            "certificate-verified": true
        }
    }
};

export const mailgunLambdaProxyEventMock: APIGatewayProxyEvent = {
    resource: "/mailgun-event",
    path: "/mailgun-event",
    httpMethod: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    multiValueHeaders: {
        "Accept": [
            "*/*"
        ],
    },
    queryStringParameters: {},
    multiValueQueryStringParameters: {},
    requestContext: null,
    isBase64Encoded: false,
    pathParameters: null,
    stageVariables: null,
    body: JSON.stringify(mailgunEventMock)
}
