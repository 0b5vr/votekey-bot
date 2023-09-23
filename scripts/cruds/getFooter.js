const { firestore } = require( '../firestore' );

/**
 * @param {string} guildId
 * @returns {Promise<string | null>}
 */
async function getFooter( guildId ) {
  const docRef = firestore.doc( `votekeys/${ guildId }` );

  const docSnapshot = await docRef.get();
  const docData = docSnapshot.data();

  return docData?.footer ?? null;
}

module.exports = { getFooter };
