const { firestore } = require( '../firestore' );

/**
 * @param {string} guildId
 */
async function clearVotekeys( guildId ) {
  const docRef = firestore.doc( `votekeys/${ guildId }` );
  docRef.set( { votekeys: [] }, { merge: true } );
}

module.exports = { clearVotekeys };
