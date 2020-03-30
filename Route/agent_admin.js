var query = require('../Model/view_edit')
module.exports = (app,jwt,LoanJS)=>{
    app.get('/view/user',(req,res)=>{
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        jwt.verify(token, 'secret', (err,user_detail)=>{
            if(!err){
                var role_name =(user_detail.token[0].role_name)
                if (role_name == "admin" || role_name=="agent"){
                    query.view_edit()
                    .then((user_detail)=>{
                        res.send(user_detail)
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                }
                else{
                    res.send('you are not admin or not agent')
                }
                
            }
            else{
                res.send({"message":err.message})
            }
        })
    })

    app.post('/user_edit/:user_id',(req,res)=>{
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        var edit_detail = req.body
        var user_id = req.params.user_id    
        jwt.verify(token, 'secret', (err,user_detail)=>{
            if(!err){
                var role_name =(user_detail.token[0].role_name)
                if (role_name == "admin" || role_name=="agent"){
                    query.edit_user(edit_detail, user_id)
                    .then(()=>{
                        res.send("edit update")
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                }
                else{
                    res.send('you are not admin or not agent')
                }
                
            }
            else{
                res.send({"message":err.message})
            }
        })
    })

    app.post('/user_agent/:user_id',(req,res)=>{
        var user_id = req.params.user_id
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        jwt.verify(token, 'secret', (err,user_detail)=>{
            if(!err){
                if(user_detail.token[0].role_name=="agent"){
                    var agent_id = (user_detail.token[0].user_id)
                    query.user_name(user_id)
                    .then((name)=>{
                        if(3<name[0].user_id){
                            var loan = new LoanJS.Loan(
                                10000, // amount
                                12,   // installments number
                                5,    // interest rate
                                true  // diminidoneshin 
                                );
                        var amount = loan.amount
                        var interest = loan.interestSum
                        var total = loan.sum
                        query.request(user_id,amount,interest,total,agent_id)
                        .then(()=>{
                            res.json('request succuse')
                        })
                        .catch((err)=>{
                            res.send(err)
                        })
     
                        }
                        else{
                            res.send("please enter user id..")
                        }
                    })
                    .catch((err)=>{
                        res.send(err)
                        })
                }
                else{
                    res.send('your are not agent')
                }  
            }
            else{
                res.send(err)
            }
        })
    })


    app.post('/EditLoan/:id',(req,res)=>{
        var user_id = req.body.user_id
        var id = req.params.id
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        jwt.verify(token, 'secret', (err,user_detail)=>{
            if(!err){
                query.having(user_id)
                .then((user)=>{
                    if (user.length==0){
                        res.send('for edit data nothing is here')
                    }
                    else{
                        if (user[0].states=='NEW'){
                            var agent_id = (user_detail.token[0].user_id) 
                            query.user_name(user_id)
                            .then((name)=>{
                                if(3<name[0].user_id){
                                    var loan = new LoanJS.Loan(
                                        10020, // amount
                                        12,   // installments number
                                        5,    // interest rate
                                        true  // diminidoneshin
                                      );
                                    var amount = loan.amount
                                    var interest = loan.interestSum
                                    var total = loan.sum
                                    query.edit_loan(id,amount,interest,total,agent_id)
                                    .then(()=>{
                                        res.json('updated')
                                    })
                                    .catch((err)=>{
                                        res.send(err)
                                    })
                                    
                                }
                                else{
                                    res.send("please enter user id..")
                                }
                            })

                        }
                    }
                    
                })
                .catch((err)=>{
                    res.send(err)
                })
                
            }
            else{
                res.send(err)
            }
        })
    })

    app.post('/APPROVED/:id',(req,res)=>{
        var id = req.params.id
        var states = req.body.states
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        jwt.verify(token, 'secret', (err,user_detail)=>{
            if(!err){
                var name = (user_detail.token[0].role_name)
                if (name == 'admin'){
                    query.APPROVED(states,id)
                    .then(()=>{
                        res.send('states update')
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                }
                else{
                    res.send('you are not a admin you can not apporve')
                }  
            }
            else{
                res.send(err)
            }
          
        })
    })

}
