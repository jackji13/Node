# Fast Food Finder API

Welcome to the Fast Food Finder API! This Node.js web service provides information on various fast food items, including their brands, nutritional details, and serving sizes.

## Base URL

The API is deployed at: [https://node-sblg.onrender.com/](https://node-sblg.onrender.com/)

## Endpoints

### Root
- **GET `/`** - Overview of the API, including available endpoints and example usage.

### Food Search
- **GET `/food`**
  - **Query Parameters:**
    - `type` (required): The type of fast food item (e.g., burger, taco, pizza).
    - `size` (optional): A specific size or portion for the food item.
  - **Example Requests:**
    - `/food?type=burger`
    - `/food?type=burger&size=large`
  - **Sample Response:**
    ```json
    {
      "type": "burger",
      "brand": "McDonald's",
      "calories": 250,
      "servingSize": "1 burger",
      "size": "large"
    }
    ```

### Brand Information
- **GET `/brand/:brandName`**
  - **Route Parameter:**
    - `brandName` (required): The brand name (e.g., Starbucks).
  - **Example Request:**
    - `/brand/Starbucks`
  - **Sample Response:**
    ```
    Brand requested: Starbucks
    ```

## Sample Requests

1. **Get a Fast Food Item by Type**  
   Request: `/food?type=pizza`  
   Response:
   ```json
   {
     "type": "pizza",
     "brand": "Pizza Hut",
     "calories": 285,
     "servingSize": "1 slice",
     "size": "default"
   }
   ```

2. **Get a Fast Food Item by Type and Size**  
   Request: `/food?type=taco&size=small`  
   Response:
   ```json
   {
     "type": "taco",
     "brand": "Taco Bell",
     "calories": 170,
     "servingSize": "1 taco",
     "size": "small"
   }
   ```

3. **Get Information About a Brand**  
   Request: `/brand/Starbucks`  
   Response:
   ```
   Brand requested: Starbucks
   ```