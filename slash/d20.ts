import { testing } from "..";
import { d20 } from "../clients";
import { ignore_channels } from "../common/variables";
import { bankick, generatecard, prestige } from "../d20/function";
import { reply } from "./common";

d20.on('ready', async () => {
    console.log("D20 is processing slash commands");
})
d20.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    if (ignore_channels.includes(interaction.channelId)) return;
    if (testing && interaction.channelId != '892800588469911663') return;
    else if (!testing && interaction.channelId == '892800588469911663') return;

    switch (interaction.commandName) {
        case "ban":
        case "kick":
            bankick(interaction, interaction.commandName);
            break;
        case "prestige":
            prestige(interaction);
            break;
        case "card":
            interaction.deferReply();
            try {
                let card = await generatecard(interaction);
                reply(interaction, { files: [card] });
            } catch (er) {
                console.error(er);
                reply(interaction, 'Something went wrong...');
            }
            break;
    }
});


// switch (command) {
//     case "warn":
//         warning(args["player"], interaction, args["reason"]);
//         break;
//     case "unwarn":
//         unwarn(args["player"], interaction, args["position"]);
//         break;
//     case 'warnings':
//         let targetId = args["player"] ? args["player"] : interaction.member.user.id;
//         getWarnings(targetId, interaction);
//         break;
//     case 'mute':
//         mute(args["player"], interaction, args["time"], args["timedef"]);
//         break;
// }

// function mute(target, interaction, time, timedef) {
//     if (interaction.guild_id != "562429293364248587") return console.log("Mute command isued at another guild");
//     D20.guilds.fetch(interaction.guild_id).then(guild => {
//         guild.members.fetch(interaction.member.user.id).then(author => {
//             if (!author.permissions.has("KICK_MEMBERS")) return reply(D20, interaction, `You have no permission to mute`, true);
//             guild.members.fetch(target).then(member => {
//                 if (member.permissions.has("KICK_MEMBERS")) return reply(D20, interaction, `You have no permission to mute this user`, true);
//                 var totalMiliseconds = 0;
//                 if (timedef == 'minutes') totalMiliseconds = time * 60000;
//                 else if (timedef == 'hours') totalMiliseconds = time * 360000;
//                 else if (timedef == 'days') totalMiliseconds = time * 86400000;
//                 else if (timedef == 'weeks') totalMiliseconds = time * 604800000;
//                 else return console.error('What?');
//                 var now = new Date(Date()).valueOf();
//                 var newTime = now + totalMiliseconds;
//                 member.roles.add('806648884754382889').then(() => {
//                     database.child('muted').child(member.id).set(newTime);
//                     reply(D20, interaction, `Muted ${member.displayName} for ${time} ${timedef}`, false);
//                 }).catch(sendError);
//             }).catch(sendError);
//         }).catch(sendError);
//     }).catch(sendError);
// }

// function sendError(err) {
//     console.error(err);
//     reply(D20, interaction, `Error: ${err}`, true);
// }

// function warning(userId, interaction, reason) {
//     D20.guilds.fetch(interaction.guild_id).then(guild => {
//         guild.members.fetch(interaction.member.user.id).then(author => {
//             if (!author.permissions.has("KICK_MEMBERS")) return reply(D20, interaction, `You have no permission to warn`, true);
//             guild.members.fetch(userId).then(target => {
//                 database.child('warnings').child(guild.id).child(target.id).once('value').then(w => {
//                     var warnings = w.val();
//                     if (!warnings) warnings = [];
//                     warnings[warnings.length] = reason;
//                     reply(D20, interaction, `${target.displayName} has ${warnings.length} warning(s)`, false);
//                     database.child('warnings').child(guild.id).child(target.id).set(warnings);
//                 }).catch(sendError);
//             }).catch(sendError);
//         }).catch(sendError);
//     }).catch(sendError);
// }

// function unwarn(userId, interaction, position) {
//     D20.guilds.fetch(interaction.guild_id).then(guild => {
//         guild.members.fetch(interaction.member.user.id).then(author => {
//             if (!author.permissions.has("KICK_MEMBERS")) return reply(D20, interaction, `You have no permission to warn`, true);
//             guild.members.fetch(userId).then(target => {
//                 database.child('warnings').child(guild.id).child(target.id).once('value').then(w => {
//                     var warnings = w.val();
//                     if (!warnings || warnings.length == 0) return reply(D20, interaction, "This user already has no warnings", true);
//                     if (!position || position <= 0 || position > warnings.length) warnings = [];
//                     else warnings.splice((position - 1), 1);
//                     reply(D20, interaction, `${target.displayName} now has ${warnings.length} warning(s)`, false);
//                     database.child('warnings').child(guild.id).child(target.id).set(warnings);
//                 }).catch(sendError);
//             }).catch(sendError);
//         }).catch(sendError);
//     }).catch(sendError);
// }

// function getWarnings(userId, interaction) {
//     D20.guilds.fetch(interaction.guild_id).then(guild => {
//         guild.members.fetch(interaction.member.user.id).then(author => {
//             guild.members.fetch(userId).then(target => {
//                 database.child('warnings').child(guild.id).child(target.id).once('value').then(w => {
//                     let warnings = w.val();
//                     if (!warnings) warnings = [];
//                     let warning_text = '';
//                     let i = 0;
//                     warnings.forEach(warn => {
//                         i++;
//                         warning_text += `${i}: ${warn}\n`;
//                     })
//                     reply(D20, interaction, `${target} has ${i} warnings\n\n${warning_text}`, false);
//                 }).catch(sendError);
//             }).catch(sendError);
//         }).catch(sendError);
//     }).catch(sendError);
// }