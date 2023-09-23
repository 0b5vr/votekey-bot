const { firestore } = require( '../firestore' );
const { DocNotFoundError, VotekeysEmptyError } = require( './errors' );

/**
 * @param {string} guildId
 * @returns {Promise<string>}
 * @throws {DocNotFoundError}
 * @throws {VotekeysEmptyError}
 */
async function shiftVotekey( guildId ) {
  const docRef = firestore.doc( `votekeys/${ guildId }` );

  return await firestore.runTransaction( async ( transaction ) => {
    const docSnapshot = await transaction.get( docRef );

    const docData = docSnapshot.data();
    if ( docData == null ) {
      throw new DocNotFoundError();
    }

    const votekeys = docData.votekeys ?? [];
    if ( votekeys.length === 0 ) {
      throw new VotekeysEmptyError();
    }

    const votekey = votekeys.shift();

    transaction.set( docRef, { votekeys }, { merge: true } );

    return votekey;
  } );
}

module.exports = { shiftVotekey };
