const Discord = require("discord.js");
const Canvas = require("canvas")
const { centerText } = require("../../modules/util");
const db = require("quick.db");
var validator = require('validator');
const { weirdToNormalChars } = require('weird-to-normal-chars');
module.exports = async (client, member) => { 

Canvas.registerFont("assest/fonts/Geizer.otf", {
  family: "Geizer"
})
Canvas.registerFont("assest/fonts/Captain.otf", {
  family: "Captain"
});
Canvas.registerFont("assest/fonts/bourbon.ttf", {
  family: "Bourbon"
});
let font = db.get(`font_${member.guild.id}`)
  let welback = db.get(`welback1_${member.guild.id}`); //background
  let welchannl = db.get(`welchannl1_${member.guild.id}`); //channel
  let welmsg = db.get(`welmsg1_${member.guild.id}`); //message
  if (!welchannl) return;
  if (welmsg) {
    welmsg = welmsg.replace(/{user}/g, member);
    welmsg = welmsg.replace(/{server}/g, member.guild.name);
    welmsg = welmsg.replace(/{membercount}/g, member.guild.memberCount);
    welmsg = welmsg.replace(/{username}/g, member.user.tag);
    let matches = welmsg.match(/{:([a-zA-Z0-9-_~]+)}/g);
    if (!matches) matches = welmsg;
    for (const match of matches) {
      const rep = await member.guild.emojis.cache.find(
        emoji => emoji.name === match.substring(2, match.length - 1)
      );
      if (rep) welmsg = welmsg.replace(match, rep);
    }
  }
  let welc = db.get(`welcolor1_${member.guild.id}`); //welcome color
  let usrc = db.get(`usrcolor1_${member.guild.id}`);
  const canvas = Canvas.createCanvas(883, 431);
  const ctx = canvas.getContext("2d");
  let choices = [
    "https://media.discordapp.net/attachments/741712646361055333/743530826343514253/Best-HD-Backgrounds-Photos-Download.jpg?width=766&height=431",
    "https://media.discordapp.net/attachments/741712646361055333/743530817388806225/Best-PC-HD-Wallpapers-008.jpg?width=766&height=431",
    "https://media.discordapp.net/attachments/741712646361055333/743530777160974397/images.jpg?width=766&height=431"
  ];
  let response = choices[Math.floor(Math.random() * choices.length)];
  const background = await Canvas.loadImage(
    welback ||
      "https://media.discordapp.net/attachments/696417925418057789/744447998490312714/060.png?width=766&height=431"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.font = `70px ${font}`;
  ctx.fillStyle = welc || "#ffffff";
  centerText(ctx, "Welcome", canvas.height / 1.2, canvas);
  //ctx.fillText("Welcome", canvas.width / 2.6, canvas.height / 1.2);
  // Add an exclamation point here and below
  ctx.font = `55px ${font}`;
  ctx.fillStyle = usrc || "#ffffff";
  //let x = 512-(ctx.measureText(member.user.tag).width/2)
  //ctx.fillText(`${weirdToNormalChars(member.user.tag)}`, x, 200);//ok first i am making the canvas like koya
  centerText(ctx, weirdToNormalChars(member.user.tag), 410, canvas);
  ctx.beginPath();
  const back1 = await Canvas.loadImage(
    "https://cdn.glitch.com/e8fae0a6-f8d2-4180-9cf2-2a337ef27413%2Fa40b8840-4bae-425f-b1d6-649c62e7fca2.image.png?v=1597409272378"
  );
  ctx.drawImage(back1, 303, 23, 275, 275);
  ctx.lineWidth = 10;
  //Define Stroke Style
  ctx.strokeStyle = "#03A9F4";
  ctx.arc(440, 160, 130, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpg" }));
  ctx.drawImage(avatar, 310, 30, 270, 270);

  const attach = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
  let embed = db.get(`emb_${member.guild.id}`);
  if (embed == null) {
    client.channels.cache.get(welchannl).send(welmsg || "", attach);
  } else {
let h = db.get(`ec_${member.guild.id}`);
if(!h || !validator.isHexColor(h)) h = "#00FF00";
    const embed = new Discord.MessageEmbed()
      .setDescription(welmsg || "")
      .setColor(h) //thik ha na //yes embed  custom kardo
      .attachFiles([new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")])
      .setImage("attachment://welcome.png");
    client.channels.cache.get(welchannl).send(embed); //acha laga ga
  } //ab setup/welcome.js main ayo

}
