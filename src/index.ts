import app from './app'
import { connectDB } from "./db";

async function main () {
  connectDB()
  await app.listen(app.get('port'))
  console.log(`server running on port ${app.get('port')}`)
}
main()