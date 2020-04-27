function createVerifySearchList(projectName){
     return [`verify01-${projectName}`, `verify02-${projectName}`, `verify03-${projectName}`, `verify04-${projectName}`, `verify05-${projectName}`]
}

function formatAnswer(list){
    let formattedAnswer = '';
    for(let element of list){
        formattedAnswer += ` ${element}`
    }
    return formattedAnswer;
}


module.exports = {createVerifySearchList, formatAnswer };