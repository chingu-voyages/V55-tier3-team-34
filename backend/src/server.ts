import app from "./app";
import config from "./config/config";


app.listen(config.port, () => {
  console.log(`application started and listening on port ${config.port}`);
});
