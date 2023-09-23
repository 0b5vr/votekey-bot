const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );

const firestore = new Firestore();

const data = new SlashCommandBuilder()
  .setName( 'footer' )
  .setDescription( 'Set the footer for messages sent via `/dmkey`.' )
  .addStringOption( ( option ) => option
    .setName( 'content' )
    .setDescription( 'The footer content.' )
    .setRequired( true )
  );

const func = async ( interaction ) => {
  const guildId = interaction.data.guild_id;
  const options = interaction.data.options;

  const optionContent = options?.find( ( v ) => v.name === 'content' )?.value;

  const doc = firestore.doc( `votekeys/${ guildId }` );
  await doc.set( { footer: optionContent }, { merge: true } );

  return '✅ Successfully updated the footer.';
};

module.exports = { data, func };
