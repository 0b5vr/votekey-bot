const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'countkeys' )
  .setDescription( 'Count currently registered votekeys.' );

const func = async ( interaction ) => {
  const guildId = interaction.data.guild_id;

  const doc = firestore.doc( `votekeys/${ guildId }` );
  const snapshot = await doc.get();
  const votekeys = snapshot?.get( 'votekeys' ) ?? [];

  return `✅ I currently have ${ votekeys.length } available votekeys.`;
};

module.exports = { data, func };
