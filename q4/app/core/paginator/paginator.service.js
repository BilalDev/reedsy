(function(){
    'use strict';

    angular
        .module('core.paginator')
        .factory('Paginator', Paginator)

    function Paginator() {

        function GetPager(totalItems, pageSize, currentPage = 1) {
            let totalPages = Math.ceil(totalItems / pageSize);
            let startIndex = (currentPage - 1) * pageSize;
            let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            return {
                totalPages: totalPages,
                startIndex: startIndex,
                endIndex: endIndex,
                currentPage: currentPage
            };
        }

        return {
            GetPager: GetPager
        };
    }

}());


