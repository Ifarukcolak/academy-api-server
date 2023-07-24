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

app.get('/:id', (req, res, next) => {
    let result = sampleList.find(x => Number(x.id) === Number(req.params.id));
    res.json(result);
});

app.post('/', (req, res, next) => {
    let element = req.body;

    if (element.firstName && element.lastName && element.age) {
        const length = sampleList.length;

        element.id = length + 1;
        sampleList.push(element);
        user.create(element).then(data=>{
            res.json(data);
           
        }).catch(error=>{
            res.json(error);
            
        })
       // res.json({ 'message': 'Eleman eklendi.', 'id': element.id });
    } else {
        res.json({ 'message': 'Eleman kısıtlara uygun değil.' });
    }
});

app.post('/multiple', (req, res, next) => {
    const elements = req.body;

    if (Array.isArray(elements) && elements.length > 0) {
        const addedElements = [];

        elements.forEach((element, index) => {
            if (element.firstName && element.lastName && element.age) {
                const length = sampleList.length;

                const newElement = {
                    id: length + 1,
                    firstName: element.firstName,
                    lastName: element.lastName,
                    age: element.age
                };

                sampleList.push(newElement);//düzenledikçe sil 
                addedElements.push(newElement);
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


app.put('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    let result = sampleList.find(x => x.id === id);

    if (result) {
        sampleList.forEach(x => {
            if (x.id === id) {
                x.firstName = req.body.firstName;
                x.lastName = req.body.lastName;
                x.age = req.body.age;
            }
        });

        res.json({ 'message': 'Eleman güncellendi', 'id': id });
    } else {
        res.json({ 'message': 'Eleman bulunamadı!' });
    }
})

app.delete('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const index = sampleList.findIndex(x => x.id === id);

    if (index > -1) {
        sampleList.splice(index, 1);
        res.json({ 'message': 'Eleman silindi!', id });
    } else {
        res.json({ 'message': 'Eleman bulunamadı!' });
    }


});

app.listen(process.env.PORT || 3000, () => { console.log("Port dinleniyorr") });
