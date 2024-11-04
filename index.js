import express from 'express';

const app = express();

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send("Fast Food Finder API");
});

const fastFood = {
  burger: "McDonald's",
  taco: "Taco Bell",
  pizza: "Pizza Hut",
  sandwich: "Subway",
  friedchicken: "Popeyes",
  doughnut: "Dunkin' Donuts",
  coffee: "Starbucks",
  icecream: "Dairy Queen",
  sub: "Jersey Mike's",
  burrito: "Chipotle",
  hotdog: "Nathan's Famous",
  salad: "Sweetgreen",
  smoothie: "Jamba Juice",
  sushi: "Sushi Stop"
};

app.get('/food', (req, res) => {
  const type = req.query.type;
  const size = req.query.size;

  if (!type || !fastFood[type]) {
    res.send("Fast food item not found! Please provide a valid type.");
  } else if (!size) {
    res.send(`Food Type: ${type}, Brand: ${fastFood[type]}`);
  } else {
    res.send(`Food Type: ${type}, Brand: ${fastFood[type]}, Size: ${size}`);
  }
});

app.get('/brand/:brandName', (req, res) => {
  const brandName = req.params.brandName;
  res.send(`Brand requested: ${brandName}`);
});

app.listen(port, () => {
  console.log(`Fast Food Finder API running on port ${port}`);
});