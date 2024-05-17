import "dotenv/config";
import app from "./app";
import env from "./utils/validate-env";
import mongoose from "mongoose";

const port = env.PORT;

app.listen(port, () => {
  console.log("Server is running on port: ", +port);
});

mongoose
  .connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);
