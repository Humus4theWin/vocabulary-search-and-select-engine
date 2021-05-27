const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();
const port = 80;

// for development
const dev = true 
const useLocalFiles = false 

if(dev){
    app.use(cors());
    app.options('*', cors());
}

//app.use(express.json());  

// ** Endpoint definition **

// deliver Frontend
app.get('/', function(req, res){    
    res.sendFile('vue/main.html',{root: __dirname })
});

app.get('/vocabs', function(req, res){    // IoT Vocabs https://docs.proceed-labs.org/concepts/bpmn/bpmn-general-serialization/
    
    if(useLocalFiles)
        res.json(
            [
                "schemaorg-all-https.jsonld",
                "ontology.json"
            ]
        )
    else
        res.json(
            [
                "https://schema.org/version/latest/schemaorg-current-https.jsonld",          //application/ld+json
                "http://iot-ontologies.github.io/dogont/documentation/ontology.json",        //application/json;
                "https://dbpedia.org/ontology/",                                             //text/html; charset=UTF-8
            //    "http://qudt.org/vocab/quantitykind/",                                       //turtle
            ]
        )
});

// exprect body with key "url", return webpage
app.get('/proxy', function(req, res){
   let url = req.headers.url
    axios.get(url)
    .then(
        proxyResponse =>  {
            res.set('content-type', proxyResponse.headers['content-type']);
            res.send(proxyResponse.data)
        }
    ).catch(err => res.send(err))
});

// verse vocabs locally for testing
app.use('/', express.static(__dirname + '/public'));

// start Server
app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`)
})