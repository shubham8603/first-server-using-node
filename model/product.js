const fs = require('fs');
const path = require('path');

const getDataFilePath = (fileName) => path.join(__dirname, fileName);

const readFile = (fileName) => {
    try {
        const filePath = getDataFilePath(fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent) || [];
    } catch (error) {
        return [];
    }
};

const writeFile = (fileName, data) => {
    const filePath = getDataFilePath(fileName);
    fs.writeFileSync(filePath, JSON.stringify(data));
};

const productsFile = 'products.json';

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const products = this.fetchAll();
        products.push(this);
        writeFile(productsFile, products);
    }

    static fetchAll() {
        return readFile(productsFile);
    }
};
