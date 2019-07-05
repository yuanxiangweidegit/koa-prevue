
var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
//qiniu.conf.ACCESS_KEY = 'Qr8d2wBDb4CKOp2FRa0DLq6PrgaNJcLHBDMpJSV2';
//qiniu.conf.SECRET_KEY = 'dVz66cAz2wK6-p99yO2sfH6A1sYZ4VcyI1tvaKCn';
var accessKey = 'Qr8d2wBDb4CKOp2FRa0DLq6PrgaNJcLHBDMpJSV2';
var secretKey = 'dVz66cAz2wK6-p99yO2sfH6A1sYZ4VcyI1tvaKCn';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//要上传的空间
bucket = 'my_space';
//上传到七牛后保存的文件名
key = 'alog.png';
//构建上传策略函数
function uptoken(bucket, key) {
	console.log(qiniu.rs,9999)
	var options = {
  scope: bucket,
  expires: 7200
};
  var putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken(mac);
}
//生成上传 Token
token = uptoken(bucket, key);
//要上传文件的本地路径
filePath = './logo.jpg'
//构造上传函数
function uploadFile(uptoken, key, localFile) {
	
	
	var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z1;
  var extra = new qiniu.form_up.PutExtra();
  var formUploader = new qiniu.form_up.FormUploader(config);
   formUploader.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId,999998888);       
      } else {
        // 上传失败， 处理返回代码
        console.log(err,12345646);
      }
  });
}
//调用uploadFile上传
uploadFile(token, key, filePath);
