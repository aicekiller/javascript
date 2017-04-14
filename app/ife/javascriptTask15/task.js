var sourceData = [];
var sourceDom = document.getElementById('source');
var oResort = document.getElementById('resort');
var oBtn = document.getElementById('sort-btn');

function getData() {
	var data = [],
		i = 0;

	for (; i < sourceDom.childElementCount; i++) {
		var ele = sourceDom.children[i];
		var text = ele.innerText;
		data.push(text.split('空气质量：'));
	}
	return data;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
	return data.sort(function(a, b) {
		return b[1] - a[1];
	});
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
	sourceDom.innerHTML = '';
	var html = '',
		j = 0;

	for (; j < data.length; j++) {
		var items = data[j];
		html += '<li>第' + (j + 1) + '名：' + items[0] + '空气质量：<b>' + items[1] + '</b></li>';
	}
	oResort.innerHTML = html;
}

function btnHandle() {
	var aqiData = getData();
	aqiData = sortAqiData(aqiData);
	render(aqiData);
}


function init() {

	// 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
	oBtn.addEventListener("click", btnHandle, false);
}

init();