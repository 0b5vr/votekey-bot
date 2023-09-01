const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { Firestore } = require( '@google-cloud/firestore' );
const { resChannelMessage } = require('./utils/resChannelMessage');

const firestore = new Firestore();

const template = `Your votekey: %votekey%

Register from https://wuhu.tokyodemofest.jp/index.php?page=Login !`;

const data = new SlashCommandBuilder()
  .setName( 'votekeydm' )
  .setDescription( 'Send a votekey to the specified user via DM.' )
  .setDefaultMemberPermissions( 0 )
  .addUserOption( ( option ) => option
    .setName( 'user' )
    .setDescription( 'The destination user.' )
    .setRequired( true )
  );

const func = async ( interaction, res ) => {
  const options = interaction.data.options;

  const user = options?.find( ( v ) => v.name === 'user' )?.value;

  const doc = firestore.doc( 'votekeys/doc' );
  const snapshot = await doc.get();
  const votekeys = snapshot?.get( 'votekeys' ) ?? [];

  if ( votekeys.length === 0 ) {
    return await resChannelMessage( res, '❌ No votekeys left! Please add new votekeys!' );
  }

  const votekey = votekeys.shift();

  const content = template.replace( '%votekey%', `\`${ votekey }\`` );

  try {
    await sendDM( user, content );
  } catch ( error ) {
    if ( error.code === 50007 ) {
      return await resChannelMessage( res, '❌ Could not send a DM. Maybe the user is set not to receive DMs.' );
    } else {
      console.log( JSON.stringify( haha ) );
      return await resChannelMessage( res, '👾 Something went wrong!' );
    }
  }

  await doc.set( { votekeys } );

  return await resChannelMessage( res, '✅ Sent a votekey via DM!' );
};

module.exports = { data, func };
