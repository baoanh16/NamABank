$(document).ready(function () {
	objectFitPolyfill();
	mapBreadcrumb();
	bieuPhiDichVuFilter();
	selectNavigator();
	toggleSearchDesktop();
	namABtnAccessAction();
	listToggleAction();

	matchHeightDesktop();

	toggleTab();
	productRegisterFormMapping();
	homepageHeaderNavMapping();
	headerMobileNavSlideToggle();

	dangKyTheOTPFakeInput();
	newspageHeaderFix();

	nganHangSoMatchHeight();
	doanhNghiepSanPhamChiTietScrollButton();

	$(document).on('afterClose.fb', function (e, instance, slide) {
		$(location).attr('href', '/')
	});
});

function mapBreadcrumb() {
	if ($('.main-breadcrumb').length > 0 && $('.nama-breadcrumb').length > 0) {
		const breadcrumb = $('.main-breadcrumb').detach();
		$(breadcrumb).appendTo('.nama-breadcrumb');
	}
}

function bieuPhiDichVuFilter() {
	$('body').on('click', '#bieuPhiDichVuButton', function () {
		var params = {
			pageUrl: "",
			$data: ""
		};
		params.pageUrl = $("#bieuPhiDichVuSelect").val();
		if ("" != params.pageUrl) {
			return $.ajax({
				url: params.pageUrl,
				type: "POST",
				data: {
					isajax: !0
				},
				success: function (data) {
					params.$data = $(data);
					$(".ajaxZoneResponse").html(params.$data.find(".ajaxZoneResponse").html());
					$(".ajaxNewsResponse").html(params.$data.find(".ajaxNewsResponse").html());
					$(".newspager").remove();
					if (params.$data.find(".newspager").length) {
						params.$data.find(".newspager").detach().insertAfter('.ajaxNewsResponse');
					}
				},
				complete: function () {
					// params.pageUrl != window.location && window.history.pushState({
					//     path: params.pageUrl
					// }, "", params.pageUrl)
				}
			});
		}
	});
}

function selectNavigator() {
	$('body').on('change', ".selectNavigator", function () {
		var url = $(this).val();
		if (url === null || url === undefined || url.length === 0) {
			window.location.href = '/';
		} else {
			window.location.href = url;
		}
	})
}

function toggleSearchDesktop() {
	$('body').on('click', "#searchModuleBtnToggle", function () {
		$('#searchModule').toggleClass('active');
	});
}

function matchHeightDesktop() {
	if ($(window).outerWidth() >= 992) {
		var elements = $('[data-match-height-desktop]').get(),
			element = null;
		for (var i = 0, length = elements.length; i < length; i++) {
			element = elements[i];
			$(element).outerHeight($(element.dataset.matchHeightDesktop).outerHeight());
		}
	}
}

function objectFitPolyfill() {
	// Internet Explorer 6-11
	const isIE = /*@cc_on!@*/ false || !!document.documentMode;

	// Edge 20+
	const isEdge = !isIE && !!window.StyleMedia;

	if (isIE === true || isEdge === true) {
		$('[data-object-fit-cover]').each(function (index, element) {
			let src = $(element).attr('data-src');
			if (src === undefined) {
				src = $(element).attr('src')
			}
			$(element).css('display', 'none');
			$(element).parent().css({
				'background-image': "url('" + src + "')",
				'background-repear': 'no-repeat',
				'background-size': 'cover',
				'background-position': 'center center'
			});
		});
		$('.objectfit-cover').each(function (index, element) {
			let src = $(element).attr('data-src');
			if (src === undefined) {
				src = $(element).attr('src')
			}
			$(element).css('display', 'none');
			$(element).parent().css({
				'background-image': "url('" + src + "')",
				'background-repear': 'no-repeat',
				'background-size': 'cover',
				'background-position': 'center center'
			});
		});
	}
}

function toggleTab() {
	if ($(window).outerWidth() < 992) {
		$("body").on("change", ".tab-links-mobile", function () {
			const tabId = '#' + $(this).val();
			//Fade the corresponding tab content in
			$(tabId).siblings().fadeOut(0);
			$(tabId).fadeIn(250);
		})
	} else {
		$("body").on("click", ".tab-link", function () {
			const tabId = '#' + $(this).attr('data-tab');

			//Toggle tab-link active state
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');

			//Fade the corresponding tab content in
			$(tabId).siblings().fadeOut(0);
			$(tabId).fadeIn(250);
		})
	}
}

function productRegisterFormMapping() {
	if ($('#ctl00_mainContent_ctl00_ctl00_registerOpenCardControl_regiterForm').length && $('#section-5').length) {
		var formHtml = $('#ctl00_mainContent_ctl00_ctl00_registerOpenCardControl_regiterForm').detach()[0].outerHTML;
		if ($('.nama-the-sanpham-ct-1').length) {
			$(formHtml).insertAfter('#section-6');
			$('.nama-the-sanpham-ct-6').attr('id', 'section-7')
		} else {
			$(formHtml).insertAfter('#section-5');
		}
	}
}

function homepageHeaderNavMapping() {
	if ($('.homepage').length) {
		var headerHtml = $('.Module-332').detach()[0].outerHTML;
		$('header .bottom-list-page').empty();
		$(headerHtml).appendTo('header .bottom-list-page');
	}
}

function headerMobileNavSlideToggle() {
	if ($(window).outerWidth() < 992) {
		$('body').on('click', '.nama-header .top-wrap .main-wrap .top-list-page ul li a .icon', function (e) {
			e.preventDefault();
			$(this).parent().parent().siblings().removeClass('active');
			$(this).parent().parent().addClass('active');
		});
	}
}

function dangKyTheOTPFakeInput() {
	$('body').on('input', '.dangkythe .otp-input > input[type="text"]', function () {
		var otpValue = $(this).val();
		var otpInputFieldSelector = $('.dangkythe .otp-input-field > div');
		var text = '';
		for (var i = 0; i < 6; i++) {
			text = otpValue[i] !== undefined ? otpValue[i] : '';
			otpInputFieldSelector.eq(i).children('.otp-text').text(text);
		}
	});
}

function newspageHeaderFix() {
	if ($('.nama-tinct-ct-1').length) {
		$('body').addClass('tintuc-trangchu')
	}
}

function nganHangSoMatchHeight() {
	if ($(window).outerWidth() >= 992) {
		if ($('.nama-nganhangso-4').length) {
			var imageHeight = $('.nama-nganhangso-4 .top-list .top-item .image').outerHeight();
			var colHeight = $('.nama-nganhangso-4 .top-list .col-lg-6 .part-item').outerHeight();

			var height = colHeight - imageHeight;
			$('.nama-nganhangso-4 .top-list .top-item figcaption').outerHeight(height);
		}
	}
}

function doanhNghiepSanPhamChiTietScrollButton() {
	$('body').on('click', '.dn-sanpham-ct-1 .btn-register', function () {
		$('html, body').animate({
			'scrollTop': $('#section-6').offset().top - $('header').outerHeight() + 'px'
		}, 1000);
	});
}

function namABtnAccessAction() {
	$('body').on('click', '.nama-truycapnhanh-button a', function () {
		$.fancybox.open({
			src: "#nama-right-nav-popup",
			type: 'inline',
			opts: {
				baseClass: "popup-truycapnhanh",
				parentEl: 'form'
			}
		});
	});
}

function listToggleAction() {
	$('body').on('click', '.list-toggle .title', function () {
		var parentElement = $(this).parent();
		if (parentElement.hasClass('active')) {
			parentElement.removeClass('active');
		} else {
			parentElement.siblings().removeClass('active');
			parentElement.addClass('active');
			$('html, body').animate({
				scrollTop: $(this).offset().top - $('header').outerHeight() - 15 + 'px'
			});
		}

	});
}