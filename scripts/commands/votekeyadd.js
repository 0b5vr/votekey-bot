const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'votekeyadd' )
  .setDescription( 'Add votekeys. The votekey list is specific to the server.' )
  .addStringOption( ( option ) => option
    .setName( 'votekeys' )
    .setDescription( 'Space-separated list of votekeys.' )
    .setRequired( true )
  );

const deferredFunc = async ( interaction ) => {
  const guildId = interaction.data.guild_id;
  const options = interaction.data.options;

  const optionVotekeys = options?.find( ( v ) => v.name === 'votekeys' )?.value;
  const optionVotekeysArray = optionVotekeys.split( ' ' )
    .filter( ( str ) => str !== '' );

  const doc = firestore.doc( `votekeys/${ guildId }` );
  const snapshot = await doc.get();
  const votekeys = snapshot?.get( 'votekeys' ) ?? [];

  votekeys.push( ...optionVotekeysArray );
  await doc.set( { votekeys } );

  return `✅ Added ${ optionVotekeysArray.length } votekeys successfully!`;
};

module.exports = { data, deferredFunc };
