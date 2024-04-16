const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const lumie = require("lumie");
const path = require("path");
const permissions = require('./permissions');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const constents = require('./common/constents');

const initializePassport = require('./config/passport')
initializePassport(
  passport
)

app.use(bodyParser.json());
app.use(cors())
app.use(flash())
app.use(express.urlencoded({ extended: false }))
console.log(constents.JWT_SECERT)
app.use(session({
  secret: constents.JWT_SECERT,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

lumie.load(app, {
  preURL: '',
  verbose: true,
  ignore: ['*.spec', '*.action', 'helper'],
  permissions,
  controllers_path: path.join(__dirname, 'controllers')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
