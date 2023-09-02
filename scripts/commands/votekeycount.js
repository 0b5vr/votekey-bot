const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );
const { replyDeferredChannelMessage } = require( '../utils/replyDeferredChannelMessage.js' );
const { updateChannelMessage } = require( '../utils/updateChannelMessage.js' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'votekeycount' )
  .setDescription( 'Count currently registered votekeys.' );

const func = async ( interaction, reply ) => {
  await replyDeferredChannelMessage( reply );

  const token = interaction.token;
  const guildId = interaction.data.guild_id;

  const doc = firestore.doc( `votekeys/${ guildId }` );
  const snapshot = await doc.get();
  const votekeys = snapshot?.get( 'votekeys' ) ?? [];

  return await updateChannelMessage( token, `✅ I currently have ${ votekeys.length } available votekeys.` );
};

module.exports = { data, func };
