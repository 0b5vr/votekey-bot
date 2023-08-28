const { verifyKey } = require( 'discord-interactions' );

/**
 * @param {import( 'fastify' ).FastifyRequest} req
 * @param {import( 'fastify' ).FastifyReply} reply
 * @param {import( 'fastify' ).HookHandlerDoneFunction} reply
 */
async function verifyRequest( req, reply ) {
  const signature = req.headers[ 'x-signature-ed25519' ];
  const timestamp = req.headers[ 'x-signature-timestamp' ];

  const result = verifyKey( req.rawBody, signature, timestamp, process.env.DISCORD_PUBLIC_KEY );
  if ( !result ) {
    return reply.status( 401 ).send( 'Bad request signature' );
  }
}

module.exports = {
  verifyRequest,
};
