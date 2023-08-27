const { REST } = require( '@discordjs/rest' );
const { Routes } = require( 'discord-api-types/v9' );
const { body } = require( './commands/index.js' );

const rest = new REST().setToken( process.env.DISCORD_BOT_TOKEN );

async function updateCommands( guildId ) {
  await rest.put(
    Routes.applicationGuildCommands( process.env.DISCORD_APPLICATION_ID, guildId ),
    { body },
  );
}

module.exports = {
  updateCommands,
};
