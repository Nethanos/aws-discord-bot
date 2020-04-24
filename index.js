const checkUsedEnvironments = require('./aws-server');
require('dotenv/config');
const Discord = require('discord.js');
const client = new Discord.Client();

async function searchProjectVerify(projectName) {
    const resposta = await checkUsedEnvironments(projectName);

    return resposta;
}

client.on('message', msg => {
    if(msg.content.includes('verify projeto=hub')){
       const projectName = msg.content.split('=')[1];
       searchProjectVerify(projectName).then(response => {
           msg.reply(`Os verifys do projeto ${projectName} em uso são: ${response}`);
       })

    }
  });
  
  client.login(process.env.DISCORD_TOKEN);