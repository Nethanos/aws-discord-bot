function notifyStart(msg) {
    msg.reply("Ok, vou procurar...");
}

function describeProjectsInVerify(msg, projectName, projectsInUse) {
    msg.reply(`Os verifys do projeto ${projectName.toLocaleUpperCase()} em uso são: ${projectsInUse}`);
}

function notifyNoVerifies(msg, projectName) {
    msg.reply(`Nenhum verify do ${projectName} está no ar! Pode usar!`);
}

function notifyNoProjets(msg) {
    msg.reply("Este projeto não existe minha amigo");
}

module.exports = { notifyStart, describeProjectsInVerify, notifyNoProjets, notifyNoVerifies };
