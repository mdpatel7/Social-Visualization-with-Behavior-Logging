const handleActivityLog = (req, res, db) =>{
  const searchString = req.params.searchString;
  const user = req.params.token;
  const activity = req.params.event;
  if(activity === 'ScrolledToBottom'){
    updateDatabase('visualizedactivities', db, user, 'scroll',res);
  }else if(activity === 'Ask_Question_Button_Clicked'){
    updateDatabase('visualizedactivities', db, user, 'askQuestion',res);
  }else if(activity === 'Text_Copied'){
    updateDatabase('visualizedactivities', db, user, 'copyText',res);
  }else if(activity === 'Search_submit_button_clicked'){
    searchHistoryDatabase('search', db, user, activity, res, searchString);
  }else{
    updateDatabase('usersortbehavior',db,user,activity,res);
  }
}
const updateDatabase = (table, db, user,activity ,res) =>{
  db.select('userid')
  .from(table)
  .where('userid' , '=', user)
  .andWhere('activityname','=',activity)
  .then(userData =>{
    if(!(userData.length === 0)){
      db(table)
      .where('userid', '=', user)
      .andWhere('activityname','=',activity)
      .increment('count',1)
      .then(user =>{
        res.json(user);
      })
    }else{
      db.transaction(trx => {
      trx.insert({
        userid: user,
        activityname: activity,
        activitytime: (new Date()).toString().replace('GMT-0700 (MST)',''),
        count:1
      })
      .into(table)
      .then(trx.commit)
      .catch(trx.rollback)
      })
    }
  })
}
const searchHistoryDatabase = (table, db, user,activity ,res, searchString) =>{
  db.transaction(trx => {
  trx.insert({
    userid: user,
    activitytime: (new Date()).toString().replace('GMT-0700 (MST)',''),
    searchhistory:searchString
  })
  .into(table)
  .then(trx.commit)
  .then(res.send({'success': true}))
  .catch(trx.rollback)
  
  })
}
module.exports = {
  handleActivityLog: handleActivityLog
}