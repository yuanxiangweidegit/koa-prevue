const cp = require('child_process');
const { resolve } =require('path');
(async ()=>{
	const script=resolve(__dirname,'../crawler/video.js');
	const child =cp.fork(script,[])   //派生出子进程
	let invoked = false
	child.on('error',err=>{
		if(invoked) return 
		invoked =true
		console.log(err,1)
	})
	child.on('exit',code=>{
		if(invoked) return
		invoked = true
		let err = code ===0?null :new Error('exit code' + code)
		console.log(err,2)
	})
	child.on('message',data=>{
		let result = data
		console.log(result,3)
	})
	
})()