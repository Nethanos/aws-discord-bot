const messageList = require('./command-list.json');

function getCommandMessageList(channel) {
channel.send(`Abaixo estão a lista de comandos que eu posso entender, use com sabedoria: `)
  channel.send(messageList.commandList)
}


module.exports = getCommandMessageList