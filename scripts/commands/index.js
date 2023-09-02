const commands = [
  require( './ping.js' ),
  require( './votekeyadd.js' ),
  require( './votekeyclear.js' ),
  require( './votekeycount.js' ),
  require( './votekeydm.js' ),
];

const body = [];
const funcs = {};
const deferredFuncs = {};

commands.forEach( ( command ) => {
  const name = command.data.name;

  body.push( command.data );

  if ( command.func ) {
    funcs[ name ] = command.func;
  }

  if ( command.deferredFunc ) {
    deferredFuncs[ name ] = command.deferredFunc;
  }
} );

module.exports = { body, funcs, deferredFuncs };
