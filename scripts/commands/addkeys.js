const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { pushVotekeys } = require( '../cruds/pushVotekeys' );

const data = new SlashCommandBuilder()
  .setName( 'addkeys' )
  .setDescription( 'Add votekeys. The votekey list is specific to the server.' )
  .addStringOption( ( option ) => option
    .setName( 'votekeys' )
    .setDescription( 'Space-separated list of votekeys.' )
    .setRequired( true )
  );

const func = async ( interaction ) => {
  const guildId = interaction.data.guild_id;
  const options = interaction.data.options;

  const votekeys = options?.find( ( v ) => v.name === 'votekeys' )?.value;
  const votekeysArray = votekeys.split( ' ' )
    .filter( ( str ) => str !== '' );

  await pushVotekeys( guildId, votekeysArray );

  return `✅ Added ${ votekeysArray.length } votekeys successfully!`;
};

module.exports = { data, func };
