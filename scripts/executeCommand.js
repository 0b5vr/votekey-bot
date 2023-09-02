const { InteractionType } = require( 'discord-interactions' );
const { funcs, deferredFuncs } = require( './commands/index.js' );
const { updateCommands } = require( './updateCommands.js' );
const { replyChannelMessage } = require( './utils/replyChannelMessage.js' );
const { replyDeferredChannelMessage } = require( './utils/replyDeferredChannelMessage.js' );
const { replyPong } = require( './utils/replyPong.js' );

async function sendDeferredRequest( interaction ) {
  const localUrl = 'http://0.0.0.0:' + ( process.env.PORT ?? 8080 );
  const url = process.env.SERVICE_URL ?? localUrl;
  const endpoint = url + '/defer';

  await fetch( endpoint, {
    method: 'post',
    body: JSON.stringify( interaction ),
    headers: {
      'Content-Type': 'application/json',
    },
  } );
};

/**
 * @param {import( 'fastify' ).FastifyRequest} req
 * @param {import( 'fastify' ).FastifyReply} reply
 */
async function executeCommand( req, reply ) {
  const interaction = req.body;

  if ( interaction?.type === InteractionType.APPLICATION_COMMAND ) {
    const name = interaction.data.name;
    const func = funcs[ name ];

    if ( funcs[ name ] ) {
      let content;

      try {
        content = await func( interaction, reply );
      } catch ( error ) {
        console.error( JSON.stringify( error ) );
        content = '👾 Something went wrong!';
      }

      return await replyChannelMessage( reply, content );
    } else if ( deferredFuncs[ name ] ) {
      sendDeferredRequest( interaction );
      return await replyDeferredChannelMessage( reply );
    }
  } else {
    return await replyPong( reply );
  }
}

module.exports = {
  executeCommand,
};
