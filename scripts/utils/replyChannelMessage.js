const { InteractionResponseType } = require( 'discord-interactions' );

async function replyChannelMessage( reply, content ) {
  return await reply.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content,
    },
  } );
}

module.exports = { replyChannelMessage };
