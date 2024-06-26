const express = require("express");
const fs = require("fs");
const cors = require("cors");
const selectQuery = require('./queries/SelectQuery');
const InsertQuery = require("./queries/InsertQuery");
const UpdateQuery = require("./queries/UpdateQuery");
const DeleteQuery = require("./queries/DeleteQuery");
const getContainerIP = require("./ip_container");

const app = express();
const port = 3000;


// const containerName = 'front-endlb';
// const ipAddress = getContainerIP(containerName);
//   if (ipAddress) {
//       console.log(`La dirección IP del contenedor ${containerName} es: ${ipAddress}`);x
//   } else {
//       console.log(`No se pudo obtener la dirección IP del contenedor ${containerName}`);
//   }
// Cors configuration - Allows requests from localhost:4200
//Hacer ip dinamica de acuerdo al nombre del contenedor balanceador de carga del front-end
const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));



// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// GET route - Allows to get all the items
// example: localhost:3000/clothes?page=0&perPage=2
// GET route - Allows to get all the items
// example: localhost:3000/clothes?page=0&perPage=2
app.get("/clothes", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;
  const start = page * perPage;

  // Call the selectQuery function to fetch paginated product data
  selectQuery(perPage, start)
      .then(jsonData => {
        res.status(200).json(jsonData);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        res.status(500).send("Internal Server Error");
      });
});


// POST route - Allows to add a new item
// example: localhost:3000/clothes
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/
app.post("/clothes", (req, res) => {
  const { image, name, price, rating } = req.body;
  InsertQuery(name, image, price, rating)
      .then(()=>{
        res.status(201).json({ message: 'Product inserted successfully' });
      })
      .catch(
          err=>{
            console.error('Error inserting product:', err);
            res.status(500).json(
                {
                  message: 'Failed to insert product'
                }
            );
          }
      )
});

// PUT route - Allows to update an item
// example: localhost:3000/clothes/1
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/
app.put("/clothes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { image, name, price, rating } = req.body;
  UpdateQuery(id, name, image, price, rating)
      .then(()=>{
        res.status(200).json({ message: 'Product updated successfully' });
      })
      .catch(
          err=>{
            console.error('Error updating product:', err);
            res.status(500).json(
                {
                  message: 'Failed to update product'
                }
            );
          }
      )
});

// DELETE route - Allows to delete an item
// example: localhost:3000/clothes/1
app.delete("/clothes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  DeleteQuery(id)
      .then(()=>{
        res.status(204).json({ message: 'Product deleted successfully' });
      })
      .catch(
          err=>{
            console.error('Error deleting product:', err);
            res.status(500).json(
                {
                  message: 'Failed to delete product'
                }
            );
          }
      )

});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
