const { updateCommands } = require( './updateCommands' );

/**
 * @param {import( 'fastify' ).FastifyRequest} req
 * @param {import( 'fastify' ).FastifyReply} reply
 */
async function updateHandler( req, reply ) {
  const guildId = req.query.guild_id;

  if ( guildId == null ) {
    return reply.status( 400 ).send( 'Please specify guild_id as a query' );
  }

  try {
    await updateCommands( guildId );
  } catch ( e ) {
    console.error( JSON.stringify( e ) );

    if ( e.code === 50001 ) {
      const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${ process.env.DISCORD_APPLICATION_ID }&permissions=0&scope=bot%20applications.commands`;
      return reply.status( 403 ).send( 'It seems the bot is not in the server. Please invite the bot first! ' + inviteUrl );
    } else {
      return reply.status( 500 ).send( 'Something went wrong!' );
    }

  }

  return reply.send( 'OK' );
}

module.exports = {
  updateHandler,
};
