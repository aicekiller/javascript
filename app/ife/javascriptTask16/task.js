var cityName = document.getElementById('aqi-city-input');
var airApi = document.getElementById('aqi-value-input');
var oBtn = document.getElementById('add-btn');
var oTable = document.getElementById('aqi-table');

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityNameVal = cityName.value.trim();
	var airApiVal = airApi.value.trim();
	if (!/^[A-Za-z ?\u4E00-\u9FA5]+$/.test(cityNameVal)) {
		alert("城市名必须为中英文字符！");
		return;
	}
	if (!/^\d+$/.test(airApiVal)) {
		alert("空气质量指数必须为整数！");
		return;
	}
	aqiData[cityNameVal] = airApiVal;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	oTable.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for (var key in aqiData) {
		oTable.innerHTML += '<tr><td>' + key + '</td><td>' + aqiData[key] + '</td><td><button data-num="' + key + '">删除</button></td></tr>'
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(key) {
	delete aqiData[key];

	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	if (oBtn.addEventListener) {
		oBtn.addEventListener('click', addBtnHandle, false);
		oTable.addEventListener('click', function(e) {
			if (e.target.localName === 'button') {
				delBtnHandle(e.target.dataset.num)
			}
		});
	} else if (oBtn.attachEvent) {
		oBtn.attachEvent('onclick', addBtnHandle);
		oTable.attachEvent('onclick', function(e) {
			if (e.target.localName === 'button') {
				delBtnHandle(e.target.dataset.num)
			}
		});
	}
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数


}

init();