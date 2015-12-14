"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("AddDishController", AddDishController)

    function AddDishController ($scope, $rootScope, $location, DishService) {

        var model = this;
        var image, resizedImage;

        getCuisines();
        getTypes();
        function getCuisines() {
            DishService.getCuisines().then(function(cuisines) {
                model.cuisines = cuisines;
            });
        }

        function getTypes() {
            DishService.getTypes().then(function(types) {
                model.types = types;
            });
        }
        model.add = add;

        function add(newDish){
            console.log(image);
            console.log(image);
            if($rootScope.image) {
                console.log($rootScope.resizedImage);
                newDish.image = $rootScope.resizedImage;
            }
            console.log(newDish);

           // model.recipe.image = model.image;
            newDish.chef = $rootScope.loggedInUser.username;
            newDish.chefEmail = $rootScope.loggedInUser.email;
            DishService.createDish(newDish)
                .then(function (recipe){
                    console.log(recipe);
                    $location.url("/chef-home");
            });
        }

        // To capture the image
        $scope.imageChanged = ImageChanged
        function ImageChanged(element){
            var fileDisplayArea = document.getElementById('display');
            image = undefined;
            fileDisplayArea.innerHTML = "";

            if(element.files[0] == undefined || element.files[0] == null)
                return;

            var name = element.files[0].name;
            console.log(name);
            if(name.length <= 4)
                alert("The input is invalid");
            else{
                var extension = name.substring(name.length -3, name.length).toLowerCase()
                if(extension != "jpg" && extension != 'png')
                {
                    alert("Please add .png or .jpg image");
                }
                else {
                    var file = element.files[0];
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        var img = new Image(600,400);
                        image = reader.result;
                        img.src = image;
                        img.className = "big-icon";
                        fileDisplayArea.appendChild(img);
                        resizedImage = imageToDataUri(img, 600, 400);
                        $rootScope.image = image;
                        $rootScope.resizedImage = resizedImage;
                    }
                    reader.readAsDataURL(file);
                }
            }
        }

        // To resize the image
        function imageToDataUri(img, width, height) {

            // create an off-screen canvas
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

            // set its dimension to target size
            canvas.width = width;
            canvas.height = height;

            // draw source image into the off-screen canvas:
            ctx.drawImage(img, 0, 0, width, height);

            // encode image to data-uri with base64 version of compressed image
            return canvas.toDataURL();
        }

        console.log($rootScope.loggedInUser);
        model.user = $rootScope.loggedInUser;
    }
}) ();