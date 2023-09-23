const { firestore } = require( '../firestore' );

/**
 * @param {string} guildId
 * @returns {Promise<string[] | null>}
 */
async function getVotekeys( guildId ) {
  const docRef = firestore.doc( `votekeys/${ guildId }` );

  const docSnapshot = await docRef.get();
  const docData = docSnapshot.data();

  return docData?.votekeys ?? null;
}

module.exports = { getVotekeys };
