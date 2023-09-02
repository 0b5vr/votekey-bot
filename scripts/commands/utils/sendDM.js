const { REST } = require( 'discord.js' );
const { Routes } = require( 'discord-api-types/v9' );

const rest = new REST().setToken( process.env.DISCORD_BOT_TOKEN );

async function sendDM( userId, content ) {
  const userChannelsResult = await rest.post(
    Routes.userChannels(),
    {
      body: {
        recipient_id: userId,
      }
    },
  );

  await rest.post(
    Routes.channelMessages( userChannelsResult.id ),
    {
      body: {
        content,
      },
    },
  );
}

module.exports = { sendDM };
