angular.module("App").controller("MainCtrl", ["$scope", "$element", function MainCtrl($scope, $element) {
    var inputFile = $element.find("input[type=file]");

    inputFile.bind("change", function (e) {
        console.log("change");

        $scope.safeApply(function () {
            for (var i = 0; i < e.target.files.length; i++) {
                var file = e.target.files[i];

                $scope.files.push(new FileModel(file));
            }
        });
    });

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.files = [];

    $scope.selectFiles = function () {
        console.log("before");

        inputFile.val("");

        inputFile.trigger("click");
        console.log("after");
    }

    $scope.upload = function () {
        for (var i = 0; i < $scope.files.length; i++) {
            var fileModel = $scope.files[i];
            if (fileModel.completed) {
                continue;
            }

            uploadFile(fileModel);
        }
    }

    $scope.clear = function () {
        $scope.files = [];
    }

    $scope.getIndicatorStyle = function (fileModel) {
        return { width: fileModel.percentCompleted + "%" };
    }

    function uploadFile(fileModel) {
        var file = fileModel.file;

        var formData = new FormData();
        formData.append("files", fileModel.file);

        fileModel.percentCompleted = "0";

        $.ajax({
            url: applicationPath + "/Home/Upload",
            type: "POST",
            data: formData,
            success: function () {
                $scope.$apply(function () {
                    fileModel.completed = true;
                });
            },
            error: function () {
                $scope.$apply(function () {
                    fileModel.error = true;
                });
            },
            xhr: function () {
                var xhr = new XMLHttpRequest();

                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var percentCompleted = Math.ceil(e.loaded / e.total * 100);

                        $scope.$apply(function () {
                            fileModel.percentCompleted = percentCompleted;
                        });
                    }
                });

                return xhr;
            },
            processData: false,
            contentType: false,
        });
    }

    function FileModel(file) {
        var me = this;

        me.name = file.name;
        me.size = file.size;
        me.percentCompleted = 0;
        me.file = file;
    }
}]);

