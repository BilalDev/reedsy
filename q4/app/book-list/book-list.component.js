(function () {
    'use strict';

    angular
        .module ('bookList')
        .component ('bookList', bookList());


    function bookList() {
        var url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=hH2btkdterQdVIn4GIxKW6NyGUAp9qGO`;
        function BookListCtrl($http, Paginator) {
            var vm = this;
            vm.pager = {};
            vm.setPage = setPage;

            init();

            function setPage(page) {
                vm.pager = Paginator.GetPager(vm.books.length, 5, page);
                vm.items = vm.books.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
            }

            function init() {
                $http.get(url)
                .then(response => {
                    if (response.data.status === 'OK') {
                        return response.data.results;
                    }
                })
                .then(response => {
                    vm.books = response.books;
                    vm.setPage(1);
                })
                .catch(error => {
                    vm.error = error.data.fault.faultstring;
                });
            }
        }

        BookListCtrl.$inject = ['$http', 'Paginator'];

        return {
            bindings: {},
            controller: BookListCtrl,
            controllerAs: 'bookListCtrl',
            templateUrl: 'book-list/book-list.template.html'
        }
    }

} ());
