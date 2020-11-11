import { connect } from "mongoose";

export async function connectDB() {
  await connect('mongodb://localhost/mean_img', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  console.log('db is connected..!')
}
