const handleSearchHistory = (req, res, db) => {
	const{email} = req.body;
	db('search')
	.where('userid','=', email)
	.then(searchHistoryData =>{
		res.json(searchHistoryData);
	})
}
module.exports = {
  handleSearchHistory: handleSearchHistory
}