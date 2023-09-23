const { SlashCommandBuilder } = require( '@discordjs/builders' );

const data = new SlashCommandBuilder()
  .setName( 'ping' )
  .setDescription( 'You\'ll expect "pong".' );

const func = async ( interaction ) => {
  return '✅ pong';
};

module.exports = { data, func };
