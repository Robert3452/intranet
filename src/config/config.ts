export default {
    jwtSecret: process.env.JWT_SECRET || "somesecretkey",
    DB: {
        URI: process.env.MONGO_URI || "mongodb://localhost/intranet",
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGODB_PASSSWORD
    }
}