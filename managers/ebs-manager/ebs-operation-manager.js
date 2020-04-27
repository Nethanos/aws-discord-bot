const applicationNames = require('./applications.json').applicationNames;
const checkUsedEnvironments = require('./ebs-server');
const { notifyStart, describeProjectsInVerify, notifyNoProjets, notifyNoVerifies } = require('./ebs-message-manager');

function handleOperation(msg, ...parameters) {
    const [serverType, projectName] = [...parameters];

    notifyStart(msg);

    if (serverType === 'verify') {
        if (projectName && checkIfProjectExists(projectName)) {
            searchProjectVerify(projectName).then(projectsInUse => {
                projectsInUse.length ?
                    describeProjectsInVerify(msg, projectName, projectsInUse) :
                    notifyNoVerifies(msg, projectName);
            });
        } else {
            notifyNoProjets(msg);
        }
    }
}

function checkIfProjectExists(projectName) {
    return applicationNames.some((project) => project === projectName);
}

async function searchProjectVerify(projectName) {
    return await checkUsedEnvironments(projectName);
}

module.exports = handleOperation;