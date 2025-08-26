const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
console.log(password)
//Для тестов сменил название бд на testNote для работы с основной базой меняй на appNote
const url = `mongodb+srv://marat_pokrovsky:${password}@cluster0.2sveoxf.mongodb.net/testNote?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })
const note = new Note({
  content: 'CSS is beautiful',
  important: true,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})
