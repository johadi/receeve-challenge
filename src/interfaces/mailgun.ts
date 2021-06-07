export interface VerifyMailgunWebhookType {
    signingKey: string;
    timestamp: string;
    token: string;
    signature: string;
}

export interface MailgunWebhookType {
    signature: WebhookSignature;
    "event-data": WebhookEventData;
}


interface WebhookSignature {
    timestamp: string;
    token: string;
    signature: string;
}

interface WebhookEventData {
    geolocation: WebhookEventGeolocation;
    tags: string[];
    ip: string;
    storage?: WebhookEventStorage;
    envelope?: WebhookEventEnvelope;
    "recipient-domain": string;
    event: string;
    campaigns: any[];
    "user-variables": {[key: string]: any};
    "log-level": string;
    timestamp: number;
    "client-info": WebhookEventClientInfo;
    "flags": {[key: string]: boolean};
    message: WebhookEventMessage;
    recipient: string;
    id: string;
    "delivery-status"?: WebhookEventDeliveryStatus;
}

interface WebhookEventStorage {
    url: string;
    key: string;
}

interface WebhookEventEnvelope {
    "transport": string;
    "sender": string;
    "sending-ip": string;
    "targets": string;
}

interface WebhookEventDeliveryStatus {
    "tls": boolean;
    "mx-host": string;
    "attempt-no": number;
    "description": string;
    "session-seconds": number;
    "utf8": boolean;
    "code": number;
    "message": string;
    "certificate-verified": boolean;
}

interface WebhookEventClientInfo {
    "client-os": string;
    "device-type": string;
    "client-name": string;
    "client-type": string;
    "user-agent": string;
}

interface WebhookEventGeolocation {
    country: string;
    region: string;
    city: string;
}

interface WebhookEventMessageHeader {
    to: string;
    "message-id": string;
    from: string;
    subject?: string;
}

interface WebhookEventMessage {
    headers: WebhookEventMessageHeader;
    attachments?: string[];
    size?: number;
}
