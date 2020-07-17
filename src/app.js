const express = require('express')
const { uuid, isUuid } = require('uuidv4')
const cors = require('cors')

// const { uuid } = require("uuidv4");

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (request, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body

  const like = 0

  const portfolio = {
    id    : uuid(),
    title : title,
    url   : url,
    techs : techs,
    likes : like,
  }

  repositories.push(portfolio)
  return response.json(portfolio)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const portfolioIndex = repositories.findIndex(
    (portfolio) => portfolio.id === id,
  )

  if (portfolioIndex < 0) {
    return response
      .status(400)
      .json({ error: 'Portfolio not Found!' })
  }

  const portfolio = {
    id,
    title,
    url,
    techs,
    likes : 0,
  }

  repositories[portfolioIndex] = portfolio

  return response.json(portfolio)
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params

  const portfolioIndex = repositories.findIndex(
    (portfolio) => portfolio.id === id,
  )

  if (portfolioIndex < 0) {
    return response
      .status(400)
      .json({ error: 'Portfolio not Found!' })
  }

  repositories.splice(portfolioIndex, 1)

  return response.status(204).send()
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  const portfolioIndex = repositories.findIndex(
    (portfolio) => portfolio.id === id,
  )

  if (portfolioIndex < 0) {
    return response
      .status(400)
      .json({ error: 'Portfolio not Found!' })
  }

  let likes = repositories[portfolioIndex].likes + 1

  repositories[portfolioIndex].likes = likes

  return response.json({ likes: likes, id: id })
})

module.exports = app
