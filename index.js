const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from React Native
app.use(express.json()); // Parse JSON body

// A sample route
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// Dining Halls Single-Day Endpoint; Example url: http://localhost:3000/sbisa/2024-11-07/lunch
app.get('/:location/:date/:meal', async (req, res) => {
    try {
        const location = req.params.location; // sbisa, commons, duncan (case-sensitive)
        const date = req.params.date; // yyyy-mm-dd format
        const meal = req.params.meal; // breakfast, lunch, dinner

        const locationIDs = {
            "sbisa": "587909deee596f31cedc179c",
            "commons": "59972586ee596fe55d2eef75",
            "duncan": "5878eb5cee596f847636f114"
        }
        const periods = {
            "sbisa": {
                "breakfast": "66c21db5c625af0600cc0ce2",
                "lunch": "66c21db5c625af0600cc0cdb",
                "dinner": "66c21db5c625af0600cc0ceb"
            },
            "commons": {
                "breakfast": "66c1fbe2c625af05ac3e20bf",
                "lunch": "66c1fbe2c625af05ac3e20d6",
                "dinner": "66c1fbe2c625af05ac3e20ca"
            },
            "duncan": {
                "breakfast": "66b62d73c625af05ac9bdfb9",
                "lunch": "66b62d73c625af05ac9bdfb4",
                "dinner": "66b62d73c625af05ac9bdfae"
            }
        }

        const locationID = locationIDs[location];
        const period = periods[location][meal];

        // TODO: Check if it already exists in the database

    
        const url = `https://api.dineoncampus.com/v1/location/${locationID}/periods${period}?platform=0&date=${date}`;
        const response = await fetch(url);
        let data = await response.json();
        if (data.closed) {
            res.json({ error: true, message: `${location} is closed` });
        }
        else if (data.periods.length == 0) {
            res.json({ error: true, message: `${location} has no menu` });
        }
        else {
            data.error = false;
            res.json(data);
        }
    }
    catch (error) {
        res.json({ error: true, message: 'request no bueno :(' });
    }
})

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
