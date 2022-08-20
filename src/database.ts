import mongoose from 'mongoose'

async function connectdb() {
  await mongoose.connect(
    process.env.DATABASE_URL!,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      return console.log('Database connected')
    }
  )
}

export default { connectdb }
