// es5 vs es6
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const user=require("./user");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

let sampleList = [
    { 'id': 1, 'firstName': 'John', 'lastName': 'Doe', 'age': 20 },
    { 'id': 2, 'firstName': 'Faruk', 'lastName': 'Çolak', 'age': 25 },
    { 'id': 3, 'firstName': 'John', 'lastName': 'Doe', 'age': 28 },
    { 'id': 4, 'firstName': 'John', 'lastName': 'Doe', 'age': 27 },
    { 'id': 5, 'firstName': 'Faruk', 'lastName': 'Çolak', 'age': 32 },
    { 'id': 6, 'firstName': 'John', 'lastName': 'Doe', 'age': 45 },
    { 'id': 7, 'firstName': 'John', 'lastName': 'Doe', 'age': 54 },
    { 'id': 8, 'firstName': 'Faruk', 'lastName': 'Çolak', 'age': 38 },
    { 'id': 9, 'firstName': 'John', 'lastName': 'Doe', 'age': 12 },
];



app.get('/', async(req, res, next) => {
    await user.sync();
    res.json(await user.findAll());
});

app.get('/byFilter', (req, res, next) => {
    const ageLimit = Number(req.headers.age);
    const firstName = req.headers.firstname; 
    const lastName = req.headers.lastname; 
    
    let filteredList = sampleList.filter(x => x.age < ageLimit);
    
    if (firstName) { filteredList = filteredList.filter(x => x.firstName === firstName); }
    if (lastName) { filteredList = filteredList.filter(x => x.lastName === lastName); } 
    
    res.json({ filteredList });
 
});
//get by id
app.get('/:id', (req, res, next) => {
    let result = sampleList.find(x => Number(x.id) === Number(req.params.id));
    res.json(result);
     user.get(element).then(data=>{
         res.json(data);
       
     }).catch(error=>{
        res.json(error);
        
     })
});

app.post('/', (req, res, next) => {
    let element = req.body;

    if (element.firstName && element.lastName && element.age) {
        const length = sampleList.length; //Dizinin uzunluğunu alıyor

        element.id = length + 1; // Diziye yeni eleman eklendiği zaman eleman sayısını bir artırıyor
        sampleList.push(element);
         user.create(element).then(data=>{ //user.create veritabanına elemanı kaydeder
             
             res.json({ 'message': 'Eleman eklendi.', 'id': data.id }); //Eleman eklenirse verilecek mesaj
             
           
         }).catch(error=>{
             res.json(error);
            
         })
      
    } else {
        res.json({ 'message': 'Eleman kısıtlara uygun değil.' });//Eleman eklenmezse verilecek mesaj
    }
});

app.post('/multiple', (req, res, next) => { //Birden fazla post işlemi yapmak için kullanılan method
    const elements = req.body;

    if (Array.isArray(elements) && elements.length > 0) { 
        const addedElements = [];

        elements.forEach((element, index) => { //promise.all burdan itibaren düzenle // async işlemler bak //winston nedir kodda nerde kullanırız bak uygulamasını dene
            if (element.firstName && element.lastName && element.age) {
                const length = sampleList.length;

                const newElement = {
                    id: length + 1,
                    firstName: element.firstName,
                    lastName: element.lastName,
                    age: element.age
                };
                sampleList.push(element);
                user.create(data).then(data=>{ //user.create veritabanına elemanı kaydeder
                    res.json(data);
                  
                }).catch(error=>{
                    res.json(error);
                   
                })
               
            }
        });

        if (addedElements.length > 0) {
            res.json({ 'message': 'Elemanlar eklendi.', addedElements });
        } else {
            res.json({ 'message': 'Hiçbir eleman kısıtlara uygun değil.' });
        }
    } else {
        res.json({ 'message': 'Geçersiz veri formatı veya boş liste.' });
    }
});


app.put('/:id', async (req, res, next) => {
    const id = Number(req.params.id);
    let result = await user.findOne({where :{id:id}});
   

    if (result) {
      
           result.update(req.body).then(data=>{
            res.json({ 'message': 'Eleman güncellendi', 'id': id });
            
           }).catch(error=>{res.json({error})})
      
    } else {
        res.json({ 'message': 'Eleman bulunamadı!' });
    }
})

app.delete('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    user.destroy({where :{id:id}}).then(data=>{
        res.json(data);
       
    }).catch(error=>{
        res.json(error);
        
    })




});

app.listen(process.env.PORT || 3000, () => { console.log("Port dinleniyorr") });
