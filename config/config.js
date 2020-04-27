const AWS = require('aws-sdk');
require('dotenv/config');

const credentials = new AWS.Credentials(process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY_ID);

const awsConfigParams = {
    credentials,
    region: 'us-east-1',
    apiVersions: {
      elasticbeanstalk: '2010-12-01'
    }
}

   const AWS_CONFIG = new AWS.Config(awsConfigParams);


module.exports = AWS_CONFIG;