const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use("/", express.static(path.join(__dirname, "/dist/client/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/client/index.html"));
});
app.listen(PORT, function () {
  console.log(`Social Network client static server listen on port ${PORT}!`);
});
