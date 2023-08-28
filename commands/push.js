const { InteractionResponseType } = require( 'discord-interactions' );
const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'push' )
  .setDescription( 'Push a string content to the stack.' )
  .addStringOption( ( op ) => op
    .setName( 'content' )
    .setDescription( 'A string content.' )
    .setRequired( true )
  );

const func = async ( interaction, res ) => {
  const options = interaction.data.options;

  const content = options?.find( ( v ) => v.name === 'content' )?.value;

  if ( content == null || content === '' ) {
    return await res.send( {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Cannot push an empty content!',
      },
    } );
  }

  const doc = firestore.doc( 'push/stack' );
  const stack = await doc.get();
  let array = stack?.get( 'array' ) ?? [];

  array.push( content );
  await doc.set( { array } );

  return await res.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Pushed "${ content }" successfully`,
    },
  } );
};

module.exports = { data, func };
