import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
const apiKey = process.env.API_KEY;
console.log(`Your API Key is: ${apiKey}`);

const allowedOrigins = [
  'https://jackji13.github.io/2024LAB',
  'http://127.0.0.1:5500',
  'http://localhost:3001'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

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

let fastFood = {
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

app.get('/food', (req, res) => {
  res.json({ data: fastFood });
});

app.get('/food/:type', (req, res) => {
  const type = req.params.type;
  if (!fastFood[type]) {
    res.status(404).json({ error: "Fast food item not found!" });
  } else {
    res.json({ data: fastFood[type] });
  }
});

app.post('/food', (req, res) => {
  const { type, brand, calories, servingSize } = req.body;
  if (fastFood[type]) {
    return res.status(400).json({ error: "Food item already exists!" });
  }
  fastFood[type] = { brand, calories, servingSize };
  res.status(201).json({ message: "Food item added successfully!", data: fastFood[type] });
});

app.put('/food/:type', (req, res) => {
  const type = req.params.type;
  if (!fastFood[type]) {
    return res.status(404).json({ error: "Food item not found!" });
  }
  const { brand, calories, servingSize } = req.body;
  fastFood[type] = { brand, calories, servingSize };
  res.json({ message: "Food item updated successfully!", data: fastFood[type] });
});

app.delete('/food/:type', (req, res) => {
  const type = req.params.type;
  if (!fastFood[type]) {
    return res.status(404).json({ error: "Food item not found!" });
  }
  delete fastFood[type];
  res.json({ message: "Food item deleted successfully!" });
});

app.get('/brand/:brandName', (req, res) => {
  const brandName = req.params.brandName;
  const item = Object.values(fastFood).find(food => food.brand.toLowerCase() === brandName.toLowerCase());
  if (!item) {
    res.status(404).json({ error: "Brand not found!" });
  } else {
    res.json({ data: item });
  }
});

app.get('/search', (req, res) => {
  const query = req.query.query?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: "Please provide a query parameter." });
  }
  const results = Object.keys(fastFood).filter(type =>
    type.includes(query) || fastFood[type].brand.toLowerCase().includes(query)
  );
  res.json({ data: results });
});

app.listen(port, () => {
  console.log(`Fast Food Finder API running on port ${port}`);
});