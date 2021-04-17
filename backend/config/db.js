import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect (process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`))
    } catch (error) {
        console.error(colors.red.underline.bold(`Error: ${error.message}`))
        process.exit(1)
    }
}

export default connectDB