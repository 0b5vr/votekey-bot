const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );
const { resDeferredChannelMessage } = require( './utils/resDeferredChannelMessage.js' );
const { updateChannelMessage } = require( './utils/updateChannelMessage.js' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'votekeyclear' )
  .setDescription( 'Clear the existing votekey list.' );

const func = async ( interaction, res ) => {
  await resDeferredChannelMessage( res );

  const token = interaction.token;
  const guildId = interaction.data.guid_id;

  const doc = firestore.doc( `votekeys/${ guildId }` );
  await doc.set( { votekeys: [] } );

  return await updateChannelMessage( token, '✅ Successfully cleared the votekey list.' );
};

module.exports = { data, func };
