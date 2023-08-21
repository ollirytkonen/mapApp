const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const Schema = mongoose.Schema

const markerSchema = new Schema({
  name:{ type: String,minlength: 3,required: true, },
  description:{ type: String,minlength: 3,required: true, },
  latitude:{ type: Number,minlength: 3,required: true, },
  longitude:{ type: Number,minlength: 3,required: true, },
})

markerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

markerSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Marker', markerSchema)