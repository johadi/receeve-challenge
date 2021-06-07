import { APIGatewayProxyResult } from "aws-lambda";

/**
 * Util function that formats lamda response
 *
 * @param {Number} statusCode - response status code
 * @param {*} body  - response body
 * @return {Object} - formatted response
 */
export const handleResponse = (statusCode: number, body: any): APIGatewayProxyResult  => ({
    statusCode,
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    }
})
