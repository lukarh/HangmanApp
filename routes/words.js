const express = require('express')

const router = express.Router()

// path name runs from top to bottom

router.get("/", (req, res) => {
  res.send('Word List')
})

router.get("/indices", (req, res) => {
  res.send('Word List Indices')
})

router.post("/", (req, res) => {
  res.send('Add Word')
})

/*router.get("/:id", (req, res) => {
  res.send(`Get Word With ID ${req.params.id}`)
})

router.put("/:id", (req, res) => {
  res.send(`Update Word With ID ${req.params.id}`)
})

router.delete("/:id", (req, res) => {
  res.send(`Delete Word With ID ${req.params.id}`)
})*/

router.
  route("/:id")
  .get((req, res) => {
    res.send(`Get Word With ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update Word With ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete Word With ID ${req.params.id}`)
  })

router.param("id", (req, res, next, id) => {
  console.log(id)
})

module.exports = router