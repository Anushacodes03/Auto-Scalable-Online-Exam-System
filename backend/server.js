const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Optional metrics support
// npm install express-prom-bundle
let promBundle;
try {
    promBundle = require("express-prom-bundle");
} catch {
    promBundle = null;
}

const app = express();

app.use(express.json());
app.use(cors());


// Metrics middleware (optional)
if (promBundle) {
    const metricsMiddleware = promBundle({
        includeMethod: true,
        includePath: true
    });

    app.use(metricsMiddleware);
}


// File paths
const studentsPath = path.join(
    __dirname,
    "../data/students.json"
);

const questionsPath = path.join(
    __dirname,
    "../data/questions.json"
);

const resultsPath = path.join(
    __dirname,
    "../data/results.json"
);


// Home route
app.get("/", (req, res) => {

    res.send("Server Running");

});


// Login route
app.post("/login", (req, res) => {

    try {

        const { username, password } = req.body;

        const users = JSON.parse(
            fs.readFileSync(
                studentsPath,
                "utf8"
            )
        );

        const found = users.find(
            u =>
                u.username === username &&
                u.password === password
        );

        if (found) {

            res.json({
                success: true
            });

        } else {

            res.json({
                success: false
            });

        }

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Login error"
        });

    }

});


// Questions route
app.get("/questions", (req, res) => {

    try {

        const questions = JSON.parse(
            fs.readFileSync(
                questionsPath,
                "utf8"
            )
        );

        res.json(questions);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error loading questions"
        });

    }

});


// Submit results
app.post("/submit", (req, res) => {

    try {

        const { name, score } = req.body;

        let results = [];

        if (fs.existsSync(resultsPath)) {

            results = JSON.parse(
                fs.readFileSync(
                    resultsPath,
                    "utf8"
                )
            );

        }

        results.push({
            name,
            score
        });

        fs.writeFileSync(
            resultsPath,
            JSON.stringify(
                results,
                null,
                2
            )
        );

        res.json({
            message: "Result Saved"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error saving result"
        });

    }

});


// Results route
app.get("/results", (req, res) => {

    try {

        const results = JSON.parse(
            fs.readFileSync(
                resultsPath,
                "utf8"
            )
        );

        res.json(results);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error loading results"
        });

    }

});


// Server start
const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});