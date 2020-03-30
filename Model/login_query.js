var knex = require('./DB_connection')

let create_account = (detail,password)=>{
    return knex('register').insert({'username':detail.username, 'email':detail.email, 'password':password, 'user_role':3})
}

let login_account = (detail)=>{
    return knex.select('*').from('register').havingIn('email',detail)
}
   
let get_role = (role_id) =>{
    return knex('register').select('users_role.role_name',"register.user_id")
    .join('users_role','users_role.role_id','=','register.user_role')
        .where('register.user_id',role_id)
}

module.exports={create_account, login_account, get_role}