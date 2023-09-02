const { InteractionResponseType } = require( 'discord-interactions' );

async function resDeferredChannelMessage( res ) {
  return await res.send( {
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  } );
}

module.exports = { resDeferredChannelMessage };
