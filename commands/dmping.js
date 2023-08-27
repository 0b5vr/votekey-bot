const { InteractionResponseType } = require( 'discord-interactions' );
const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { REST } = require( 'discord.js' );
const { Routes } = require( 'discord-api-types/v9' );

const rest = new REST().setToken( process.env.DISCORD_BOT_TOKEN );

const data = new SlashCommandBuilder()
  .setName( 'dmping' )
  .setDescription( 'You\'ll expect "pong", but in DM.' );

const func = async ( interaction, res ) => {
  const userChannelsResult = await rest.post(
    Routes.userChannels(),
    {
      body: {
        recipient_id: interaction.member.user.id,
      }
    },
  );

  await rest.post(
    Routes.channelMessages( userChannelsResult.id ),
    {
      body: {
        content: 'pong',
      },
    },
  );

  await res.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'Sent a "pong" in a DM!',
    },
  } );
};

module.exports = { data, func };
