const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.listen(3000, () => {
  console.log('API server listening on port 3000');
});

function generateUniqueId() {
  const uniqueId = Math.floor(Math.random() * 120) + 5;

  return uniqueId;
}


const jsonData = fs.readFileSync('data.json');
data = JSON.parse(jsonData);

//adding a product

app.post('/api/inventory', (req, res) => {
  
 
  let inventory = [];
  
   if (jsonData.length > 0) {
    inventory = JSON.parse(jsonData);
    
  }

  const newProduct = {
    id: generateUniqueId(), 
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price
    
  };
 
  inventory.push(newProduct);

  // Write the updated Product data back to the JSON file
  fs.writeFileSync('data.json', JSON.stringify(inventory, null, 2));

  res.json({ message: 'Product added successfully', Product: newProduct });
});



//updating a product


app.put('/api/inventory/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'No products found' });
  }

  const product = data.find(product => product.id === parseInt(productId));

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  product.name = updatedProductData.name;
  product.category = updatedProductData.category;
  product.quantity = updatedProductData.quantity;
  product.price = updatedProductData.price;

  fs.writeFileSync('data.json', JSON.stringify(data,  null, 2));

  res.json({ message: 'Product updated successfully' });
});


//delete product



app.delete('/api/inventory/:id', (req, res) => {
  const productId = req.params.id;

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'No products found' });
  }

  const productIndex = data.findIndex(product => product.id === parseInt(productId));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  data.splice(productIndex, 1);

  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

  res.json({ message: 'Product deleted successfully' });
});


//get one product

app.get('/api/inventory/:id', (req, res) => {
  const productId = req.params.id;

  const product = data.find(product => product.id === parseInt(productId));

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});


