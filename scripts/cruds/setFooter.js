const { firestore } = require( '../firestore' );

/**
 * @param {string} guildId
 * @param {string} footer
 */
async function setFooter( guildId, footer ) {
  const docRef = firestore.doc( `votekeys/${ guildId }` );
  await docRef.set( { footer }, { merge: true } );
}

module.exports = { setFooter };
