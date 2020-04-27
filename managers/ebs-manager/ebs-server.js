const AWS_CONFIG = require('../../config/config');
const EBS = require('aws-sdk/clients/elasticbeanstalk');
const {createVerifySearchList, formatAnswer} = require('../../helpers/helpers');

const ebs = new EBS(AWS_CONFIG);

async function checkUsedEnvironments(projectName) {

    const searchEnvironments = ebs.describeEnvironments({
        EnvironmentNames: createVerifySearchList(projectName)
    });

    const data = await searchEnvironments.promise();

    const usedEnvironments = data.Environments.map(env => env.Description);

    return formatAnswer(usedEnvironments);
}

module.exports = checkUsedEnvironments;
