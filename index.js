// Import the express library and assign it to a variable
import express from 'express'

// Create an instance of an express application 
const app = express()

// Set the port the application will be running on
const port = process.env.PORT || 3001

// Set up a response for the root path of the application
app.get('/', (req, res) => {
  res.send("What's up")
})

const movies = {
	horror: "saw",
	comedy: "white girls"
}

app.get('/country', (req, res) => {
    const countryName = req.query.country; // Access the country name
    res.send(`Country: ${countryName}`);
});

app.get('/movies', (req, res) => {
    const genreName = req.query.genre; // Access the genre name
    if (!movies[genreName]) {
	    res.send(`no movies found!`);
    }
    res.send(`genre: ${genreName}, ${movies[genreName]}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}` )
})