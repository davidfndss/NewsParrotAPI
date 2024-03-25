// for Database I am using Mongo DB Atlas
import mongoose from "mongoose"
const uri = process.env.DB_URI
 
const connectDatabase = () => {
  console.log("Conectando com o banco de dados, aguarde...")
  
  mongoose.connect(uri)
    .then(() => {
    console.log("conectado ao MongoDB Atlas com sucesso!")
    })
    .catch(err => {
    console.error(err)
    })
}

export default connectDatabase 