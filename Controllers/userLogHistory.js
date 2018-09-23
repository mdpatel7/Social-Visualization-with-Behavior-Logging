const handleUserLogHistory = (req, res, db) => {
	const{email} = req.body;
	db('userloghistory')
	.where('email','=', email)
	.then(userlogdata =>{
		res.json(userlogdata);
	})
}
module.exports = {
  handleUserLogHistory: handleUserLogHistory
}