const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken : (req,res,next)=>{
        let token = req.get('authorization');
        if(token){
            token = token.slice(7);
            verify(token,process.env.JWT_SecretKEY,(err, decoded) => {
                if(err){
                    res.json({
                        success:0,
                        message:"Invalid Token"
                    });
                }else{
                    next();
                }
            });
        } else{
            res.json({
                success:0,
                message:"Access Denied! Unauthorized User"
            });
        }
    }
};