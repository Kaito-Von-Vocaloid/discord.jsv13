const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"]});
const { writeFileSync, readFileSync } = require('fs');

function generate(l, c){
    var fp = '';
    if (c.indexOf('a') > -1) fp += 'abcdefghijklmnopqrstuvwxyz';
    if (c.indexOf('A') > -1) fp += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (c.indexOf('0') > -1) fp += '0123456789';
    var end = '';
		var final = '';
    for (var i = l; i > 0; --i) {
			end += fp[Math.floor(Math.random() * fp.length)];
			final = 'https://discord.com/template/' + end;
    }
    return(final);
}

client.on('messageCreate', message => {
	if(message.content.startsWith('.şablon')){
		const st = message.content.substring(8);
		if(!isNaN(st)){
			if(st > 0){
				if(message.author.id === '764073266087460904'){
					for(var a = 0; a < st; a++){
						let txt;
				    if(Number(readFileSync('code.txt')) == 0){
							txt = writeFileSync('code.txt', generate(12,'0aA'), 'utf-8');
				    } else {
					    txt = writeFileSync('code.txt', (readFileSync('code.txt') + `\n${generate(12,'0aA')}`), 'utf-8');
				    }
			    }
			    message.channel.send({ content: 'İşte şablonlarınız!', files: [{ attachment: 'code.txt' } ]}).then(() => {
						writeFileSync('code.txt', '', 'utf-8');
					});
				} else {
					message.channel.send({ content: `Bu komutu sadece ***${client.users.cache.get('764073266087460904').tag}***  kullanabilir`});
				}
			} else {
				message.channel.send({ content: 'En az 1 şablon üretebilirsiniz' });
			}
		} else {
			message.channel.send({ content: 'Lütfen bir sayı girin!' });
		}
	}
});

client.on('ready', () => {
	console.log('!');
});

client.login(process.env['TOKEN']);
