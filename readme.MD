# Receeve Code Challenge

## About the code challenge
Produce a code for a Lambda in AWS that receives Mailgun events via API Gateway.
The Lambda should store the raw webhook and publish a transformed version into SNS.

## Setting up the project
Navigate to the project directory
```
cd receeve-challenge
```

Install the project dependencies
```
npm install
```

### Building the project for AWS Lambda deployment
After creating your Lambda. Do the followings:
* Grant your Lambda write access to your S3
* Grant your Lambda publish access into SNS
* Open the `Envionmental Variables` section in your Lambda configuration tab and add all the
environmental variables as specified in the `env.sample` file found in this project's root directory.
  You can otherwise copy it below:
  ```
  S3_BUCKET=<your bucket name>
  SNS_TOPIC_ARN=<your SNS topic arn>
  MAILGUN_SIGNING_KEY=<your Mailgun signing key>
  S3_REGION=<S3 region if S3 bucket is in different region to the lambda> #You don't need to set this if your lambda is in the same region as the S3 bucket>
  SNS_REGION=<SNS region if SNS topic is in different region to the lambda> #You don't need to set this if your lambda is in the same region as the SNS topic>
  ```
* Within the project directory, run the following command to build the project for your Lambda:
  ```
  npm run build
  ```
  This command should create a dist folder with all the dependencies required to run the project in AWS Lambda.
* Open the `dist` folder generated and zip all the content.
* Go to your AWS Lambda console and upload the ZIP file.

With the above setup successful, your Lambda is ready to receive event from Mailgun via API Gateway and process it accordingly.

## Running tests

Jest is installed as the test runner.

All the test and mock files are located within the `tests` folder in the project's root folder.

Run the following command  for the test:
```bash
npm run test
```

## Author
Jimoh Hadi




