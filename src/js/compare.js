;
var siteRoot = '';
$(document).ready(function () {

    
    /// Begin compare           
    $('.btn_compare').on("click", function (e) {
		$(this).addClass('active')
        addProductToCompareList($(this).attr('data-productid'));
        e.preventDefault();
    });

    $('.compare-item').on('click', '.remove-cpr', function (e) {
        removeProductFromCompareList($(this).attr('data-productid'));
        e.preventDefault();
    });
    function addProductToCompareList(productId) {
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/Services/CompareService.ashx",
            data: {
                'productid': productId,
                'type': 1
            },
            dataType: "json",
            success: function (result) {
                BuildCompareList(result);
            },
            failure: function (data) {
                console.log("Action error with action:" + action);
            }
        });
    }

     function removeProductFromCompareList(productId,load) {
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/Services/CompareService.ashx",
            data: {
                'productid': productId,
                'type': 2
            },
            dataType: "json",
            success: function (result) {
                   BuildCompareList();
				   if(load!=true)
					location.reload(); 
                
            },
            failure: function (data) {
                console.log("Action error with action:" + action);
            }
        });
    }

    function BuildCompareList(result) {
        $('.number-compare').text(result.length);
    }
 //$('.photo-slide').slick({
 //       slidesToShow: 4,
 //       slidesToScroll: 1,
 //       autoplay: false,
 //       dots: false,
 //       swipe: true,
 //       swipeToSlide: true,
 //       infinite: false,
 //       arrows: true,
 //       responsive: [{
 //           breakpoint: 1199,
 //           settings: {
 //               slidesToShow: 3
 //           }
 //       }, {
 //           breakpoint: 991,
 //           settings: {
 //               slidesToShow: 4
 //           }
 //       }, {
 //           breakpoint: 767,
 //           settings: {
 //               slidesToShow: 3
 //           }
 //       }, {
 //           breakpoint: 543,
 //           settings: {
 //               slidesToShow: 2
 //           }
 //       }]
 //   });

	

})
