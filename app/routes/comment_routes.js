const express = require('express')
// const passport = require('passport')
const Comment = require('../models/comment')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
// const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
router.get('/comments', (req, res, next) => {
  Comment.find()
    .then(comments => {
      return comments.map(comment => comment.toObject())
    })
    .then(comments => res.status(200).json({ comment: comments }))
    .catch(next)
})

// SHOW
router.get('/comments/:id', (req, res, next) => {
  Comment.findById(req.params.id)
    .then(handle404)
    .then(comment => res.status(200).json({ comment: comment.toObject() }))
    .catch(next)
})

// CREATE
router.post('/comments', (req, res, next) => {
  // req.body.example.owner = req.user.id
  Comment.create(req.body.comment)
    .then(comment => {
      res.status(201).json({ comment: comment.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/comments/:id', removeBlanks, (req, res, next) => {
  Comment.findById(req.params.id)
    .then(handle404)
    .then(comment => {
      // requireOwnership(req, example)
      return comment.update(req.body.comment)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/comments/:id', (req, res, next) => {
  Comment.findById(req.params.id)
    .then(handle404)
    .then(comment => {
      // requireOwnership(req, example)
      comment.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
