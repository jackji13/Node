// Import the express library and assign it to a variable
import express from 'express'

// Create an instance of an express application 
const app = express()

// Set the port the application will be running on
const port = process.env.PORT || 3001

// Set up a response for the root path of the application
app.get('/', (req, res) => {
  res.send("Soda Finder API")
})

const sodas = {
  cola: "Coca-Cola",
  lemonlime: "Sprite",
  rootbeer: "A&W",
  gingerale: "Canada Dry",
  orange: "Fanta",
  grape: "Welch's Grape Soda",
  cream: "Barq's Cream Soda",
  pepsi: "Pepsi",
  drpepper: "Dr Pepper"
}

app.get('/soda', (req, res) => {
  const type = req.query.type; // Access the soda type
  if (!type || !sodas[type]) {
    res.send("Soda not found! Please provide a valid type.");
  } else {
    res.send(`Soda Type: ${type}, Brand: ${sodas[type]}`);
  }
});

app.get('/brand/:brandName', (req, res) => {
  const brandName = req.params.brandName; // Access the brand name from the route
  res.send(`Brand requested: ${brandName}`);
});

app.listen(port, () => {
  console.log(`Soda Finder API running on ${port}`);
});