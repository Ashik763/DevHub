// console.log(process.env.SECRET_OR_KEY);
module.exports ={
    mongoURI :`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.he6kc5b.mongodb.net/`,
    secretOrKey: `${process.env.SECRET_OR_KEY}`
};