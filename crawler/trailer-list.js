const puppeteer = require('puppeteer')
const url = 'https://movie.douban.com/tag/#/?sort=U&range=5,10&tags='
console.log(puppeteer)
const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
});
(
	async() => {
		console.log('start page')
		const browser = await puppeteer.launch({ //启动一个模拟浏览器
			args: ['--no-sandbox'], //启动非杀伤模式
			dumpio: false
		})
		const page = await browser.newPage()  //打开一个网页
		await page.goto(url, {                     //网页跳转地址为url
			waitUntil: 'networkidle2'
		})
		await sleep(3000)
		await page.waitForSelector('.more')      //在网页中找到.more的元素
		for(let i = 0; i < 1; i++) {
			await sleep(3000)
			await page.click('.more')          //模拟点击
		}
		const result = await page.evaluate(() => {        //浏览器中
			var $ = window.$
			var items = $('.list-wp a')
			var links = []
			if(items.length > 0) {
				items.each((index, item) => {
					let it = $(item)
					let doubanId = it.find('div').data('id')
					let title = it.find('.title').text()
					let rate = Number(it.find('.rate').text())
					let poster = it.find('img').attr('src')
					links.push({
						doubanId,
						title,
						rate,
						poster
					})
				})
			}

			return links

		})
		browser.close()                         //关闭浏览器
		process.send({result})      //进程把结果发送出去
		process.exit(0)   //关闭进程
		console.log(result)
	}
)()