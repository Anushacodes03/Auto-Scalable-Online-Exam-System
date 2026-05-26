const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const promBundle = require("express-prom-bundle");

const app = express();

app.use(express.json());
app.use(cors());


// ==========================
// Prometheus Metrics
// ==========================

const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true
});

app.use(metricsMiddleware);


// ==========================
// File Paths
// ==========================

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


// ==========================
// Home Route
// ==========================

app.get("/", (req, res) => {

    res.send("Server Running");

});


// ==========================
// Login
// ==========================

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
            message: "Login Error"
        });

    }

});


// ==========================
// Questions
// ==========================

app.get("/questions", (req, res) => {

    try {

        const questions = JSON.parse(
            fs.readFileSync(
                questionsPath,
                "utf8"
            )
        );

        res.json(
            questions
        );

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message:
            "Error loading questions"
        });

    }

});


// ==========================
// Submit Result
// ==========================

app.post("/submit", (req, res) => {

    try {

        const { name, score } = req.body;

        let results = [];

        if (
            fs.existsSync(resultsPath)
        ) {

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

            message:
            "Result Saved"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
            "Error Saving Result"

        });

    }

});


// ==========================
// Results
// ==========================

app.get("/results", (req, res) => {

    try {

        let results = [];

        if (
            fs.existsSync(resultsPath)
        ) {

            results = JSON.parse(

                fs.readFileSync(
                    resultsPath,
                    "utf8"
                )

            );

        }

        res.json(results);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
            "Error loading results"

        });

    }

});


// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});