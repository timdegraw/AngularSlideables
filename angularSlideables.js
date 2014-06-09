angular.module('angularSlideables', [])
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target, content;
            var duration = '1s';
            
            attrs.$observe('duration', function(val){
                if(val) {
                    var re = /s$/;
                    duration = parseInt(val.replace(re, ""))*1000;
                }
            });
            
            attrs.expanded = false;
            
            element.bind('click', function() {
                if (!target) target = document.querySelector(attrs.slideToggle);
                if (!content) content = target.querySelector('.slideable_content');
                
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                    
                    $timeout(function() {
                        target.style.height =  "auto";
                    }, duration);
                    
                } else {
                    var y = content.clientHeight;
                    target.style.height = y + 'px';                    
                    $timeout(function() {
                        target.style.height =  "0px";
                    },1);
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});