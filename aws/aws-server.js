
const AWS_CONFIG = require('../config/config');
const EBS = require('aws-sdk/clients/elasticbeanstalk');
const {createVerifySearchList, formatAnswer} = require('../helpers/helpers');

const ebs = new EBS(AWS_CONFIG);

async function checkUsedEnvironments(projectName) {

    usedEnvironments = [];

    const EnvironmentNames = createVerifySearchList(projectName);

    const searchEnvironments = ebs.describeEnvironments({EnvironmentNames});

    const data = await searchEnvironments.promise();

    const environments = data.Environments;

    for (let env of environments) {
        usedEnvironments.push(env.Description);
    }

    return formatAnswer(usedEnvironments);

}


module.exports = checkUsedEnvironments;

