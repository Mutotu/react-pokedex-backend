const express = require("express");
const app = express();

app.use(require("morgan")("tiny"));
const routesReport = require("rowdy-logger").begin(app);

app.use(express.json());
app.use(require("cors")());

const models = require("./models");

app.get("/favPokemon", async (req, res) => {
  try {
    const favPokemon = await models.favPokemon.findAll();
    res.json({ favPokemon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/favPokemon", async (req, res) => {
  try {
    const newFavPokemon = await models.favPokemon.create({
      name: req.body.name,
    });
    console.log(newFavPokemon);
    res.json({ newFavPokemon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/favPokemon/:name", async (req, res) => {
  console.log(req.params.name);
  try {
    const deleteResult = await models.favPokemon.destroy({
      where: { name: req.params.name },
    });
    res.json({ deleteResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print();
});
