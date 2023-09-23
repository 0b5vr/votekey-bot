const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { getVotekeys } = require( '../cruds/getVotekeys' );

const data = new SlashCommandBuilder()
  .setName( 'countkeys' )
  .setDescription( 'Count currently registered votekeys.' );

const func = async ( interaction ) => {
  const guildId = interaction.data.guild_id;

  const votekeys = ( await getVotekeys( guildId ) ) ?? [];

  return `✅ I currently have ${ votekeys.length } available votekeys.`;
};

module.exports = { data, func };
