const { createApp } = require("./app");

const app = createApp();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Yargıtay karar arama API ${port} portunda çalışıyor.`);
});
