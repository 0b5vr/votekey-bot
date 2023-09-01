const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );
const { resChannelMessage } = require('./utils/resChannelMessage');

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'votekeyadd' )
  .setDescription( 'Add votekeys.' )
  .setDefaultMemberPermissions( 0 )
  .addStringOption( ( option ) => option
    .setName( 'votekeys' )
    .setDescription( 'Space-separated list of votekeys.' )
    .setRequired( true )
  );

const func = async ( interaction, res ) => {
  const options = interaction.data.options;

  const optionVotekeys = options?.find( ( v ) => v.name === 'votekeys' )?.value;
  const optionVotekeysArray = optionVotekeys.split( ' ' );

  const doc = firestore.doc( 'votekeys/doc' );
  const votekeys = ( await doc.get() )?.get( 'votekeys' ) ?? [];

  votekeys.push( ...optionVotekeysArray );
  await doc.set( { votekeys } );

  return await resChannelMessage( res, `✅ Added ${ optionVotekeysArray.length } votekeys successfully! I currently have ${ votekeys.length } available votekeys.` );
};

module.exports = { data, func };
