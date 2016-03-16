//冒泡排序
var arr = [1, 100, 5, 20];
// var temp;
// for (var i = 0; i < arr.length; i++) {
// 	//每次比较几次，第一次6次，第二次5次
// 	//console.log(i);
// 	for (var j = 0; j < arr.length - 1 - i; j++) {
// 		console.log(j);
// 		if (arr[j] > arr[j + 1]) {
// 			temp = arr[j];
// 			arr[j] = arr[j + 1];
// 			arr[j + 1] = temp;
// 		}
// 	}
// }
// console.log(arr);


//快速排序
var quickSort = function(array) {
	if (array.length <= 1) return array;
	var leftArr = [];
	var rightArr = [];
	var baseArr = array[0];

	for (var i = 1; i < array.length; i++) {
		if (array[i] > baseArr) {
			rightArr.push(array[i]);
		} else {
			leftArr.push(array[i]);
		}
	}

	return quickSort(leftArr).concat(baseArr,quickSort(rightArr));
}

console.log(quickSort(arr));