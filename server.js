const express = require('express')
const mongoose = require('mongoose')
const Category = require('./categorySchema')

var app = express()
var Defect = require('./defectSchema')

mongoose.connect('mongodb://localhost/omtrak', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.once('open', () => {
    console.log('connected to DB!')
}).on('error', (err) => {
    console.log('Failed to connect DB!')
    console.log(err)
})

const port = 8082
const host = '192.168.1.167'

var server = app.listen(port, host, () => {
    console.log('Server is running at http://' + host + ':' + port)
})

// Fetch All Categories
app.get('/categories', (req, res) => {
    Category.find({}, (err) => {
        if (err) {
            console.log('Failed to fetch all categories!')
            console.log(err)
        }
    }).then((categories) => {
        console.log('Fetched ' + categories.length + ' categories!')
        res.send(categories)
    })
})

// Fetch a Category
// TODO: fetch single category

// Create a Category
app.post('/category', (req, res) => {
    var category = new Category({
        name: req.get('name'),
        code: req.get('code'),
        description: req.get('description')
    })

    category.save().then(() => {
        if (category.isNew == false) {
            console.log('Category Saved!')
            res.send('Category Saved!')
        } else {
            console.log('Failed to save the category')
        }
    })
})

// Update a Category
app.patch('/category', (req, res) => {
    Category.findOneAndUpdate({
        _id: req.get('id')
    }, {
        name: req.get('name'),
        code: req.get('code'),
        description: req.get('description')
    }, (err) => {
        if (err) {
            console.log('Failed to update the category-' + req.get('id') + '!')
            console.log(err)
        }

    }).then(() => {
        console.log('Category-' + req.get('id') + ' Updated!')
        res.send('Category-' + req.get('id') + ' Updated!')
    })
})

// Delete a Category
app.delete('/category', (req, res) => {
    Category.findOneAndRemove({
        _id: req.get('id')
    }, (err) => {
        if (err) {
            console.log('Failed to delete the category-' + req.get('id') + '!')
            console.log(err)
        }

    }).then(() => {
        console.log('Category-' + req.get('id') + ' Deleted!')
        res.send('Category-' + req.get('id') + ' Deleted!')
    })
})

// Fetch All Defects
app.get('/defects', (req, res) => {
    Defect.find({}, (err) => {
        if (err) {
            console.log('Failed to fetch all defects!')
            console.log(err)
        }
    }).then((defects) => {
        console.log('Fetched ' + defects.length + ' defects!')
        res.send(defects)
    })
})

// Fetch a Defect
// TODO: fetch single defect

// Create a Defect
app.post('/defect', (req, res) => {
    var defect = new Defect({
        title: req.get('title'),
        description: req.get('description'),
        category: {
            name: req.get('categoryName'),
            code: req.get('categoryCode')
        }
    })

    defect.save().then(() => {
        if (defect.isNew == false) {
            console.log('Defect Saved!')
            res.send('Defect Saved!')
        } else {
            console.log('Failed to save the defect')
        }
    })
})

// Update a Defect
app.patch('/defect', (req, res) => {
    Defect.findOneAndUpdate({
        _id: req.get('id')
    }, {
        title: req.get('title'),
        description: req.get('description'),
        date: new Date(),
        category: {
            name: req.get('categoryName'),
            code: req.get('categoryCode')
        }
    }, (err) => {
        if (err) {
            console.log('Failed to update the defect-' + req.get('id') + '!')
            console.log(err)
        }

    }).then(() => {
        console.log('Defect-' + req.get('id') + ' Updated!')
        res.send('Defect-' + req.get('id') + ' Updated!')
    })
})

// Delete a Defect
app.delete('/defect', (req, res) => {
    Defect.findOneAndRemove({
        _id: req.get('id')
    }, (err) => {
        if (err) {
            console.log('Failed to delete the defect-' + req.get('id') + '!')
            console.log(err)
        }

    }).then(() => {
        console.log('Defect-' + req.get('id') + ' Deleted!')
        res.send('Defect-' + req.get('id') + ' Deleted!')
    })
})

