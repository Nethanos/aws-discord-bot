const express = require('express');
const Discord = require('discord.js');
const checkUsedEnvironments = require('./aws/aws-server');
const applicationNames = ['']; //require('./applications.json').applicationNames;
const handleEBSOperation = require('./managers/ebs-manager/ebs-operation-manager');

const client = new Discord.Client();
const app = express();

require('dotenv/config');

function isThisProjectExists(projectName) {
    return applicationNames.some((project) => project === projectName);
}

async function searchProjectVerify(projectName) {
    return await checkUsedEnvironments(projectName);
}

client.on('message', msg => {
    let users = msg.mentions.users;
    
    if (users.find((user) => user == client.user)) {
        const [mention, targetService, ...parameters] = msg.content.split(' ');

        if (targetService === 'ebs') {
            //const [serverType, project] = [...parameters];
            handleEBSOperation(msg, ...parameters);

            //if (serverType === 'verify') {
               // manageAnswers(msg, project);
            //}
        }

    }
});

function manageAnswers(msg, projectName) {
    msg.reply("Ok, vou procurar...");

    if (projectName && isThisProjectExists(projectName)) {
        searchProjectVerify(projectName).then(response => {
            if(response.length){
                projectName = projectName.toLocaleUpperCase();
                msg.reply(`Os verifys do projeto ${projectName} em uso são: ${response}`);
            }else{
                msg.reply(`Nenhum verify do ${projectName} está no ar! Pode usar!`)
            }

        })
    } else {
        msg.reply("Este projeto não existe minha amigo");
    }

}

client.login(process.env.DISCORD_TOKEN);


app.listen(process.env.PORT, () => {
    console.log(`APPLICATION STARTED AT ${process.env.PORT}`)
})


app.get("/", (req, res) => {
    res.send("Olá, sou Elastiquinho!")
})


