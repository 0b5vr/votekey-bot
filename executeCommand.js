const { InteractionResponseType, InteractionType } = require( 'discord-interactions' );
const { funcs } = require( './commands/index.js' );
const { updateCommands } = require( './updateCommands' );

/**
 * @param {import( 'fastify' ).FastifyRequest} req
 * @param {import( 'fastify' ).FastifyReply} reply
 */
async function executeCommand( req, reply ) {
  const interaction = req.body;

  if ( interaction?.type === InteractionType.APPLICATION_COMMAND ) {
    const name = interaction.data.name;
    const func = funcs[ name ];

    if ( func == null ) {
      return reply.status( 500 ).send( {
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
    return reply.send( {
      type: InteractionResponseType.PONG,
    } );
  }
}

module.exports = {
  executeCommand,
};
