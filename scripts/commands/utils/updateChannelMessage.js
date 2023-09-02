const { REST } = require( 'discord.js' );
const { Routes } = require( 'discord-api-types/v9' );

const rest = new REST().setToken( process.env.DISCORD_BOT_TOKEN );

async function updateChannelMessage( token, content ) {
  await rest.post(
    Routes.webhook( process.env.DISCORD_APPLICATION_ID, token ),
    {
      body: {
        content,
      }
    },
  );
}

module.exports = { updateChannelMessage };
