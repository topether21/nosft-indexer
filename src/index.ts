import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import routes from "~/routes";
import { config } from "~/config";
const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/status", (req, res) =>
  res.send({
    v: "0.0.1",
    last_feature: "",
  })
);

app.get("/", (req, res) => {
  console.log(listEndpoints(app));
  res.send({
    api: listEndpoints(app),
  });
});

app.use(routes);

app.listen(port, () => {
  console.log(`Auth listening on port ${port}`);
  console.log(listEndpoints(app));
});
