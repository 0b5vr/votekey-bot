const { firestore } = require( '../firestore' );

/**
 * @param {string} guildId
 * @param {string[]} keys
 */
async function pushVotekeys( guildId, keys ) {
  const docRef = firestore.doc( `votekeys/${ guildId }` );

  await firestore.runTransaction( async ( transaction ) => {
    const docSnapshot = await transaction.get( docRef );

    const docData = docSnapshot.data();
    const votekeys = docData?.votekeys ?? [];
    votekeys.push( ...keys );

    transaction.set( docRef, { votekeys }, { merge: true } );
  } );
}

module.exports = { pushVotekeys };
