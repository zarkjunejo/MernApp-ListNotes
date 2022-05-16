const jwt = require('jsonwebtoken');
const JWT_SECRET = "harry";

const fetchusers = (req, res, next) => {
    //get the user from  the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "PLease " })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        // console.log(data);
        next();
    } catch (error) {

        console.error(error.message);
        res.status(401).send({ error: "PLease authenticate token" })
    }

}



module.exports = fetchusers;