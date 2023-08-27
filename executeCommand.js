const { InteractionResponseType, InteractionType, verifyKey } = require( 'discord-interactions' );
const { publicKey } = require( './config.json' );
const { funcs } = require( './commands/index.js' );
const { updateCommands } = require( './updateCommands' );

/**
 * @param {import( 'fastify' ).FastifyRequest} req
 * @returns {boolean}
 */
function verifyRequest( req ) {
  const signature = req.headers[ 'x-signature-ed25519' ];
  const timestamp = req.headers[ 'x-signature-timestamp' ];
  return verifyKey( req.rawBody, signature, timestamp, publicKey );
}

/**
 * @param {import( 'fastify' ).FastifyRequest} req
 * @param {import( 'fastify' ).FastifyReply} reply
 */
async function executeCommand( req, reply ) {
  if ( !verifyRequest( req ) ) {
    return reply.status( 401 ).send( 'Bad request signature' );
  }

  const interaction = req.body;

  if ( interaction?.type === InteractionType.APPLICATION_COMMAND ) {
    const name = interaction.data.name;
    const func = funcs[ name ];

    if ( func == null ) {
      reply.status( 500 ).send( {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `The command ${ name } is not implemented!`,
        },
      } );
    }

    await func( interaction, reply );

    // Make the command listing up to date
    await updateCommands( interaction.data.guild_id );
  } else {
    reply.send( {
      type: InteractionResponseType.PONG,
    } );
  }
}

module.exports = {
  executeCommand,
};
