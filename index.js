import express, { json } from "express"

const app = express()

app.use(express.json())

app.get("/",(req, res)=> {
  res.send("Hello")
})
app.post("/auth/login",(req, res)=> {
  console.log(req.body)
  res.json({
    "success": true
  })
})

app.listen(8000, (err)=>{
  if (err) {
    console.log("Server error")
  }
  console.log("Server is running!")
})