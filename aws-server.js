
const AWS_CONFIG = require('./config');
const EBS = require('aws-sdk/clients/elasticbeanstalk');
const createVerifySearchList = require('./helper');



const ebs = new EBS(AWS_CONFIG);

async function checkUsedEnvironments(projectName) {

    usedEnvironments = [];

    const environmentNames = createVerifySearchList(projectName);

    var params = {
        EnvironmentNames: environmentNames
    };

    const searchEnvironments = ebs.describeEnvironments(params);

    const data = await searchEnvironments.promise();

    const environments = data.Environments;

    for (let env of environments) {
        usedEnvironments.push(env.Description);
    }
    console.log("Verifys:", usedEnvironments)

    return usedEnvironments;

}


module.exports = checkUsedEnvironments;

