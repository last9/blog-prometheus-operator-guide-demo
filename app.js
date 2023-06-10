const express = require("express");

const prometheus = require("prom-client");

const app = express();

const requestCounter = new prometheus.Counter({

    name: "requestCount",

    help: "Number of requests made",

    labelNames: ["path"]

});

const requestCounterMiddleware = (req, res, next) => {

    if (req.path !== "/metrics") {

        requestCounter.inc({path: req.path});

    }

    next();
};


app.use(requestCounterMiddleware);


app.get("/metrics", (req, res) => {

    res.set("Content-Type", prometheus.register.contentType);

    prometheus.register.metrics().then(metrics => res.send(metrics));

});


app.get("*", (req, res) => {

    res.send("Hello World!");

});


app.listen(80, () => console.log("Listening!"));
