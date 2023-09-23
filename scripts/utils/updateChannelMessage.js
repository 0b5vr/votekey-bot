const { REST } = require( 'discord.js' );
const { Routes } = require( 'discord-api-types/v9' );

const rest = new REST().setToken( process.env.DISCORD_BOT_TOKEN );

async function updateChannelMessage( token, content ) {
  await rest.patch(
    Routes.webhookMessage( process.env.DISCORD_APPLICATION_ID, token, '@original' ),
    {
      body: {
        content,
      }
    },
  );
}

module.exports = { updateChannelMessage };
