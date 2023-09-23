const { firestore } = require( '../firestore' );

/**
 * @param {string} guildId
 * @param {string} key
 */
async function unshiftVotekey( guildId, key ) {
  const docRef = firestore.doc( `votekeys/${ guildId }` );

  await firestore.runTransaction( async ( transaction ) => {
    const docSnapshot = await transaction.get( docRef );

    const docData = docSnapshot.data();
    const votekeys = docData?.votekeys ?? [];
    votekeys.unshift( key );

    transaction.set( docRef, { votekeys }, { merge: true } );
  } );
}

module.exports = { unshiftVotekey };
