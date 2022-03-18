import jwt from 'jsonwebtoken';

const decode = (token) => {
    const key = process.env.JWT_SECRET || 'mysecret';
    const split = token.split(" ")[1];
    const decoded = jwt.verify(split, key, (err, decoded) => {
        if(err){
            console.log(err);
            return err;
        }
        else{
            return decoded;
        }
    });
}

export default decode;