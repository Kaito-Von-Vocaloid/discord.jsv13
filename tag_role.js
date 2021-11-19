const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILD_PRESENCES", "GUILD_MEMBERS", "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
const myTag = '&+&';
const embedColor = '#56F5B3';

function tagLog(us, o, bus){
	const myGuild = client.guilds.cache.get('909828173221490758');
	const tagRole = myGuild.roles.cache.get('909897310039842837');
	const myChan = client.channels.cache.get('909828173221490761');
	if(o === 'true'){
		const logEmbed = new Discord.MessageEmbed()
	  .setColor(embedColor)
	  .setTitle('Birisi tagi aldı!')
	  .setDescription(`Kullanıcı id: ${us.id}\nKullanıcı etiket: ${client.users.cache.get(us.id).tag} \nKullanıcı adı: ${us.nickname}\nEski kullanıcı adı: ${bus}\nVerilen rol: ${tagRole}\nVerilen rol id: ${tagRole.id}`)
	  .setFooter('Log sistemi')
	  .setTimestamp();
		myChan.send({ embeds: [logEmbed] });
	} else {
		if(o === 'false'){
			const logEmbed = new Discord.MessageEmbed()
	    .setColor(embedColor)
	    .setTitle('Birisi tagi çıkardı!')
	    .setDescription(`Kullanıcı id: ${us.id}\nKullanıcı etiket: ${client.users.cache.get(us.id).tag} \nKullanıcı adı: ${us.nickname}\nEski kullanıcı adı: ${bus}\nAlınan rol: ${tagRole}\nAlınan rol id: ${tagRole.id}`)
			.setFooter('Log sistemi')
	    .setTimestamp();
			myChan.send({ embeds: [logEmbed] });
		}
	}
}

client.on('guildMemberUpdate', async(oldUser, newUser) => {
	if(oldUser.nickname != null && newUser.nickname != null && oldUser.nickname == newUser.nickname) return;
	const myGuild = client.guilds.cache.get('909828173221490758');
	const tagRole = myGuild.roles.cache.get('909897310039842837');
	if(oldUser.nickname == null && newUser.nickname == null) return;
	if(newUser.nickname == null){
		if(oldUser.nickname.startsWith(myTag)){
			myGuild.members.cache.get(newUser.id).roles.remove(tagRole).then(() => {
				tagLog(newUser, 'false', oldUser);
		  });
		}
	} else {
		if(newUser.nickname.startsWith(myTag)){
				if(myGuild.members.cache.get(newUser.id).roles.cache.has(tagRole)) return;
				myGuild.members.cache.get(newUser.id).roles.add(tagRole).then(() => {
					tagLog(newUser, 'true', oldUser.nickname);
		    });
	    } else {
				if(oldUser.nickname.startsWith(myTag)){
					myGuild.members.cache.get(newUser.id).roles.remove(tagRole).then(() => {
						tagLog(newUser, 'false', oldUser);
		      });
		    }
	    }
	}
});

client.on('ready', () => {
	console.log('!');
});

client.login(process.env['TOKEN']);
