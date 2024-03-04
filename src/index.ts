import express from "express"
import { getImage } from "./images"

import { authorize } from "./authorize"

const app = express()
const PORT = 8123

app.get("/cat/:catName", authorize, async (req, res) => {
  const catUrl = await getImage(req.params.catName)
  if (!catUrl) {
    return res.status(404)
  }

  return res.status(301).redirect(catUrl)
})

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`)
})
