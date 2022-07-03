import mongoose from 'mongoose'
import { DATABASE_URL } from '../utils/commons'

if (!DATABASE_URL) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local'
  )
}

async function dbConnect() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  }

  const connect = await mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
    console.log('Mongoose connection estabilished')
    return mongoose
  }).catch((error) => console.error('error connecting to mongoose'));
  return connect
}

export default dbConnect
