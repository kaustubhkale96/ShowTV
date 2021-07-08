const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true, }));

const db = require("./models");
const Role = db.role;

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to database...");
    })
    .catch((err) => {
        console.log("Database connection error...", err);
        process.exit();
    });

const init = require('./models/initial-model')
init()

require("./routes/auth.routes")(app);

app.get("/", (res) => {
    res.json({ message: "Welcome to ShowTV server" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
