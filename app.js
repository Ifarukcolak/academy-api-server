// es5 vs es6
const express = require('express');
const app = express();

let sampleList = [
    { 'id': 1, 'firstName': 'John', 'lastName': 'Doe', 'age': 20 },
    { 'id': 2, 'firstName': 'Faruk', 'lastName': 'Çolak', 'age': 20 },
    { 'id': 3, 'firstName': 'John', 'lastName': 'Doe', 'age': 20 },
    { 'id': 4, 'firstName': 'John', 'lastName': 'Doe', 'age': 20 },
    { 'id': 5, 'firstName': 'Faruk', 'lastName': 'Çolak', 'age': 20 },
    { 'id': 6, 'firstName': 'John', 'lastName': 'Doe', 'age': 20 },
    { 'id': 7, 'firstName': 'John', 'lastName': 'Doe', 'age': 20 },
    { 'id': 8, 'firstName': 'Faruk', 'lastName': 'Çolak', 'age': 20 },
    { 'id': 9, 'firstName': 'John', 'lastName': 'Doe', 'age': 20 },
];

app.get('/', (req, res, next) => {
    res.json(sampleList);
});

app.post('/', (req, res, next) => {
    let element = req.body;

    if (element.firstName && element.lastName && element.age) {
        const length = sampleList.length;

        element.id = length + 1;
        sampleList.push(element);
        res.json({ 'message': 'Eleman eklendi.' });
    } else {
        res.json({ 'message': 'Eleman kısıtlara uygun değil.' });
    }
});

app.put('/:id', (req, res, next) => {
    const id = req.params.id;
    let result = sampleList.find(x => x.id === id);

    if (result) {
        sampleList.forEach(x => {
            if (x.id === id) {
                x = req.body;
            }
        });

        res.json({ 'message': 'Eleman güncellendi' });
    } else {
        res.json({ 'message': 'Eleman bulunamadı!' });
    }
})

app.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const index = sampleList.findIndex(x => x.id === id);

    if (index > -1) {
        sampleList.splice(index, 1);
        res.json({ 'message': 'Eleman silindi!' });
    } else {
        res.json({ 'message': 'Eleman bulunamadı!' });
    }


});

app.listen(process.env.PORT || 5000);
