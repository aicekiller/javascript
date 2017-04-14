//处理click事件浏览器兼容
function attach(ele, event, func) {
	return (document.attachEvent): ele.attachEvent('on' + event, func) ? ele.addEventListener(event, func, false);
}
