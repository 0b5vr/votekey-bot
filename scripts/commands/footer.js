const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { setFooter } = require('../cruds/setFooter');

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

  const content = options?.find( ( v ) => v.name === 'content' )?.value;

  setFooter( guildId, content );

  return '✅ Successfully updated the footer.';
};

module.exports = { data, func };
