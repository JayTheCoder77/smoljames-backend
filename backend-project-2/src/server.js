import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 5000

// get file path from url of current module
const __filename = fileURLToPath(import.meta.url)
// get directory name from file path
const __dirname = dirname(__filename)


// middleware
app.use(express.json())
// serves html file from /public directory
// tells express to serve all files from public folder as static assets/ file any requests for the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname,'../public')))

// serving up the html file from /public directory
app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))
}) 

app.listen(PORT , () => {
    console.log(`server started on PORT : ${PORT}`);
})

