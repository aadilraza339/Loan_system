var knex = require('./DB_connection')


let view_edit = ()=>{
    return  knex('register').select('*').where('user_id',3)
}

let edit_user = (edit, user_id)=>{
    return knex('register').update({"register.username":edit.username,"register.email":edit.email})
            .where('register.user_id',user_id)
}

let user_name = (user_id)=>{
    return knex('register').select('user_id',"username").where('user_id',user_id)
}

let having = (user_id)=>{
    return knex.select('*').from('loan_information').havingIn('user_id',user_id)
}

let request = (user_name,amount,insterest,total_amount,agent_id)=>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });  
    return knex('loan_information')
    .insert({"user_id":user_name,"states":"NEW","need_rs":amount,"insterest":insterest,"total_amount":total_amount,"agent_id":agent_id,"loan_date":nDate})
}

let edit_loan = (user_id,amount,insterest,total_amount,agent_id)=>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });  
    return knex('loan_information')
    .update({"states":"NEW","need_rs":amount,"insterest":insterest,"total_amount":total_amount,"agent_id":agent_id,"loan_date":nDate})
    .where('id',user_id)
}

let APPROVED = (states,user_id ) =>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      }); 
    return knex('loan_information').update({'states':states,"apporved_date":nDate})
    .where('id',user_id)
}

module.exports = {view_edit, edit_user, user_name,having ,request, edit_loan, APPROVED}