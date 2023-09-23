const { InteractionType } = require('discord-interactions');
const { commands } = require( './commands/index.js' );
const { updateChannelMessage } = require('./utils/updateChannelMessage.js');

/**
 * @param {import( 'fastify' ).FastifyRequest} req
 * @param {import( 'fastify' ).FastifyReply} reply
 */
async function executeDeferred( req, reply ) {
  const interaction = req.body;

  if ( interaction?.type === InteractionType.APPLICATION_COMMAND ) {
    const name = interaction.data.name;
    const command = commands[ name ];
    const token = interaction.token;

    let content;

    await updateChannelMessage( token, '⌛ Wait a moment...' );

    try {
      content = await command.func( interaction );
    } catch ( error ) {
      console.error( JSON.stringify( error ) );
      content = '👾 Something went wrong!';
    }

    await updateChannelMessage( token, content );

    return await reply.send();
  } else {
    return await reply.status( 400 ).send( 'Bad request' );
  }
}

module.exports = {
  executeDeferred,
};
