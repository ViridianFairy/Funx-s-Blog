function getTime(date) {
   function dual(d) {
      if (String(d).length == 1) return "0" + d;
      return d;
   }
   var a = date.getFullYear() + "-" + dual(date.getMonth() + 1) + "-" + dual(date.getDate());
   return a + " " + dual(date.getHours()) + ":" + dual(date.getMinutes());
};
function getTimeShort(date) {
   function dual(d) {
      if (String(d).length == 1) return "0" + d;
      return d;
   }
   var a = date.getFullYear() + "-" + dual(date.getMonth() + 1) + "-" + dual(date.getDate());
   return a;
};
function getFuzzyTime(date) {
   var div = parseInt((new Date() - date) / 1000);
   if (div == 0) return `刚刚`;
   if (div <= 59) {
      return `${div}秒前`;
   }
   if (div >= 60 && div < 60 * 60) {
      div = parseInt(div / 60);
      return `${div}分钟前`;
   }
   if (div >= 60 * 60 && div < 60 * 60 * 24) {
      div = parseInt(div / 60 / 60);
      return `${div}小时前`;
   }
   if (div >= 60 * 60 * 24 && div < 60 * 60 * 24 * 30) {
      div = parseInt(div / 60 / 60 / 24);
      return `${div}天前`;
   }
   if (div >= 60 * 60 * 24 * 30 && div < 60 * 60 * 24 * 30 * 12) {
      div = parseInt(div / 60 / 60 / 24 / 30);
      return `${div}个月前`;
   }
   return `超过1年`;
}
function getUniqueId() {
   const now = new Date()
   const year = now.getFullYear();
   let month = now.getMonth() + 1;
   let day = now.getDate();
   let hour = now.getHours();
   let minutes = now.getMinutes();
   let seconds = now.getSeconds();
   String(month).length < 2 ? (month = Number("0" + month)) : month;
   String(day).length < 2 ? (day = Number("0" + day)) : day;
   String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
   String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
   String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
   const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
   return yyyyMMddHHmmss + Math.random().toString(36).substr(2, 9);
};
var getIp = function () {
   var os = require('os'),
      ipStr,
      infaces = os.networkInterfaces(),
      bool = false;
   for (var i in infaces) {
      infaces[i].some(function (x) {
         if ((x.family == 'IPv4') && (x.internal == false)) {
            ipStr = x.address;
            bool = true;
            return true
         }
      })
      if (bool) { break }
   }
   return ipStr
}
console.log(getIp())
module.exports = {
   getFuzzyTime,
   getTimeShort,
   getTime,
   getUniqueId,
   getIp,
}