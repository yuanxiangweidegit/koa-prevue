const rp = require('request-promise-native')
async function fetchMovie(item){
	let ll = 'https://www.meituan.com/meishi/api/poi/getMerchantComment?uuid=fe5b2924e90247debbc6.1560738123.1.0.0&platform=1&partner=126&originUrl=https%3A%2F%2Fwww.meituan.com%2Fmeishi%2F50574743%2F&riskLevel=1&optimusCode=1&id=50574743&userId=&offset=0&pageSize=10&sortType=1'
	const url ='https://movie.douban.com/subject/'+item.doubanId
	const res = await rp(url)

	return res
};
(async ()=>{
	let movies = [ { doubanId: 26752088,
    title: '我不是药神',
    rate: 9,
    poster:
     'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2519070834.jpg' },
  { doubanId: 26715636,
    title: '地久天长',
    rate: 7.9,
    poster:
     'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2550208359.jpg' }]
	
	movies.map(async movie=>{
		let data = fetchMovie(movie)
		data.then(res=>{
			console.log(data,'获取到的数据')
		})
		
	})
})()
