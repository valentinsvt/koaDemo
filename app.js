const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');
const path = require('path');
const static = require('koa-static');

const Koa = require('koa');
const app = module.exports = new Koa();

app.use(logger());

app.use(render);
app.use(static(path.join(__dirname, './css')));
app.use(koaBody());


router.get('/', index);
router.get('/logger', securityLogger);

app.use(router.routes());

async function index(ctx) {
  await ctx.render('index', { });
}

async function securityLogger(ctx) {
    for(i =0; i<100000; i++){console.log(i)}
    await (ctx.response.body = {"message":"Hola mudo"});
}

if (!module.parent) app.listen(3000);
