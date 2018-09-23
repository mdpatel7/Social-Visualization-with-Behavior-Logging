const handleDataToBeVisualized = (req, res, db) => {
	const{email} = req.body;
	db('visualizedactivities')
	.where('userid','=', email)
	.then(activityData =>{
		res.json(activityData);
	})
}
module.exports = {
  handleDataToBeVisualized: handleDataToBeVisualized
}