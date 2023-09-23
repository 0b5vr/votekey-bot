const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'clearkeys' )
  .setDescription( 'Clear the existing votekey list.' );

const func = async ( interaction ) => {
  const guildId = interaction.data.guild_id;

  const doc = firestore.doc( `votekeys/${ guildId }` );
  await doc.set( { votekeys: [] }, { merge: true } );

  return '✅ Successfully cleared the votekey list.';
};

module.exports = { data, func };
