const { executeCommand } = require( './executeCommand.js' );
const { verifyRequest } = require( './verifyRequest.js' );
const { updateHandler } = require( './updateHandler.js' );

( async () => {
  const server = require( 'fastify' )( {
    logger: true,
    trustProxy: true,
  } );

  await server.register( require( 'fastify-raw-body' ) );

  server.all( '/', { preHandler: verifyRequest }, executeCommand );

  server.all( '/update', updateHandler );

  await server.listen(
    {
      port: process.env.PORT ?? 8080,
      host: '0.0.0.0',
    },
  ).catch( ( error ) => {
    server.log.error( error );
    process.exit( 1 );
  } );
} )();
