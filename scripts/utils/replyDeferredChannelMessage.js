const { InteractionResponseType } = require( 'discord-interactions' );

async function replyDeferredChannelMessage( reply ) {
  return await reply.send( {
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  } );
}

module.exports = { replyDeferredChannelMessage };
