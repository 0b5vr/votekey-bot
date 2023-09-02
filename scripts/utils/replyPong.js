const { InteractionResponseType } = require( 'discord-interactions' );

async function replyPong( reply ) {
  return await reply.send( {
    type: InteractionResponseType.PONG,
  } );
}

module.exports = { replyPong };
