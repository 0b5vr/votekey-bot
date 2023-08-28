const { InteractionResponseType } = require( 'discord-interactions' );
const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'pop' )
  .setDescription( 'Pop a string content from the stack.' );

const func = async ( interaction, res ) => {
  const doc = firestore.doc( 'push/stack' );
  const stack = await doc.get();
  const array = stack?.get( 'array' );

  if ( !Array.isArray( array ) ) {
    return await res.send( {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'The database does not have the stack record. Try pushing a data once',
      },
    } );
  }

  const content = array.pop();
  if ( content == null ) {
    return await res.send( {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'The stack is empty!',
      },
    } );
  }

  await doc.set( { array } );

  return await res.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `"${ content }"`,
    },
  } );
};

module.exports = { data, func };
