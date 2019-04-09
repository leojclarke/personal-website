var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var sassMiddleware = require('node-sass-middleware')

var app = express()
if (app.get('env') == 'development') {
  var browserSync = require('browser-sync')
  var config = {
    files: ['public/**/*.{css,js}', 'scss/**/*.scss', 'views/**/*.ejs'],
    logLevel: 'debug',
    logSnippet: false,
    notify: false,
    ui: false,
    reloadDelay: 100,
    reloadOnRestart: true,
  }
  var bs = browserSync(config)
  app.use(require('connect-browser-sync')(bs))
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  '/stylesheets',
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public/stylesheets'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
)
app.use(express.static(path.join(__dirname, 'public')))

// add new pages here
app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
