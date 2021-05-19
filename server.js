const express = require('express');
const cors = require('cors');
const axios = require('axios')



const app = express();
const port = 80;

const dev = true // disble for production

if(dev){
    app.use(cors());
    app.options('*', cors());
}

app.use(express.json());  

// ** Endpoint definition **

// deliver Frontend
app.get('/', function(req, res){    
    res.sendFile('vue/main.html',{root: __dirname })
});

app.get('/vocabs', function(req, res){    
    res.send(
        [
            "https://schema.org/version/latest/schemaorg-current-https.jsonld",

        ]
    )
});

// exprect json with key "url", return webpage
app.put('/proxy', function(req, res){
   let url = req.body['url']
    console.log(url)
    axios.get(url)
    .then(
        proxyResponse =>  res.send(proxyResponse.data)
    ).catch(err => res.send(err))
});


// start Server
app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`)
})