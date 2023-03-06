const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 5000
const cors =require('cors')

app.use(cors())

app.use(express.json())

// const db = new sqlite.Database('Data.db', (err) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log("OK")
//     }
// })

// app.get('/', (req, res) => {
//     db.all('SELECT * FROM book', [], (err, x) => {
//         res.send(x)
//     })
// })

// app.get('/book/:id', (req, res) => {
//     const id = req.params.id
//     db.get('SELECT * FROM book WHERE id=?', [id], (err, x) => {
//         res.send(x)
//     })
   
// })



const db = new sqlite.Database('dat.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM data', [], (err, x) => {
        res.send(x)
    })
})

app.get('/data/:id', (req, res) => {
    const id = req.params.id
    db.get('SELECT * FROM data WHERE id=?', [id], (err, x) => {
        res.send(x)
    })
   
})

app.post('/', (req,res) => {
    
    const img = req.body.img
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    console.log(name)

    db.run('INSERT INTO data (name,img,price,description) values (?,?,?,?)', [name,img,price,description],(err) => {
        res.send("OOKKK")
    })
})

app.put('/chang/:id',(req,res)=>{
    const id = req.params.id;
    const name=req.body.name;
    const img=req.body.img;
    const price=req.body.price;
    const description=req.body.description;

    db.run('UPDATE data SET name=?, img=?, price=?, description=? WHERE id=?',[name,img,price,description,id],(e)=>{
        res.send('OKKK')
    })
})

app.delete('/delete/:id', (req,res) => {
    
    const data_id = req.params.id

    db.run('DELETE FROM data WHERE id=?', [data_id],(e)=>{
        res.send("ok")
    })
})
app.listen(port)