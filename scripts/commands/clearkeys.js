const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { clearVotekeys } = require( '../cruds/clearVotekeys' );

const data = new SlashCommandBuilder()
  .setName( 'clearkeys' )
  .setDescription( 'Clear the existing votekey list.' );

const func = async ( interaction ) => {
  const guildId = interaction.data.guild_id;

  await clearVotekeys( guildId );

  return '✅ Successfully cleared the votekey list.';
};

module.exports = { data, func };
