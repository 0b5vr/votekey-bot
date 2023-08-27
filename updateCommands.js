const { token, appId } = require( './config.json' );
const { REST } = require( '@discordjs/rest' );
const { Routes } = require( 'discord-api-types/v9' );
const { body } = require( './commands/index.js' );

const rest = new REST().setToken( token );

async function updateCommands( guildId ) {
  await rest.put(
    Routes.applicationGuildCommands( appId, guildId ),
    { body },
  );
}

module.exports = {
  updateCommands,
};
