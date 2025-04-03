// url = http://localhost:8383
// ip = 127.0.0.1:8383
const express = require('express')
const app = express()
const PORT = 8383

let data = ['jay']

// middle ware
app.use(express.json())

// endpoint -  HTTP verbs  and routes (or paths)
// method informs the nature of request and route is further subdirectory ( basically we direct request of the body of code to respond apropriately and these locations of routes are endpoints )



// website endpoints - sending back html and they typically come when user enters url in browser
app.get('/',(req,res)=> {
    // endpoint number 1 - /
    // console.log('yayy i hit an endpoint',req.method);
    // res.sendStatus(201)

    // send a website
    res.send(
           ` <body style = "background:pink ; color: blue">
                <h1>DATA : </h1>
                <p>${JSON.stringify(data)}</p>
                <a href = "/dashboard">Dashboard</a>
            </body>`
        )
})

app.get('/dashboard',(req,res) => {
    console.log('dashboard hit boiiiiiii');
    res.send(
        `<body style = "background:pink ; color: blue">
                <h1>Dashboard : </h1>
                <p>${JSON.stringify(data)}</p>
                <a href = "/">Home</a>
        </body>
        <script>
        console.log('this is my script')
        </script>
        `
    )
    
})

// api endpoints non visual


// crud - method
// create - post 
// read - get  
// update - put
// delete - delete

app.get('/api/data' , (req,res) => {
    console.log('this one was for data');
    res.status(201).send(data)
    
})

app.post('/api/data' , (req,res) => {
    // someone wants to create a user eg -  sign up button
    // user clicks sign up button after entering credentials and their browser is wired up to send out a network request to the server to handle that action
    const newEntry = req.body
    console.log(newEntry);
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req,res) => {
    data.pop()
    console.log('removed entry from end of array');
    res.sendStatus(203)
})

app.listen(PORT , () => {
    console.log(`server has started on ${PORT}`);
})
