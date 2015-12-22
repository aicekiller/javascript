angular.module('test', [])
	.controller('testCtrl', function($scope) {
		$scope.city = '上海';
		$scope.Cities = [{
			id: 1,
			name: '东京',
			group: '日本'
		}, {
			id: 2,
			name: '上海',
			group: '中国'
		}, {
			id: 3,
			name: '广州',
			group: '中国'
		}];


		$scope.provinceArr = ['湖北', '湖南'];
		$scope.cityArr = [];
		

	});