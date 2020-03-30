var knex = require('./DB_connection')


// knex.schema.hasTable('users_role').then(function (exists) {
//     if (!exists){
//         return knex.schema.createTable('users_role', (table) => {
//             table.increments('role_id')
//             table.string('role_name')
//         })
//         }
//         else {
//             console.log('allready users_role table created !');
//         }
//     })

   

knex.schema.hasTable('register').then(function (exists) {
    if (!exists){
        return knex.schema.createTable('register', (table) => {
            table.increments('user_id')
            table.string('username')
            table.string('email')
            table.unique('email')
            table.string('password')
            table.integer('user_role').unsigned()
            table.foreign('user_role').references('users_role.role_id')
        })
        }
        else {
            console.log('allready register table created !');
        }
    })
   

knex.schema.hasTable('loan_information').then(function(exists){
    if(!exists){
        return knex.schema.createTable('loan_information',(table)=>{
            table.increments('id')
            table.string('user_id')
            table.string('states')
            table.string('need_rs')
            table.string('insterest')
            table.string('total_amount')
            table.string('agent_id')
            table.string('loan_date')
            table.string('apporved_date')
        })
    }
    else {
        console.log('allready loan information table created !');
    }
})