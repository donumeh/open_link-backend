const dotenv = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk');

dotenv.config();
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

module.exports = new SibApiV3Sdk.TransactionalEmailsApi();