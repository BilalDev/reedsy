(function () {
    'use strict';

    angular
        .module ('bookList')
        .component ('bookList', bookList());


    function bookList() {
        var url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=hH2btkdterQdVIn4GIxKW6NyGUAp9qGO`;
        function BookListCtrl($http) {
            var vm = this;

            init();

            function init() {
                $http.get(url)
                .then(response => {
                    if (response.data.status === 'OK') {
                        return response.data.results;
                    }
                })
                .then(response => {
                    vm.items = response.books;
                })
                .catch(error => {
                    vm.error = error.data.fault.faultstring;
                });
            }
        }

        BookListCtrl.$inject = ['$http'];

        return {
            bindings: {},
            controller: BookListCtrl,
            controllerAs: 'bookListCtrl',
            templateUrl: 'book-list/book-list.template.html'
        }
    }

} ());
