const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]});
const { writeFileSync, readFileSync } = require('fs');

client.on('messageCreate', message => {
	if(message.content === 'sesli-oluştur'){
		if(message.guild.channels.cache.find(c => c.name.endsWith(` - ${message.author.id}`))) return message.channel.send({ content: 'Zaten açık bir kanalınız bulunmaktadır!' });
		if(message.guild.members.cache.get(message.author.id).nickname == null){
			const userName = message.author.tag.substring(0, message.author.tag.length - 5);
			if(userName > 11){
				const newName = `${userName.substring(0, 11)} - ${message.author.id}`;
				message.guild.channels.create(newName, {
				  type: 'GUILD_VOICE',
				  permissionOverwrites: [
					  {
						  id: message.guild.roles.everyone,
						  allow: ["VIEW_CHANNEL"],
						  deny: ["CONNECT"]
					  },
					  {
						  id: message.author.id,
						  allow: ["CONNECT", "SPEAK", "STREAM", "USE_VAD"],
						  deny: ["MOVE_MEMBERS"]
					  }
				  ]
			  }).catch(e => {
				  message.channel.send({ content: 'Bir sorun oluştu!' });
				  writeFileSync('succes.txt', 'err', 'utf-8');
				  console.log(e);
			  }).then(() => {
				  if(readFileSync('succes.txt').toString() === 'err'){
					  writeFileSync('succes.txt', '', 'utf-8');
				  } else {
					  message.channel.send({ content: 'Sesli kanalınız başarıyla oluşturuldu!' });
				  }
			  });
			} else {
				const newName = `${userName} - ${message.author.id}`;
				message.guild.channels.create(newName, {
				  type: 'GUILD_VOICE',
				  permissionOverwrites: [
					  {
						  id: message.guild.roles.everyone,
						  allow: ["VIEW_CHANNEL"],
						  deny: ["CONNECT"]
					  },
					  {
						  id: message.author.id,
						  allow: ["CONNECT", "SPEAK", "STREAM", "USE_VAD"],
						  deny: ["MOVE_MEMBERS"]
					  }
				  ]
			  }).catch(e => {
				  message.channel.send({ content: 'Bir sorun oluştu!' });
				  writeFileSync('succes.txt', 'err', 'utf-8');
				  console.log(e);
			  }).then(() => {
				  if(readFileSync('succes.txt').toString() === 'err'){
					  writeFileSync('succes.txt', '', 'utf-8');
				  } else {
					  message.channel.send({ content: 'Sesli kanalınız başarıyla oluşturuldu!' });
				  }
			  });
			}
		} else {
			if(message.guild.members.cache.get(message.author.id).nickname.length > 11){
				const newName = `${message.guild.members.cache.get(message.author.id).nickname.substring(0, 11)} - ${message.author.id}`;
			  message.guild.channels.create(newName, {
					type: 'GUILD_VOICE',
				  permissionOverwrites: [
						{
							id: message.guild.roles.everyone,
						  allow: ["VIEW_CHANNEL"],
						  deny: ["CONNECT"]
					  },
					  {
						  id: message.author.id,
						  allow: ["CONNECT", "SPEAK", "STREAM", "USE_VAD"],
						  deny: ["MOVE_MEMBERS"]
					  }
				  ]
			  }).catch(e => {
					message.channel.send({ content: 'Bir sorun oluştu!' });
				  writeFileSync('succes.txt', 'err', 'utf-8');
					console.log(e);
			  }).then(() => {
					if(readFileSync('succes.txt').toString() === 'err'){
						writeFileSync('succes.txt', '', 'utf-8');
				  } else {
					  message.channel.send({ content: 'Sesli kanalınız başarıyla oluşturuldu!' });
				  }
			  });
		  } else {
				const newName = `${message.guild.members.cache.get(message.author.id).nickname} - ${message.author.id}`
			  message.guild.channels.create(newName, {
					type: 'GUILD_VOICE',
				  permissionOverwrites: [
					  {
						  id: message.guild.roles.everyone,
						  allow: ["VIEW_CHANNEL"],
						  deny: ["CONNECT"]
					  },
					  {
						  id: message.author.id,
						  allow: ["CONNECT", "SPEAK", "STREAM", "USE_VAD"],
						  deny: ["MOVE_MEMBERS"]
					  }
				  ]
			  }).catch(e => {
				  message.channel.send({ content: 'Bir sorun oluştu!' });
				  writeFileSync('succes.txt', 'err', 'utf-8');
					console.log(e);
			  }).then(() => {
				  if(readFileSync('succes.txt').toString() === 'err'){
					  writeFileSync('succes.txt', '', 'utf-8');
				  } else {
					  message.channel.send({ content: 'Sesli kanalınız başarıyla oluşturuldu!' });
				  }
			  });
		  }
		}
	} else {
		if(message.content === 'sesli-kapat'){
			const dChan = message.guild.channels.cache.find(c => c.name.endsWith(` - ${message.author.id}`));
			if(dChan){
				dChan.delete().catch(e => {
					message.channel.send({ content: 'Bir sorun oluştu!' });
				  writeFileSync('succes.txt', 'err', 'utf-8');
					console.log(e);
				}).then(() => {
					if(readFileSync('succes.txt').toString() === 'err'){
					  writeFileSync('succes.txt', '', 'utf-8');
				  } else {
					  message.channel.send({ content: 'Sesli kanalınız başarıyla kapatıldı!' });
				  }
				});
			} else {
				message.channel.send({ content: 'Zaten açık bir kanalınız bulunmamaktadır!' });
			}
		}
	}
});

client.on('ready', () => {
	console.log('!');
});

client.login(process.env['TOKEN']);
