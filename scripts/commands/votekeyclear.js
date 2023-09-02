const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );
const { replyDeferredChannelMessage } = require( '../utils/replyDeferredChannelMessage.js' );
const { updateChannelMessage } = require( '../utils/updateChannelMessage.js' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'votekeyclear' )
  .setDescription( 'Clear the existing votekey list.' );

const func = async ( interaction, reply ) => {
  await replyDeferredChannelMessage( reply );

  const token = interaction.token;
  const guildId = interaction.data.guild_id;

  const doc = firestore.doc( `votekeys/${ guildId }` );
  await doc.set( { votekeys: [] } );

  return await updateChannelMessage( token, '✅ Successfully cleared the votekey list.' );
};

module.exports = { data, func };
