const Koa = require('koa')
const app = new Koa()
const views =require('koa-views')
const { resolve }=require('path')
//const ejs = require('ejs')
app.use(views(resolve(__dirname,'./views'),{
	extension:'ejs'
}))
app.use(async (ctx,next)=>{
	await ctx.render('index',{
		name:'zhangsan'
	})
})
app.listen(4455)
