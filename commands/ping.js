const { InteractionResponseType } = require( 'discord-interactions' );
const { SlashCommandBuilder } = require( '@discordjs/builders' );

const data = new SlashCommandBuilder()
  .setName( 'ping' )
  .setDescription( 'You\'ll expect "pong".' );

const func = async ( interaction, res ) => {
  await res.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'pong',
    },
  } );
};

module.exports = { data, func };
