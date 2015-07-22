describe("Silanis lottery Test Suite", function () {

    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
        setFixtures($('<input id="userName" type="text" />').val("abc"));
    }));

    describe('Functionality test', function () {
        it('modeChange() must change the variable', function () {
            var $scope = {};
            var controller = $controller('MainCtrl', {$scope: $scope});
            $scope.modeChange("home");
            expect($scope.mode).toEqual("home");
        });

        it('purchase() must Add new user', function () {
            var $scope = {};
            var controller = $controller('MainCtrl', {$scope: $scope});
            $scope.people = [];
            var item = {userName: "user1"};
            result = $scope.Lottery.purchase(item);
            expect($scope.people.length).toEqual(1);
        });

        it('rand() must generate an array with length of 3', function () {
            var $scope = {};
            var controller = $controller('MainCtrl', {$scope: $scope});
            $scope.people = ["user1", "user2", "user3", "user4"]
            result = $scope.Lottery.rand();
            expect(result.length).toEqual(3);
        });

        it('rand() must generate an array with unique values', function () {
            var $scope = {};
            var controller = $controller('MainCtrl', {$scope: $scope});
            $scope.people = ["user1", "user2", "user3", "user4"]
            result = $scope.Lottery.rand();
            sorted_arr = result.sort();
            results = [];
            for (var i = 0; i < result.length - 1; i++) {
                if (sorted_arr[i + 1] == sorted_arr[i]) {
                    results.push(sorted_arr[i]);
                }
            }
            expect(results.length).toEqual(0);
        });

        it('checkUser() must find the duplicated user', function () {
            var $scope = {};
            var controller = $controller('MainCtrl', {$scope: $scope});
            $scope.people = ["user1", "user2", "user3", "user4"];
            result = $scope.Lottery.checkUser("user3");
            expect(result).toEqual(false);
        });

        it('draw() must calculate the prizes', function () {
            var $scope = {};
            var controller = $controller('MainCtrl', {$scope: $scope});
            $scope.people = [];
            $scope.pot = 200;
            for (var i = 0; i < 50; i++) {
                $scope.people[i] = "user" + i;
                $scope.pot += 10;
            }
            result = $scope.Lottery.draw();
            expect($scope.result["pot"]).toEqual(349);
        });
    });
});