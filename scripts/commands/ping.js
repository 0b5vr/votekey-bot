const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { replyChannelMessage } = require( '../utils/replyChannelMessage.js' );

const data = new SlashCommandBuilder()
  .setName( 'ping' )
  .setDescription( 'You\'ll expect "pong".' );

const func = async ( interaction, res ) => {
  replyChannelMessage( res, 'pong' );
};

module.exports = { data, func };
