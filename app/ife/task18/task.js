var oInput = document.getElementsByClassName('input')[0],
	oBtn = document.getElementsByTagName('button'),
	oArea = document.getElementsByClassName('num-area')[0];



function addEvent(ele, event, func) {
	return ((ele.attachEvent) ? ele.attachEvent('on' + event, func) : ele.addEventListener(event, func, false));
}

var quickSort = function(arr) {
	if (arr.length <= 1) return arr;
	var leftArray = [];
	var rightArray = [];
	var temp = arr[0];

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > temp) {
			leftArray.push(arr[i]);
		} else {
			rightArray.push(arr[i]);
		}
	}

	return quickSort(leftArray).concat(temp, quickSort(rightArray));

}
console.log(quickSort([10, 1, 33, 4, 20]));

var queue = {

	arr: [],

	leftIn: function(num) {
		if (this.arr.length > 60) {
			alert('error');
		} else {
			this.arr.unshift(num);
			this.paint();
		}
	},
	rightIn: function(num) {
		if (this.arr.length > 60) {
			alert('error');
		} else {
			this.arr.push(num);
			this.paint();
		}
	},
	leftOut: function() {
		if (this.arr.length) {
			this.arr.shift();
			this.paint();
		} else {
			alert('empty');
		}
	},
	rightOut: function() {
		if (this.arr.length) {
			this.arr.pop();
			this.paint();
		} else {
			alert('empty');
		}
	},
	deleteID: function(id) {
		this.arr.splice(id, 1);
		this.paint();
	},
	paint: function() {
		var str = '';
		for (var i = 0; i < this.arr.length; i++) {
			str += '<li style="height:' + this.arr[i] + 'px"></li>'
		}
		oArea.innerHTML = str;
		liAddEvent();
	},

};



function liAddEvent() {
	for (var i = 0; i < oArea.childElementCount; i++) {
		addEvent(oArea.children[i], 'click', function(i) {
			return function() {
				return queue.deleteID(i);
			}
		}(i));
	}
}

addEvent(oBtn[0], 'click', function() {
	var val = oInput.value;
	if (/^\d+$/.test(val) && parseInt(val) > 10 && parseInt(val) < 100) {
		queue.leftIn(val);
	} else {
		alert('error');
	}
});
addEvent(oBtn[1], 'click', function() {
	var val = oInput.value;
	if (/^\d+$/.test(val) && 10 < parseInt(val) < 100) {
		queue.rightIn(val);
	} else {
		alert('error');
	}
});
addEvent(oBtn[2], 'click', function() {
	queue.leftOut();
});
addEvent(oBtn[3], 'click', function() {
	queue.rightOut();
});