const commands = [
  require( './dmping.js' ),
  require( './dmsend.js' ),
  require( './ping.js' ),
  require( './pop.js' ),
  require( './push.js' ),
  require( './roll.js' ),
];

const body = [];
const funcs = {};

commands.forEach( ( command ) => {
  const name = command.data.name;

  body.push( command.data );
  funcs[ name ] = command.func;
} );

module.exports = { body, funcs };
