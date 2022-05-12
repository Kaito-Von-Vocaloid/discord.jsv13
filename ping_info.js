const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const embedColor = '#56F5B3';

function ping(msg){
	return(`Gecikme: ${Date.now() - msg.createdTimestamp}\nDiscord geçikmesi: ${Math.round(client.ws.ping)}`);
}

client.on('messageCreate', message => {
	if(message.mentions.users.first() == client.user){
		const iEmbed = new Discord.MessageEmbed()
		.setColor(embedColor)
		.setTitle('Bot hakkında bazı bilgiler')
		.setDescription(`Bot prefix: ${prefix}\nPing: \n${ping(message)}`)
		.setFooter('Etiket-Bilgi sistemi')
		.setTimestamp();
		message.channel.send({ embeds: [iEmbed] });
	}
});

client.on('ready', () => {
	console.log('!');
});

client.login(process.env['TOKEN']);
