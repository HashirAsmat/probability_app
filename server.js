const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const bodyparser = require("body-parser");
const result = "";
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs');
app.get("/", function (req, res) {
    res.status(200).send("base URL working!");
});

app.get("/gp", function (req, res) {
    res.status(200).render("index", {
        result
    })
})
app.post("/gp", function (req, res) {
    const p = Number(req.body.input1);
    const k = parseFloat(req.body.input2);
    console.log(p);
    console.log(k);
    if (!p && !k) {
        return res.status(404).render("index", {
            result: "Input fields can't be empty"

        })
    }
    if (p > 1) {
        return res.status(404).render("index", {
            result: "Probability cant be greater than 1"
        })

    }
    result = p * ((1 - p) ** (k - 1));


    console.log(result);
    res.status(200).render("index", {
        result: "The result is P(X=k):" + result
    })
})
app.listen(port, () => {
    console.log(`listening at port ${port}`);
})


