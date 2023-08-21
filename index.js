require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const Marker = require('./models/marker')
app.use(express.json())
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors())
app.get('/api/markers', (_request, response) => {
    Marker.find({}).then(markers => {
      response.json(markers)
    })
  })

app.get('/api/markers/:id', (request, response, next) => {
    Marker.findById(request.params.id)
      .then(marker => {
        if(marker) {
          response.json(marker)
        }else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
app.post('/api/markers', (request, response, next) => {
    const body = request.body
    const marker = new Marker({
      name: body.name,
      description: body.description,
      latitude: body.latitude,
      longitude: body.longitude,
    })
    marker.save().then(marker => {
      response.json(marker)
    })
      .catch(error => next(error))
  })
  app.put('/api/markers/:id', (request, response, next) => {
    const body = request.body
    const marker = {
        name: body.name,
        description: body.description,
        latitude: body.latitude,
        longitude: body.longitude
    }
  
    Marker.findByIdAndUpdate(request.params.id, marker, { new: true })
      .then(updatedMarker=> {
        response.json(updatedMarker)
      })
      .catch(error => next(error))
  })
  
  app.delete('/api/markers/:id', (request, response, next) => {
    Marker.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })