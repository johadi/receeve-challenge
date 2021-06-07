export default {
    s3Bucket: process.env.S3_BUCKET,
    s3Region: process.env.S3_REGION,
    snsTopicArn: process.env.SNS_TOPIC_ARN,
    snsRegion: process.env.SNS_REGION,
    messageProvider: 'Mailgun',
    mailgunSigningKey: process.env.MAILGUN_SIGNING_KEY
}
