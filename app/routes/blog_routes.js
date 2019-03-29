const express = require('express')
const passport = require('passport')
const Blog = require('../models/blog')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const Comment = require('../models/comment')

// INDEX
router.get('/blogs', (req, res, next) => {
  Blog.find().populate('comments')
    .then(blogs => {
      return blogs.map(blog => blog.toObject())
    })
    .then(blogs => res.status(200).json({ blog: blogs }))
    .catch(next)
})

// SHOW
router.get('/blogs/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(handle404)
    .then(blog => res.status(200).json({ blog: blog.toObject() }))
    .catch(next)
})

// CREATE
router.post('/blogs', requireToken, (req, res, next) => {
  req.body.blog.owner = req.user.id
  Blog.create(req.body.blog)
    .then(blog => {
      res.status(201).json({ blog: blog.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/blogs/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.blog.owner
  Blog.findById(req.params.id)
    .then(handle404)
    .then(blog => {
      requireOwnership(req, blog)
      return blog.update(req.body.blog)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/blogs/:id', requireToken, (req, res, next) => {
  Blog.findById(req.params.id)
    .then(handle404)
    .then(blog => {
      requireOwnership(req, blog)
      const id = blog
      Comment.deleteMany({blog: id}, (err, res) => { if (err) throw err })
      blog.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
