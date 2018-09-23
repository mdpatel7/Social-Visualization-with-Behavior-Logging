const handleDataToBeVisualizedOnClick = (req, res, db) => {
	const{activityname} = req.body;
	if(activityname === 'copyText'){
		db('visualizedactivities')
		.where('activityname', '=', activityname)
		.then(activityData =>{
			res.json(activityData);
		})
	}
	else if(activityname === 'askQuestion'){
		db('visualizedactivities')
		.where('activityname', '=', activityname)
		.then(activityData =>{
			res.json(activityData);
		})
	}else if(activityname === 'scroll'){
		db('visualizedactivities')
		.where('activityname', '=', activityname)
		.then(activityData =>{
			res.json(activityData);
		})
	}
}
module.exports = {
  handleDataToBeVisualizedOnClick: handleDataToBeVisualizedOnClick
}