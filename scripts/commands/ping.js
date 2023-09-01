const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { resChannelMessage } = require( './utils/resChannelMessage.js' );

const data = new SlashCommandBuilder()
  .setName( 'ping' )
  .setDescription( 'You\'ll expect "pong".' );

const func = async ( interaction, res ) => {
  resChannelMessage( res, 'pong' );
};

module.exports = { data, func };
