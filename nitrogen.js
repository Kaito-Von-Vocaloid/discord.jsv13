const { Client } = require('discord.js');
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const { writeFileSync, readFileSync } = require('fs');

function generate(){
	let code = '';
  let dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let final = '';
  for(var i = 0; i < 16; i++){
		code = code + dict.charAt(Math.floor(Math.random() * dict.length));
		final = 'https://discord.gift/' + code;
  }
	return(final);
}

client.on('ready', () => {
	console.log('Bot açıldı');
	client.user.setActivity("Nitro <=>", {type: "PLAYING"});
});

client.on('messageCreate', message => {
	if(message.content.startsWith('.kod')){
		const st = message.content.substring(5);
		if(!isNaN(st)){
			if(st > 0){
				if(message.author.id === '764073266087460904'){
					for(var a = 0; a < st; a++){
						let txt;
				    if(Number(readFileSync('code.txt')) == 0){
							txt = writeFileSync('code.txt', generate(), 'utf-8');
				    } else {
					    txt = writeFileSync('code.txt', (readFileSync('code.txt') + `\n${generate()}`), 'utf-8');
				    }
			    }
			    message.channel.send({ content: 'İşte kodlarınız!', files: [{ attachment: 'code.txt' } ]}).then(() => {
						writeFileSync('code.txt', '', 'utf-8');
					});
				} else {
					message.channel.send({ content: `Bu komutu sadece ***${client.users.cache.get('764073266087460904').tag}***  kullanabilir`});
				}
			} else {
				message.channel.send({ content: 'En az 1 kod üretebilirsiniz' });
			}
		} else {
			message.channel.send({ content: 'Lütfen bir sayı girin!' });
		}
	}
});

client.login(process.env['TOKEN']);
