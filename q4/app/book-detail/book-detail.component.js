(function () {
    'use strict';

    angular
        .module ('bookDetail')
        .component ('bookDetail', bookDetail());


    function bookDetail() {

        function BookDetailCtrl() {
            var vm = this;

            init();

            function init() {
                vm.showDesc = false;
            }
        }

        return {
            bindings: {
                book: '='
            },
            controller: BookDetailCtrl,
            controllerAs: 'bookDetailCtrl',
            templateUrl: 'book-detail/book-detail.template.html'
        }
    }

} ());
