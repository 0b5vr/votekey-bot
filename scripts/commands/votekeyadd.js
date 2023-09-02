const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );
const { resChannelMessage } = require('./utils/resChannelMessage');

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'votekeyadd' )
  .setDescription( 'Add votekeys. The votekey list is specific to the server.' )
  .addStringOption( ( option ) => option
    .setName( 'votekeys' )
    .setDescription( 'Space-separated list of votekeys.' )
    .setRequired( true )
  );

const func = async ( interaction, res ) => {
  const guildId = interaction.data.guid_id;
  const options = interaction.data.options;

  const optionVotekeys = options?.find( ( v ) => v.name === 'votekeys' )?.value;
  const optionVotekeysArray = optionVotekeys.split( ' ' );

  const doc = firestore.doc( `votekeys/${ guildId }` );
  const snapshot = await doc.get();
  const votekeys = snapshot?.get( 'votekeys' ) ?? [];

  votekeys.push( ...optionVotekeysArray );
  await doc.set( { votekeys } );

  return await resChannelMessage( res, `✅ Added ${ optionVotekeysArray.length } votekeys successfully!` );
};

module.exports = { data, func };
