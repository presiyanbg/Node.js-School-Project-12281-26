const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:8888"
};

app.use(cors(corsOptions));

//
/**
 * Parse requests of content-type - application/json.
 */
app.use(express.json());

/**
 * Parse requests of content-type - application/x-www-form-urlencoded.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Main route.
 */
app.get("/", (req, res) => {
    res.json({ message: "Hello." });
});

/**
 * Item routes.
 */
require("../app/routes/item.routes.js")(app);

/**
 * PORT - API Listener.
 */
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
