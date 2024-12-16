const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from React Native
app.use(express.json()); // Parse JSON body

// A sample route
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
