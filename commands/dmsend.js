const { InteractionResponseType } = require( 'discord-interactions' );
const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { REST } = require( 'discord.js' );
const { Routes } = require( 'discord-api-types/v9' );

const rest = new REST().setToken( process.env.DISCORD_BOT_TOKEN );

const data = new SlashCommandBuilder()
  .setName( 'dmsend' )
  .setDescription( 'The bot will send a DM to the specified user.' )
  .setDefaultMemberPermissions( 0 )
  .addUserOption( ( option ) => option
    .setName( 'user' )
    .setDescription( 'The destination user.' )
    .setRequired( true )
  )
  .addStringOption( ( option ) => option
    .setName( 'content' )
    .setDescription( 'The content the bot will send to the specified user.' )
    .setRequired( true )
  );

const func = async ( interaction, res ) => {
  const options = interaction.data.options;

  const user = options?.find( ( v ) => v.name === 'user' )?.value;
  const content = options?.find( ( v ) => v.name === 'content' )?.value;

  const userChannelsResult = await rest.post(
    Routes.userChannels(),
    {
      body: {
        recipient_id: user,
      }
    },
  );

  try {
    await rest.post(
      Routes.channelMessages( userChannelsResult.id ),
      {
        body: {
          content,
        },
      },
    );
  } catch ( error ) {
    if ( error.code === 50007 ) {
      return await res.send( {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '❌ Could not send a DM. Maybe the user is set not to receive DMs.',
        },
      } );
    } else {
      console.log( JSON.stringify( haha ) );

      return await res.send( {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '👾 Something went wrong!',
        },
      } );
    }
  }

  return await res.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: '✅ Sent a DM!',
    },
  } );
};

module.exports = { data, func };
