angular.module('app', [])
        .controller('MainCtrl', function ($scope, $timeout) {
            $scope.title = "Silanis lottery";
            $scope.full = "no";
            $scope.people = [];
            $scope.pot = 200;
            $scope.loading = false;
            $scope.isActive = "home";
            $scope.result = [];
            $scope.modeChange = function (mode) {
                $scope.mode = mode;
                $scope.isActive = mode;
                $scope.errorMessage = "";
                $scope.drawMessage = "";
            };
            $scope.Lottery = {
                purchase: function (item) {
                    console.log(item);
                    if (document.getElementById("userName").value != "") {
                        $scope.errorMessage = "";
                        if (this.checkUser(item.userName)) {
                            $scope.people.push(item.userName);
                            $scope.pot += 10;
                            document.getElementById("userName").value = "";
                            document.getElementById("userName").focus();
                            $scope.errorMessage = "";
                        } else {
                            $scope.errorMessage = "User already exists";
                        }
                        if ($scope.people.length == 50) {
                            $scope.full = "yes";
                            $scope.errorMessage = "The pot is full";
                        }
                    } else {
                        $scope.errorMessage = "The field is empty";
                    }
                },
                draw: function () {

                    if ($scope.people.length < 4) {
                        $scope.drawMessage = "Drawing is not possible because you didn't sell enough tickets";
                    } else {
                        $scope.loading = true;
                        $scope.drawMessage = "";
                        totalPrize = $scope.pot / 2;
                        firstPrize = Math.round((totalPrize * 75) / 100);
                        secondPrize = Math.round((totalPrize * 15) / 100);
                        thirddPrize = Math.round((totalPrize * 10) / 100);
                        ranks = this.rand();
                        $scope.pot = $scope.pot - (firstPrize + secondPrize + thirddPrize);
                        $scope.result["winner1"] = $scope.people[ranks[0]];
                        $scope.result["winner2"] = $scope.people[ranks[1]];
                        $scope.result["winner3"] = $scope.people[ranks[2]];
                        $scope.result["firstPrize"] = firstPrize;
                        $scope.result["secondPrize"] = secondPrize;
                        $scope.result["thirddPrize"] = thirddPrize;
                        $scope.result["totalSold"] = $scope.people.length;
                        $scope.result["pot"] = $scope.pot;
                        $scope.people = [];
                        $timeout(function () {
                            $scope.loading = false;
                            $scope.showResult = true;
                            $scope.modeChange("winners");
                        }, 2000);
                    }
                },
                checkUser: function (userName) {
                    for (var i = 0; i < $scope.people.length; i++) {
                        if ($scope.people[i] == userName) {
                            return false;
                        }
                    }
                    return true;
                },
                rand: function () {
                    rands = [];
                    while (rands.length < 3) {
                        var x = Math.floor((Math.random() * $scope.people.length) + 0);
                        token = true;
                        for (var i = 0; i < rands.length; i++) {
                            if (rands[i] == x) {
                                token = false;
                            }
                        }
                        if (token) {
                            rands.push(x);
                        }
                    }
                    return rands;
                }
            };
            $scope.modeChange("home");

        });
        