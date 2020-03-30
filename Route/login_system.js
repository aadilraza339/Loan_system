var query =  require('../Model/login_query')
module.exports = (app, hashing, jwt)=>{
    app.post('/register',(req,res)=>{
        var user_detail = req.body
        var hashedPassword =hashing.generate("harshita");
        query.create_account(user_detail,hashedPassword)
        .then(()=>{
            res.send('created accound')
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    app.post('/login',(req,res)=>{
        var user_detail = req.body.email       
        var user_password = req.body.password  
        query.login_account(user_detail)
        .then((data)=>{
            if (data.length!=0){ 
                var hashedPassword = (data[0].password)
                var verify = hashing.verify(user_password,hashedPassword)
                if (verify == true){
                    var user_id = data[0].user_id
                    query.get_role(user_id)
                    .then((user_role)=>{
                       var token =  jwt.sign({
                            "token": user_role
                          }, 'secret', { expiresIn: 60 * 60 });
                          res.cookie(token)
                          res.send('login')
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                }
                else{
                    res.send('wrong password')
                }
            }
            else{
                res.send('invalid email')
            }
        })
    })   

}