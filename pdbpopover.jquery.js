/* ===================================================
 * pdbpopover.jquery.js
 * https://github.com/AntonPetrov/pdbpopover
 * ===================================================
 *
 * jQuery plugin that complements the Twitter Bootstrap popover plugin
 * for displaying information about RNA-containing PDB files.
 * Relies on [RNA 3D Hub](http://rna.bgsu.edu/rna3dhub) for data.
 * ========================================================== */

;(function($) {

    var isVisible = false;

    var methods = {

        init: function () {
            $('html').click(function (e) {
                console.log('outside click');
                if (isVisible) {
                    $('.pdb').popover('destroy');
                    isVisible = false
                }
            });
        },

        lookUpInfo: function() {
            var a = $(this);

            re = /[a-zA-Z0-9]{4}/;
            pdb = re.exec(a.text());

            $.post($.fn.pdbInfo.options.serverUrl, {
                pdb: pdb[0]
            }, function (data) {
                console.log(data);
                a.popover({
                    content: data,
                    title: pdb[0],
                    delay: 1200,
                    html: true,
                    animation: true,
                    placement: 'bottom'
                });
                a.popover('show');
                isVisible = true;
          });
        }

    };

    // plugin initialization
    $.fn.pdbInfo = function ( options ) {

        methods.init();

        $.fn.pdbInfo.options = $.extend( {}, $.fn.pdbInfo.options, options );

        // initialize model state for each element
        return this.each( function() {
            var $this = $(this);
            $this.click(methods.lookUpInfo);
        });

    };

    // default options
	$.fn.pdbInfo.options = {
        serverUrl   : 'http://rna.bgsu.edu/rna3dhub/rest/getPdbInfo'
	};

})(jQuery);
