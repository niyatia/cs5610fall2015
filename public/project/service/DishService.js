"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("DishService", DishService);

    function DishService() {

        var dishes = [{
            title: "Paratha",
            cuisine: "Indian",
            type: "Vegan",
            price: 10.00,
            quantity: 3,
            ingredients: "abc, def, ghi,jkl",
            img: "indian.jpg",
            chef: "niyati",
            user: "test"
        },
            {
                title: "Pizza",
                cuisine: "Italian",
                type: "Vegetarian",
                price: 15.00,
                quantity: 8,
                ingredients: "abc, def, ghi,jkl",
                img: "indian2.jpg",
                chef: "niyati",
                user: "test"
            },
            {
                title: "Fried Rice",
                cuisine: "Thai",
                type: "Glutten-free",
                price: 5.00,
                quantity: 5,
                ingredients: "abc, def, ghi,jkl",
                img: "indian3.jpg",
                chef: "test",
                user: "niyati"
            }];

        var service = {
            filterDishByUsername: filterDishByUsername,
            findAllDishes: findAllDishes,
            createDish: createDish,
            deleteDishById: deleteDishById,
            updateUser: updateUser
        };

        function filterDishByUsername(username, callback) {
            var temp = [];
            for(var i in dishes) {
                console.log(dishes[i]);
                if (dishes[i].chef == username) {
                    temp.push(dishes[i]);
                }
            }
            callback(temp);
        }

        function findAllDishes(callback) {
            callback(dishes);
        }

        function createDish(newDish, callback) {
            newDish.id = guid();

            dishes.push(newDish);
            callback(newDish);
        }

        function deleteDishById(dishId, callback) {
            for(var i in dishes) {
                if (dishes[i].id = dishId) {
                    dishes.splice(i,1);
                }
            }
            callback(dishes);
        }

        function updateUser(userId, newUser, callback) {
            for(var i in users) {
                if(users[i].id == userId) {
                    users.splice(i,1);
                    newUser.id = userId;
                    users.push(newUser);
                }
            }
            callback(newUser);
        }


        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        return service;
    }
})();