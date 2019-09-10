(function () {
    'use strict';

    angular
        .module ('bookList')
        .component ('bookList', bookList());


    function bookList() {
        var url = `https://api.nytimes.com/svc/books/v3/lists/current/religion-spirituality-and-faith.json?api-key=hH2btkdterQdVIn4GIxKW6NyGUAp9qGO`;
        function BookListCtrl() {
            var vm = this;

            init();

            function init() {
            }
        }

        BookListCtrl.$inject = [];

        return {
            bindings: {},
            controller: BookListCtrl,
            controllerAs: 'bookListCtrl',
            templateUrl: 'book-list/book-list.template.html'
        }
    }

} ());
