const { InteractionResponseType } = require( 'discord-interactions' );

async function resChannelMessage( res, content ) {
  return await res.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content,
    },
  } );
}

module.exports = { resChannelMessage };
