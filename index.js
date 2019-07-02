const Koa = require('koa')
const app = new Koa()
const { normal } = require('./tpl')
const ejs = require('ejs')
app.use(async (ctx,next)=>{
	ctx.type = 'text/html;charset:utf-8'
	ctx.body=ejs.render(normal,{
		name:'454646544545'
	})
})
app.listen(4455)
