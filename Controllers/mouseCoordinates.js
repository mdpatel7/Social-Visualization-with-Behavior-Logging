// const handleMouseCoordinates = (req, res, db) =>{
// 	const user = req.params.token;
// 	const activity = req.params.event;
// 	const xCoordinate = req.params.coordinate_x;
// 	const yCoordinate = req.params.coordinate_y;
// 	updateDatabase(user,xCoordinate,yCoordinate,res,db);
// }
// const updateDatabase = (user,xCoordinate,yCoordinate,res,db) =>{
// 	db.transaction(trx => {
//   		trx.insert({
//     		userid: user,
//     		time: (new Date()).toString().replace('GMT-0700 (MST)',''),
//     		xcoordinate:xCoordinate,
//     		ycoordinate:yCoordinate
//   		})
//   		.into('mousedata')
//   		.then(trx.commit)
//   		.then(res.send({'success': true}))
//   		.catch(trx.rollback)
  
//   	})
// }
// module.exports = {
//   handleMouseCoordinates: handleMouseCoordinates
// }