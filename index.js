import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
const apiKey = process.env.API_KEY;
console.log(`Your API Key is: ${apiKey}`);

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Fast Food Finder API!",
    description: "Find information on various fast food items, including brands and nutritional details.",
    endpoints: {
      root: "/ - Overview of the API",
      food: "/food - Get all fast food items",
      foodByType: "/food/:type - Get details of a specific fast food item by type",
      brand: "/brand/:brandName - Get information about a specific brand",
      search: "/search?query=<query> - Search for fast food items by keyword"
    },
    exampleUsage: {
      allFood: "/food",
      getBurger: "/food/burger",
      brandExample: "/brand/Starbucks",
      searchExample: "/search?query=burger"
    }
  });
});

// Route to get advice from an external API
app.get('/advice', async (req, res) => {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const body = await response.json();
    const advice = body.slip.advice;
    res.json({ data: advice });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch advice" });
  }
});

// Fast food items database
const fastFood = {
  burger: { brand: "McDonald's", calories: 250, servingSize: "1 burger" },
  taco: { brand: "Taco Bell", calories: 170, servingSize: "1 taco" },
  pizza: { brand: "Pizza Hut", calories: 285, servingSize: "1 slice" },
  sandwich: { brand: "Subway", calories: 200, servingSize: "6 inch" },
  friedchicken: { brand: "Popeyes", calories: 420, servingSize: "1 piece" },
  doughnut: { brand: "Dunkin' Donuts", calories: 250, servingSize: "1 doughnut" },
  coffee: { brand: "Starbucks", calories: 5, servingSize: "1 cup (black coffee)" },
  icecream: { brand: "Dairy Queen", calories: 240, servingSize: "1 cone" },
  sub: { brand: "Jersey Mike's", calories: 300, servingSize: "6 inch" },
  burrito: { brand: "Chipotle", calories: 300, servingSize: "1 burrito" },
  hotdog: { brand: "Nathan's Famous", calories: 150, servingSize: "1 hotdog" },
  salad: { brand: "Sweetgreen", calories: 120, servingSize: "1 bowl" },
  smoothie: { brand: "Jamba Juice", calories: 280, servingSize: "1 medium" },
  sushi: { brand: "Sushi Stop", calories: 180, servingSize: "1 roll" }
};

// Endpoint to get all fast food items
app.get('/food', (req, res) => {
  res.json({ data: fastFood });
});

// Endpoint to get details of a specific fast food item by type
app.get('/food/:type', (req, res) => {
  const type = req.params.type;
  if (!fastFood[type]) {
    res.status(404).json({ error: "Fast food item not found! Please provide a valid type." });
  } else {
    res.json({ data: fastFood[type] });
  }
});

// Endpoint to get information about a specific brand
app.get('/brand/:brandName', (req, res) => {
  const brandName = req.params.brandName;
  const item = Object.values(fastFood).find(food => food.brand.toLowerCase() === brandName.toLowerCase());
  if (!item) {
    res.status(404).json({ error: "Brand not found! Please provide a valid brand name." });
  } else {
    res.json({ data: item });
  }
});

// Search endpoint to filter food items based on a query
app.get('/search', (req, res) => {
  const query = req.query.query;
  if (!query) {
    res.status(400).json({ error: "Please provide a query parameter." });
  } else {
    const results = Object.keys(fastFood).filter(type => type.includes(query.toLowerCase()));
    res.json({ data: results });
  }
});

app.listen(port, () => {
  console.log(`Fast Food Finder API running on port ${port}`);
});
