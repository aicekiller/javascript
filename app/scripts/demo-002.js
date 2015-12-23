angular.module('test', [])
	.controller('testCtrl', function($scope, $http,$q) {
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
		//$scope.selectedProvince = '湖北';
		$scope.$watch('selectedProvince', function(province) {
			switch (province) {
				case '湖北':
					{
						$scope.cityArr = ['十堰', '武汉'];
						break;
					}
				case '湖南':
					{
						$scope.cityArr = ['岳阳', '长沙'];
						break;
					}
			}
		});


		$scope.nationArr = ['中国'];
		$scope.nationName = '中国';

		// $http.get('../json/sf.b2c.mall.regions.json').success(function(data) {
		// 	console.log(data);
		// })
		var cityURL = 'json/sf.b2c.mall.regions.json'
		delay = $q.defer();
		$http.get(cityURL).success(function(data) {
      return delay.resolve(data);
    });

	});