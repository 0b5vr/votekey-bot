const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { sendDM } = require( '../utils/sendDM.js' );
const { shiftVotekey } = require( '../cruds/shiftVotekey.js' );
const { getFooter } = require( '../cruds/getFooter.js' );
const { DocNotFoundError, VotekeysEmptyError } = require( '../cruds/errors.js' );
const { unshiftVotekey } = require( '../cruds/unshiftVotekey.js' );

const data = new SlashCommandBuilder()
  .setName( 'dmkey' )
  .setDescription( 'Send a votekey to the specified user via DM.' )
  .addUserOption( ( option ) => option
    .setName( 'user' )
    .setDescription( 'The destination user.' )
    .setRequired( true )
  );

const func = async ( interaction ) => {
  const guildId = interaction.data.guild_id;
  const options = interaction.data.options;

  const user = options?.find( ( v ) => v.name === 'user' )?.value;

  const votekey = await shiftVotekey( guildId )
    .catch( ( error ) => {
      if ( error instanceof DocNotFoundError || error instanceof VotekeysEmptyError ) {
        return null;
      } else {
        throw error;
      }
    } );

  if ( votekey == null ) {
    return '❌ No votekeys left! Please add new votekeys!';
  }

  const footer = await getFooter( guildId ) ?? '';

  const dmContent = `Your votekey: \`${ votekey }\`
${ footer }`;

  try {
    await sendDM( user, dmContent );
  } catch ( error ) {
    await unshiftVotekey( guildId, votekey );

    if ( error.code === 50007 ) {
      return '❌ Could not send a DM. Maybe the user is set not to receive DMs.';
    } else {
      throw error;
    }
  }

  return `✅ Sent a votekey to <@${ user }> via DM!`;
};

module.exports = { data, func };
