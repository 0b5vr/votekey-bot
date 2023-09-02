const { InteractionResponseType } = require( 'discord-interactions' );

async function replyChannelMessage( res, content ) {
  return await res.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content,
    },
  } );
}

module.exports = { replyChannelMessage };
