const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(productsFilePath, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
                if (err) {
                    console.error('Error writing products file:', err);
                }
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
};
