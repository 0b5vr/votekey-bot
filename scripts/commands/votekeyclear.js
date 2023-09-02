const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );
const { resChannelMessage } = require('./utils/resChannelMessage');

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'votekeyclear' )
  .setDescription( 'Clear the existing votekey list.' )
  .setDefaultMemberPermissions( 0 )

const func = async ( interaction, res ) => {
  const guildId = interaction.data.guid_id;

  const doc = firestore.doc( `votekeys/${ guildId }` );
  await doc.set( { votekeys: [] } );

  return await resChannelMessage( res, '✅ Successfully cleared the votekey list.' );
};

module.exports = { data, func };
