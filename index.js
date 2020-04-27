const checkUsedEnvironments = require('./aws/aws-server');
require('dotenv/config');
const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');

const app = express();

const applicationNames = require('./applications.json').applicationNames;




function isThisProjectExists(projectName) {
    return applicationNames.some((project) => project === projectName);
}

async function searchProjectVerify(projectName) {
    return await checkUsedEnvironments(projectName);
}

client.on('message', msg => {
    let users = msg.mentions.users;
    if (users.find((user) => user == client.user)) {
        if (msg.content.includes('verify ')) {
            const msgArray = msg.content.split(' ');

            msg.reply("Ok, vou procurar...");

            const projectName = msgArray.pop();

            manageAnswers(msg, projectName);
        }

    }

});


function manageAnswers(msg, projectName) {

    if (projectName && isThisProjectExists(projectName)) {

        searchProjectVerify(projectName).then(response => {
            if(response.length){
                projectName = projectName.toLocaleUpperCase();
                msg.reply(`Os verifys do projeto ${projectName} em uso são: ${response}`);
            }else{
                msg.reply(`Nenhum verify do ${projectName} está no ar! Pode usar!`)
            }

        })
    }
    else {
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


