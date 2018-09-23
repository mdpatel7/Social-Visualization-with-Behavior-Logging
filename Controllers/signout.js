const handleSignout = (req, res, db) =>{
	const { email, logouttime} = req.body;
	db.transaction(trx => {
      trx.insert({
      	email: email,
        activity: 'logout',
      	time: (new Date()).toString().replace('GMT-0700 (MST)','')
      })
    .into('userloghistory')
    .then(trx.commit)
    .catch(trx.rollback)
  })
}
module.exports = {
  handleSignout: handleSignout
}