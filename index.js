var Discord = require('discord.js');
var Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]});
const prefix = "!";
Client.on("ready", () => {
    console.log('Bot correct')
});
Client.on('messageCreate', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'player'){
        if (!args.length) {
            return message.channel.send('Veuillez sélectionner un pseudonyme')
        }

        var config = {
            method: 'get',
            url: 'https://api.rinaorc.com/player/'+ args,
            headers: {
                'Content-type': 'application/json',
                'API-Key': 'cf194b67-c4f7-4403-bc9a-47bd22642d65'
            }
        };
        const axios = require('axios')
        axios(config)
            .then(function (response) {
                var date = new Date(response.data.player.firstLogin)
                var boost = new Date(response.data.player.hasBoostUntil)
                var aura = Client.emojis.cache.get(975732727737372693)? Client.emojis.cache.get(975732727737372693).toString() : Client.emojis.cache.find(emo => emo.name == "aura_rinaorc").toString()
                const embed = new Discord.MessageEmbed()
                    .setColor("#8B0000")
                    .setTitle(response.data.player.name)
                    .setDescription("")
                    .addField("Informations:",
                         aura +"**Aura**: "+response.data.player.aura +
                        "\n :military_medal:  **Grade**:" +response.data.player.rank.name +
                        "\n :clock: **Heure Totales**:" + Math.floor(response.data.player.totalPlayedTime/3600000, 1) + "h" +
                        "\n **Heure du mois**:" + Math.floor(response.data.player.monthlyPlayedTime/3600000) + "h" +
                        "\n **Boost:**" + boost.toLocaleDateString("fr")+
                        "\n **Première connexion**:" + date.toLocaleDateString("fr")
                    )
                    .setThumbnail("https://visage.surgeplay.com/full/256/"+response.data.player.uuid)
                    .setImage("https://visage.surgeplay.com/face/40/"+response.data.player.uuid)
                message.channel.send({ embeds: [embed]})
            })
            .catch(function () {
                message.channel.send("Pseudonyme introuvable")
            });

    }
    if (command === 'staff'){
        var axios = require('axios');

        var config_staff = {
            method: 'get',
            url: 'https://api.rinaorc.com/staff',
            headers: {
                'Content-type': 'application/json',
                'API-Key': 'cf194b67-c4f7-4403-bc9a-47bd22642d65'
            }
        };

        axios(config_staff)
            .then(function (response) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#8B0000")
                    .setDescription("")
                    .addField("Informations:",
                        "\n **"+ response.data.ranks[0].name +"**:" +  response.data.ranks[0].players[0].name
                    )
                message.channel.send({ embeds: [embed]})
            })

    }
})
Client.login(process.env.TOKEN);
