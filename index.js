const { executeCommand } = require( './executeCommand.js' );

const server = require( 'fastify' )( {
  logger: true,
  trustProxy: true,
} );

server.all( '/', executeCommand );

( async () => {
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
