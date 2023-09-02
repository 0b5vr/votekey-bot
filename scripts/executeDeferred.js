const { InteractionType } = require('discord-interactions');
const { deferredFuncs } = require( './commands/index.js' );
const { updateChannelMessage } = require('./utils/updateChannelMessage.js');

/**
 * @param {import( 'fastify' ).FastifyRequest} req
 * @param {import( 'fastify' ).FastifyReply} reply
 */
async function executeDeferred( req, reply ) {
  const interaction = req.body;

  if ( interaction?.type === InteractionType.APPLICATION_COMMAND ) {
    const name = interaction.data.name;
    const deferredFunc = deferredFuncs[ name ];

    let content;

    try {
      content = await deferredFunc( interaction );
    } catch ( error ) {
      console.error( JSON.stringify( error ) );
      content = '👾 Something went wrong!';
    }

    const token = interaction.token;
    await updateChannelMessage( token, content );

    return await reply.send();
  } else {
    return await reply.status( 400 ).send( 'Bad request' );
  }
}

module.exports = {
  executeDeferred,
};
