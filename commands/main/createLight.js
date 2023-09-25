const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ComponentType} = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('createlight')
		.setDescription('Создаёт светофор'),
	async execute(interaction) {
        const kassi = new ButtonBuilder()
        .setCustomId('kassi')
        .setLabel('Кассиопея')
        .setStyle(ButtonStyle.Danger);

        const eridan = new ButtonBuilder()
        .setCustomId('eridan')
        .setLabel('Эридан')
        .setStyle(ButtonStyle.Danger);

        const cepheus = new ButtonBuilder()
        .setCustomId('cepheus')
        .setLabel('Цефей')
        .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
	    .addComponents(kassi, eridan, cepheus);

        const response = await interaction.reply({
			content: `На каком вы сервере?`,
			components: [row],
		});
        

        const collectorFilter = function(i) {
            return i.user.id;
        }
        const collector = response.createMessageComponentCollector({
            componentType: ComponentType.Button
        })
        let kassiAdmins = [];
        let eridanAdmins = [];
        let cepheusAdmins = [];
        let replyKassi = ' ';
        let replyEridan = ' ';
        let replyCepheus = ' ';
        let used = false;
        let msgRef;
        const textChannel = await interaction.client.channels.fetch(interaction.channelId);
        collector.on('collect', async (interaction) => {
        
           userclick = interaction.user.id;
            // if the kassi button is clicked
            if (interaction.customId === 'kassi') {
                let deletedKassi = false;
                for (let a = 0; a < kassiAdmins.length; a++) {
                    if (kassiAdmins[a] === userclick) {
                        kassiAdmins.splice(a, 1);
                        deletedKassi = true;
                    }
                }
                if (deletedKassi == false) {
                    kassiAdmins.push(userclick);
                }
            } 
            // if the eridan button is clicked
            if (interaction.customId === 'eridan') {
                let deletedEridan = false;
                for (let a = 0; a < eridanAdmins.length; a++) {
                    if (eridanAdmins[a] === userclick) {
                        eridanAdmins.splice(a, 1);
                        deletedEridan = true;
                    }
                }
                if (deletedEridan == false) {
                    eridanAdmins[eridanAdmins.length] = userclick;
                }
                
            }
            // if the cepheus button is clicked
            if (interaction.customId === 'cepheus') {
                let deletedCepheus = false;
                for (let a = 0; a < cepheusAdmins.length; a++) {
                    if (cepheusAdmins[a] === userclick) {
                        cepheusAdmins.splice(a, 1);
                        deletedCepheus = true;
                    }
                }
                if (deletedCepheus == false) {
                    cepheusAdmins[cepheusAdmins.length] = userclick;
                }
                
            }



            // checking for kassi massive
            if (kassiAdmins[0]) {
                for (let a = 0; a < kassiAdmins.length; a++) {
                    replyKassi = replyKassi + `<@${kassiAdmins[a]}>` + ' ';
                }
            } else {
                replyKassi = "Нет"
            }

            // checking for eridan massive
            if (eridanAdmins[0]) {
                for (let a = 0; a < eridanAdmins.length; a++) {
                    replyEridan = replyEridan + `<@${eridanAdmins[a]}>` + ' ';   
                }
            } else {
                replyEridan = "Нет"
            }
            // checking for cepheus massive
            if (cepheusAdmins[0]) {
                for (let a = 0; a < cepheusAdmins.length; a++) {
                    replyCepheus = replyCepheus + `<@${cepheusAdmins[a]}>` + ' ';   
                }
            } else {
                replyCepheus = "Нет"
            }

            if (used == false) {
                msgRef = await interaction.reply(`**Кассиопея:** ${replyKassi} \n**Эридан:** ${replyEridan} \n**Цефей:** ${replyCepheus}`);
            }
            else {
                interaction.deferUpdate();
                // msgRef.edit(); - old way to change old message. makes webhook error in 15 minutes after start.
                msgRef.delete(); // deletes the previous message
                msgRef = await textChannel.send(`**Кассиопея:** ${replyKassi} \n**Эридан:** ${replyEridan} \n**Цефей:** ${replyCepheus}`); // we store the old message in our memory so we can delete it later
            }
            
            replyKassi = '';
            replyEridan = '';
            replyCepheus = '';
            used = true;


            
        })
        
    }
}