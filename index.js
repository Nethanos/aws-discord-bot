const express = require('express');
const Discord = require('discord.js');
const handleEBSOperation = require('./managers/ebs-manager/ebs-operation-manager');

const client = new Discord.Client();
const app = express();

require('dotenv/config');

client.on('message', msg => {
    let users = msg.mentions.users;
    
    if (users.find((user) => user == client.user)) {
        const [mention, targetService, ...parameters] = msg.content.split(' ');

        if (targetService === 'ebs') {
            handleEBSOperation(msg, ...parameters);
        }

    }
});

client.login(process.env.DISCORD_TOKEN);

app.listen(process.env.PORT, () => {
    console.log(`APPLICATION STARTED AT ${process.env.PORT}`)
});

app.get("/", (req, res) => {
    res.send("Olá, sou Elastiquinho!")
});
