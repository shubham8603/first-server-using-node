const path = require('path');
const fs = require('fs');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductFromFile = (cb) => {
    fs.readFile(p, (err, filecontent) => {
        if (err) {
            cb([]);
        } else {
            // Check if filecontent is not empty
            if (filecontent.length > 0) {
                cb(JSON.parse(filecontent));
            } else {
                cb([]);
            }
        }
    });
};

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('Product saved successfully.');
                }
            });
        });
    }

    static fetchAll(cb) {
        getProductFromFile(cb);
    }
};
