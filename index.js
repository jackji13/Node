import express from 'express';
import fetch from 'node-fetch';

const app = express();

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Fast Food Finder API!",
    description: "Find information on various fast food items, including brands and nutritional details.",
    endpoints: {
      root: "/ - Overview of the API",
      food: "/food?type=<type>&size=<size> - Search for a specific fast food item with optional size",
      brand: "/brand/:brandName - Get information about a specific brand",
    },
    exampleUsage: {
      getBurger: "/food?type=burger",
      getWithSize: "/food?type=burger&size=large",
      brandExample: "/brand/Starbucks"
    }
  });
});

// Example of an application route that makes a request to another server
app.get('/advice', async (req, res) => {
  // Make a request to another wbesite and wait for a response
  const response = await fetch('https://api.adviceslip.com/advice')

  // Read the response
  const body = await response.json()

  // Print the repsonse body to the console
  console.log(body)

  // Get the advice text string from the response body object
  const advice = body.slip.advice

  res.json({ data: advice })
})

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

app.get('/food', (req, res) => {
  const type = req.query.type;
  const size = req.query.size;

  if (!type || !fastFood[type]) {
    res.send("Fast food item not found! Please provide a valid type.");
  } else {
    const foodItem = fastFood[type];
    let response = {
      type,
      brand: foodItem.brand,
      calories: foodItem.calories,
      servingSize: foodItem.servingSize,
      size: size || "default"
    };
    res.json(response);
  }
});

app.get('/brand/:brandName', (req, res) => {
  const brandName = req.params.brandName;
  res.send(`Brand requested: ${brandName}`);
});

app.listen(port, () => {
  console.log(`Fast Food Finder API running on port ${port}`);
});