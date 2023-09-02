const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );
const { sendDM } = require( '../utils/sendDM.js' );

const firestore = new Firestore();

const template = `Your votekey: %votekey%

Register from https://wuhu.tokyodemofest.jp/index.php?page=Login !`;

const data = new SlashCommandBuilder()
  .setName( 'votekeydm' )
  .setDescription( 'Send a votekey to the specified user via DM.' )
  .addUserOption( ( option ) => option
    .setName( 'user' )
    .setDescription( 'The destination user.' )
    .setRequired( true )
  );

const deferredFunc = async ( interaction ) => {
  const guildId = interaction.data.guild_id;
  const options = interaction.data.options;

  const user = options?.find( ( v ) => v.name === 'user' )?.value;

  const doc = firestore.doc( `votekeys/${ guildId }` );
  const snapshot = await doc.get();
  const votekeys = snapshot?.get( 'votekeys' ) ?? [];

  if ( votekeys.length === 0 ) {
    return '❌ No votekeys left! Please add new votekeys!';
  }

  const votekey = votekeys.shift();

  const content = template.replace( '%votekey%', `\`${ votekey }\`` );

  try {
    await sendDM( user, content );
  } catch ( error ) {
    if ( error.code === 50007 ) {
      return '❌ Could not send a DM. Maybe the user is set not to receive DMs.';
    } else {
      throw error;
    }
  }

  await doc.set( { votekeys } );

  return `✅ Sent a votekey to <@${ user }> via DM!`;
};

module.exports = { data, deferredFunc };
