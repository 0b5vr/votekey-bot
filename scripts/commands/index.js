const commands = [
  require( './ping.js' ),
  require( './votekeyadd.js' ),
  require( './votekeyclear.js' ),
  require( './votekeycount.js' ),
  require( './votekeydm.js' ),
];

const body = [];
const funcs = {};

commands.forEach( ( command ) => {
  const name = command.data.name;

  body.push( command.data );
  funcs[ name ] = command.func;
} );

module.exports = { body, funcs };
