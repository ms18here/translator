const express = require('express');
const translate = require('google-translate-api');
const app = express();
const SearchResult = require('./models/searchResult');
const { v4: uuidv4 } = require('uuid');
var mongoose = require('mongoose');
// Example : http://localhost/translate?text=Hello&from=en&to=ko
app.get('/translate', (req, res) => {
    const text = req.query.text;
    const from = req.query.from;
    const to = req.query.to;
    console.log(text);
    SearchResult.findOne({text:text})
        .then(savedResult=>{
            if(!savedResult){
                const uuid = uuidv4();
                let langAry =['en','ko','js','es',to];
                let wordObj= {"en":null,"ko":null,"ja":null,"es":null};
                wordObj[to] = null; 
                for (var i = 0; i < langAry.length; i++){
                    let item = langAry[i];
                    translate(text, {from: from, to: langAry[i]})
                    .then(res => {
                        wordobj[item] ="'" + res.text + "'";
                    }).catch(err =>{
                        console.error (err);
                    });
                }
                const searchRes =new SearchResult({
                    text,
                    from,
                    to,
                    result:JSON.stringify(wordobj),
                    uuid
                })
                searchRes.save()
                .then(res=>{
                    res.send(wordobj[to]);
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                let data = JSON.parse(savedResult.result);
                res.send(data[to]);
            }
        })
        .catch(err=>
            {
                console.log(err)
            })
    
    
});

app.listen(80,() => {
	console.log("server starting on port : 80 ")
});