(function(){
    'use strict';

    angular
        .module('core.capitalizor')
        .filter('capitalizor', Capitalizor)

    function Capitalizor() {

        return CapitalizorFn;

        function CapitalizorFn(input) {
            if (input != null) {
                input = input.toLowerCase();
            }

            return input.substring(0, 1).toUpperCase() + input.substring(1);
        }
    }

}());