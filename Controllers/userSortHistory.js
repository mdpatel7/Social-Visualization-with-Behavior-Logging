const handleUserSortHistory = (req, res, db) => {
	db.select('userid','activityname','count')
	.from('usersortbehavior')
	.then(usersortdata =>{
		res.json(usersortdata);
	})

}
module.exports = {
  handleUserSortHistory: handleUserSortHistory
}