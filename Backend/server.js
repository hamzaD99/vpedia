const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const lumie = require("lumie");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

lumie.load(app, {
    preURL: '',
    verbose: true,
    ignore: ['*.spec', '*.action', 'helper'],
    controllers_path: path.join(__dirname, 'controllers')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
