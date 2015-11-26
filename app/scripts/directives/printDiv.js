'use strict';

angular.module('oficiosApp')
  .directive('printDiv', function () {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function(evt){    
        evt.preventDefault();    
        PrintElem(attrs.printDiv);
      });

      function PrintElem(elem)
      {
        PrintWithIframe($(elem).html());
      }

      function PrintWithIframe(data) 
      {
        //if ($('iframe#printf').size() == 0) {
          //$('html').append('<iframe id="printf" name="printf"></iframe>');  // an iFrame is added to the html content, then your div's contents are added to it and the iFrame's content is printed

          //var mywindow = window.frames["printf"];
          var mywindow = window.open('', 'my div', 'height=800,width=1000');
          mywindow.document.write('<html><head><title></title><style>@page {margin: 25mm 0mm 25mm 5mm}</style>'  // Your styles here, I needed the margins set up like this
                          +'<link rel="stylesheet" type="text/css" href="styles/turno-paquete.css" />'
                          +'<script src="bower_components/angular/angular.js"></script>'
                          + '</head><body><div>'
                          + data
                          + '</div></body></html>');

          $(mywindow.document).ready(function(){
            mywindow.print();
            //mywindow.close();
             /*
            setTimeout(function(){
              $('iframe#printf').remove();
            },
            1000);  // The iFrame is removed 2 seconds after print() is executed, which is enough for me, but you can play around with the value
            */
          });
        //}

        return true;
      }
    }
  };
});