import pkg from 'jsonwebtoken';
import dotenv from "dotenv";

const { sign, verify } = pkg;


dotenv.config();

export const GenerateToken = ({ data }) => {
    //make the key more harder
    //expires in should also be from .env file
    //good approach
    return sign({ result: data }, process.env.JWT_SECRET_KEY);
};

export const VerifyToken = (token) => {

    return verify(token, process.env.JWT_SECRET_KEY);
};

export const ValidateToken = ({ token, key }) => {
    return verify(token, key);
};



export const validateToken = async (req, res, next) => {

    console.log(process.env.JWT_SECRET_KEY, "====>> JWT SECRET KEY")
    let token;
    const { authorization } = req.headers;
    console.log(authorization, "===>>authorization")
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get Token from header
            token = authorization.split(' ')[1];
            console.log(token, "====>>token")
            // Verify Token
            const verification = verify(token, process.env.JWT_SECRET_KEY);
            const { result } = verify(token, process.env.JWT_SECRET_KEY);
            // Get User from Token
            console.log(verification, "====>>verification")
            req.user = result;
            next();
        } catch (error) {
            console.log(error, "===>>error")
            res.status(401).send({ status: 'failed', message: 'Unauthorized User' });
        }
    }
    if (!token) {
        res
            .status(401)
            .send({ status: 'failed', message: 'Unauthorized User, No Token' });
    }
};

export const checkToken = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get Token from header
            token = authorization.split(' ')[1];
            // Verify Token
            const { result } = verify(token, process.env.JWT_SECRET_KEY);
            // Get User from Token
            req.user = result;
            next();
        } catch (error) {
            res.status(401).send({ status: 'failed', message: 'Unauthorized User' });
        }
    }
    if (!token) {
        console.log('no login user');
        next();
    }
};
