
const AWS_CONFIG = require('./config');
const EBS = require('aws-sdk/clients/elasticbeanstalk');
const createVerifySearchList = require('./helper');

const elasticbeanstalk = new EBS(AWS_CONFIG);


const environmentNames = createVerifySearchList('hub');

var params = {
    EnvironmentNames: environmentNames
   };

elasticbeanstalk.describeEnvironments(params, (err, data) => {
    const environments = data.Environments;

    console.log("Lista de verifys no ar:")
    for(let env of environments) {
        console.log(env.Description);
    }
})
