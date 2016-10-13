var app = angular.module('page', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        
        templateUrl: '/app/views/home.html'
    })
    .when('/about-us',{
        
        templateUrl: '/app/views/about-us.html'
    })
    .when('/dishes',{
        
        templateUrl: '/app/views/dishes.html'
    })
    .when('/take-your-seat',{
        
        templateUrl: '/app/views/take-your-seat.html'
    })
    .when('/contact-us',{
        
        templateUrl: '/app/views/contact-us.html'
    })
    .when('/dishes/meat',{
        templateUrl:'/app/views/dishes.html'
    })
    .when('/dishes/fish-chicken',{
        templateUrl:'/app/views/dishes.html'
    })
    .when('/dishes/salad',{
        templateUrl:'/app/views/dishes.html'
    })
    .otherwise({
        redirectTo:'/'
    });
});

app.controller("contactFormController", function($scope){
    $scope.list =[];
    $scope.saveForm = function(){
        $scope.list.push({
            name:$scope.contactForm.name,
            email:$scope.contactForm.email,
            birthdate:$scope.contactForm.birthdate,
            gender:$scope.contactForm.gender,
            message:$scope.contactForm.message
        });
    };
    $scope.checkSubmit = function(){
        if($scope.list.length > 0){
            
        }
    }
});


app.controller('SeatController', function($scope){
    $scope.selectedSeatsLists=[];
    $scope.selectSeats = function(clickedTable){
        $scope.displayModal=true;
        $scope.table= clickedTable;
        $scope.checkTable();
        $scope.seatsAvailable= $("[class*='"+clickedTable+"__seat']").length;
    };
    $scope.saveSeats = function(){
        $scope.selectedSeatsLists.push({
            table: $scope.table,
            seatsSelected: $scope.seatsNumber,
            name: $scope.seat.user.name
        });
        $scope.displayModal = false;

        $scope.seatsNumber=1;
        $scope.seat.user.name = '';

        angular.forEach($scope.selectedSeatsLists, function(item, index){
            $("[class*='" + item.table + "__table']").attr("fill","red");
            $("[class*='" + item.table + "__seat']:lt(" + item.seatsSelected + ")").attr("fill","red");
        });
    };
    $scope.checkTable = function(){
        $scope.tableTaken = false;
        for(var i = 0; i < $scope.selectedSeatsLists.length; i++) {
            if ($scope.selectedSeatsLists[i].table == $scope.table) {
                $scope.tableTaken = true;
                $scope.tableOwner = $scope.selectedSeatsLists[i].name;
                break;
            }
        }
    };
   
});

app.controller('DishesController', function($scope){
    $scope.dishesTypes ={
        "type":"select",
        "name":"DishesTypes",
        "value":"",
        "values":["", "Meat", "Fish and Chicken", "Salad"]
    };

    
    $scope.dishes = [
        {
            type:'Meat', 
            name:'Roastbeef',
            ingredients: 'Boneless rump roast, olive oil, garlic, salt, pepper, red wine and corn starch',
            description: 'A delicious roast beef you will never forget',
            price: '$15'
        },
        {
            type:'Fish and Chicken', 
            name:'Fresh Salmon',
            ingredients: 'Fresh sliced salmon and shoyu',
            description: 'Enjoy this traditional oriental dish',
            price: '$10'
        },
        {
            type:'Fish and Chicken', 
            name:'Fried Chicken',
            ingredients: 'Flour, garlic salt, paprika, pepper, eggs, water, poultry, mayonese',
            description: 'The unforgetable taste of our main dish',
            price: '$20'
        },
        {
            type:'Salad', 
            name:'Ceaser Salad',
            ingredients: 'romaine lettuce, croutons, parmesan cheese, lemon juice, olive oil, egg, worcestershire sauce, anchovies, garlic and black pepper',
            description: 'A healthy and great salad',
            price: '$7'
        }
    ]

});