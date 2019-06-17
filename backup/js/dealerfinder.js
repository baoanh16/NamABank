var map, geocoder, image, shadow, currCulture, region = "vn",
    markers = new Array,
    distancenode = "",
    distancecode = 0,
    themiles = "",
    thekm = "",
    arr = new Array,
    totalrec = 0,
    iconUrl = "/Data/Sites/1/media/default/map-icon.png",
    shadowUrl = "/Data/Sites/1/skins/default/images/map-shadow.png",
    zoomInit = 6,
    zoom = 12,
    latInit = 16.80299561823568,
    lngInit = 107.08573669062503,
    lang = {};

function initmap() {
    if ($("#map_canvas").length) {
        geocoder = new google.maps.Geocoder;
        var e = new google.maps.LatLng(latInit, lngInit),
            t = {
                zoom: zoomInit,
                center: e,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        map = new google.maps.Map(document.getElementById("map_canvas"), t), $("#map_canvas").show()
    }
}

function get_coordinate(e, t) {
    null != t && "" != t && "undefined" != t || (t = "vn"), "" != e && ($("#ajax_msg").html("<p>Loading location</p>"), geocoder.geocode({
        address: e,
        region: t
    }, function (e, t) {
        if (t == google.maps.GeocoderStatus.OK) {
            $("#ajax_msg").html("<p></p>"), $("#latitude").val(e[0].geometry.location.lat()), $("#longitude").val(e[0].geometry.location.lng()), map.setZoom(15), map.setCenter(e[0].geometry.location);
            new google.maps.Marker({
                map: map,
                position: e[0].geometry.location
            })
        } else $("#ajax_msg").html("<p>Google map geocoder failed: " + t + "</p>")
    }))
}

function gmap_location_lookup(e, t, a, n, i) {
    null != a && "" != a || (a = "vn"), distancecode = 1, "" != e ? ($("#map_canvas").html("<img src='/Data/SiteImages/indicators/indicator1.gif' alt='Ajax Loading Image' />").show(), $("#ajax_msg").hide(), (geocoder = new google.maps.Geocoder).geocode({
        address: e,
        region: a
    }, function (e, a) {
        if (a == google.maps.GeocoderStatus.OK) {
            lat = e[0].geometry.location.lat(), lng = e[0].geometry.location.lng(), myOptions = {
                zoom: zoom,
                center: new google.maps.LatLng(lat, lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }, null != n && null != i && (myOptions = {
                zoom: zoom,
                center: new google.maps.LatLng(n, i),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }), map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            var o = {
                coord: [31, 0, 32, 1, 33, 2, 33, 3, 33, 4, 33, 5, 33, 6, 33, 7, 33, 8, 33, 9, 33, 10, 33, 11, 33, 12, 33, 13, 33, 14, 33, 15, 33, 16, 33, 17, 33, 18, 33, 19, 33, 20, 33, 21, 33, 22, 33, 23, 33, 24, 33, 25, 33, 26, 33, 27, 33, 28, 33, 29, 33, 30, 33, 31, 33, 32, 32, 33, 31, 34, 29, 35, 26, 36, 25, 37, 25, 38, 24, 39, 23, 40, 23, 41, 22, 42, 22, 43, 21, 44, 20, 45, 16, 45, 15, 44, 14, 43, 14, 42, 13, 41, 13, 40, 12, 39, 12, 38, 11, 37, 10, 36, 6, 35, 4, 34, 3, 33, 2, 32, 1, 31, 1, 30, 0, 29, 0, 28, 0, 27, 0, 26, 0, 25, 0, 24, 0, 23, 0, 22, 0, 21, 0, 20, 0, 19, 0, 18, 0, 17, 0, 16, 0, 15, 0, 14, 0, 13, 0, 12, 0, 11, 0, 10, 0, 9, 0, 8, 0, 7, 0, 6, 0, 5, 1, 4, 1, 3, 2, 2, 3, 1, 4, 0, 31, 0],
                type: "poly"
            };
            jQuery.each(markers, function (e, t) {
                t.setMap(null)
            }), $("#list").empty();
            var l = 0;
            $.ajax({
                url: "/DealerLocator/Services/GetDealerXml.ashx",
                dataType: "xml",
                type: "GET",
                data: {
                    distance: t,
                    lat: lat,
                    lng: lng,
                    languageid: $("#hdnDealerLocatorLanguageId").val(),
                    siteid: $("#hdnDealerLocatorSiteId").val(),
                    zoneguid: $("#hdnDealerLocatorZoneGuid").val(),
                    country: $("#ddlCountry").val(),
                    province: $("#ddlProvince").val(),
                    district: $("#ddlDistrict").val()
                },
                success: function (e) {
                    var t = e.documentElement.getElementsByTagName("marker");
                    if (t.length > 0) {
                        totalrec = t.length;
                        var a = new google.maps.InfoWindow({
                            maxWidth: "400",
                            content: ""
                        });
                        $i = 0, jQuery.each(t, function (e, t) {
                            var n = new google.maps.Marker({
                                __gm_id: $i++,
                                map: map,
                                position: new google.maps.LatLng(t.getAttribute("lat"), t.getAttribute("lng")),
                                icon: iconUrl,
                                shadow: shadow,
                                shape: o,
                                title: t.getAttribute("name") + " : " + t.getAttribute("address")
                            });
                            origin = new google.maps.LatLng(lat, lng), dest = new google.maps.LatLng(t.getAttribute("lat"), t.getAttribute("lng")), themiles = "miles", thekm = "km", (new google.maps.DistanceMatrixService).getDistanceMatrix({
                                origins: [origin],
                                destinations: [dest],
                                travelMode: google.maps.TravelMode.DRIVING,
                                unitSystem: google.maps.UnitSystem.METRIC,
                                avoidHighways: !1,
                                avoidTolls: !1
                            }, callback), markers.push(n);
                            var i = info_window_content(t);
                            if (s = "", null != t.getAttribute("cat_img")) var s = '<img src="' + t.getAttribute("cat_img") + '" style="max-width:15px; max-height:15px;" />';
                            l++;
                            var r = "";
                            "" != t.getAttribute("phone") && (r += "<p>" + lang[currCulture].phone + ": " + t.getAttribute("phone") + "</p>"), "" != t.getAttribute("fax") && (r += "<p>Fax: " + t.getAttribute("fax") + "</p>"), "" != t.getAttribute("des") && (r += "<div><span>Giờ làm việc:</span> " + t.getAttribute("des") + "</div>"), l > 9 ? $("<li id='l_" + n.__gm_id + "' class='clinic_list double-digit' />").html("<h5>" + t.getAttribute("name") + "<h5>" + "<p>" + t.getAttribute("address") + "</p>" + r).click(function () {
                                a.setContent(i), a.open(map, n), toggleBounce(n), zoomHere(n.getPosition().lat(), n.getPosition().lng()), $(".btn-mapmenu").trigger("click")
                            }).appendTo("#list") : $("<li id='l_" + n.__gm_id + "' class='clinic_list' />").html("<h5>" + t.getAttribute("name") + "</h5>" + "<p>" + t.getAttribute("address") + "</p>" + r).click(function () {
                                a.setContent(i), a.open(map, n), toggleBounce(n), zoomHere(n.getPosition().lat(), n.getPosition().lng()), $(".btn-mapmenu").trigger("click")
                            }).appendTo("#list"), google.maps.event.addListener(n, "click", function () {
                                $("#list .clinic_list").removeClass("active"), $("#list").animate($("#l_" + n.__gm_id)[0].scrollIntoView(!0)), $("#l_" + n.__gm_id).addClass("active"), toggleBounce(n), a.setContent(i), a.open(map, n)
                            })
                        }), $(".clinic_list").click(function () {
                            $("#list .clinic_list").removeClass("active"), $(this).addClass("active"), $('div[title="Exit Street View"]').trigger("click")
                        }), $("#ajax_msg").html(lang[currCulture].found + "<span class='flash_good'>" + t.length + "</span>" + lang[currCulture].locations + lang[currCulture].searchResultName + lang[currCulture].matchYourSearch).fadeIn()
                    } else initmap(), $("#ajax_msg").html(lang[currCulture].notFound + lang[currCulture].searchResultName + lang[currCulture].matchYourSearch).fadeIn()
                }
            })
        }
    })) : gmap_province_lookup(t, a, n, i)
}

function gmap_province_lookup(e, t, a, n) {
    $("#map_canvas").html("<img src='/Data/SiteImages/indicators/indicator1.gif' alt='Ajax Loading Image' />").show(), $("#ajax_msg").hide();
    var i = {
        coord: [31, 0, 32, 1, 33, 2, 33, 3, 33, 4, 33, 5, 33, 6, 33, 7, 33, 8, 33, 9, 33, 10, 33, 11, 33, 12, 33, 13, 33, 14, 33, 15, 33, 16, 33, 17, 33, 18, 33, 19, 33, 20, 33, 21, 33, 22, 33, 23, 33, 24, 33, 25, 33, 26, 33, 27, 33, 28, 33, 29, 33, 30, 33, 31, 33, 32, 32, 33, 31, 34, 29, 35, 26, 36, 25, 37, 25, 38, 24, 39, 23, 40, 23, 41, 22, 42, 22, 43, 21, 44, 20, 45, 16, 45, 15, 44, 14, 43, 14, 42, 13, 41, 13, 40, 12, 39, 12, 38, 11, 37, 10, 36, 6, 35, 4, 34, 3, 33, 2, 32, 1, 31, 1, 30, 0, 29, 0, 28, 0, 27, 0, 26, 0, 25, 0, 24, 0, 23, 0, 22, 0, 21, 0, 20, 0, 19, 0, 18, 0, 17, 0, 16, 0, 15, 0, 14, 0, 13, 0, 12, 0, 11, 0, 10, 0, 9, 0, 8, 0, 7, 0, 6, 0, 5, 1, 4, 1, 3, 2, 2, 3, 1, 4, 0, 31, 0],
        type: "poly"
    };
    jQuery.each(markers, function (e, t) {
        t.setMap(null)
    }), $("#list").empty();
    var o = $("#hdnDealerLocatorZoneGuid").val(),
        l = zoom,
        s = 0;
    $.ajax({
        url: "/DealerLocator/Services/GetDealerXml.ashx",
        dataType: "xml",
        type: "GET",
        data: {
            distance: e,
            lat: a,
            lng: n,
            languageid: $("#hdnDealerLocatorLanguageId").val(),
            siteid: $("#hdnDealerLocatorSiteId").val(),
            zoneguid: o,
            country: $("#ddlCountry").val(),
            province: $("#ddlProvince").val(),
            district: $("#ddlDistrict").val()
        },
        success: function (e) {
            var t = e.documentElement.getElementsByTagName("marker");
            if (t.length > 0) {
                totalrec = t.length;
                var o = new google.maps.InfoWindow({
                    maxWidth: "400",
                    content: ""
                });
                myOptions = {
                    zoom: l,
                    center: new google.maps.LatLng(t[0].getAttribute("lat"), t[0].getAttribute("lng")),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }, null != a && null != n && (myOptions = {
                    zoom: l,
                    center: new google.maps.LatLng(a, n),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }), map = new google.maps.Map(document.getElementById("map_canvas"), myOptions), $i = 0, jQuery.each(t, function (e, t) {
                    var l = new google.maps.Marker({
                        __gm_id: $i++,
                        map: map,
                        position: new google.maps.LatLng(t.getAttribute("lat"), t.getAttribute("lng")),
                        icon: iconUrl,
                        shadow: shadow,
                        shape: i,
                        title: t.getAttribute("name") + " : " + t.getAttribute("address")
                    });
                    a > 0 && n > 0 && (origin = new google.maps.LatLng(a, n), dest = new google.maps.LatLng(t.getAttribute("lat"), t.getAttribute("lng")), themiles = "miles", thekm = "km", (new google.maps.DistanceMatrixService).getDistanceMatrix({
                        origins: [origin],
                        destinations: [dest],
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        avoidHighways: !1,
                        avoidTolls: !1
                    }, callback));
                    markers.push(l);
                    var r = info_window_content(t);
                    if (d = "", null != t.getAttribute("cat_img")) var d = '<img src="' + t.getAttribute("cat_img") + '" style="max-width:15px; max-height:15px;" />';
                    s++;
                    var c = "";
                    "" != t.getAttribute("phone") && (c += "<p>" + lang[currCulture].phone + ": " + t.getAttribute("phone") + "</p>"), "" != t.getAttribute("fax") && (c += "<p>Fax: " + t.getAttribute("fax") + "</p>"), "" != t.getAttribute("des") && (c += "<div><span>Ưu đãi:</span> " + t.getAttribute("des") + "</div>"), s > 9 ? $("<li id='l_" + l.__gm_id + "' class='clinic_list double-digit' />").html("<h5>" + t.getAttribute("name") + "<h5/>" + "<p>" + t.getAttribute("address") + "</p>" + c).click(function () {
                        o.setContent(r), o.open(map, l), toggleBounce(l), zoomHere(l.getPosition().lat(), l.getPosition().lng()), $(".btn-mapmenu").trigger("click")
                    }).appendTo("#list") : $("<li id='l_" + l.__gm_id + "' class='clinic_list' />").html("<h5>" + t.getAttribute("name") + "</h5>" + "<p>" + t.getAttribute("address") + "</p>" + c).click(function () {
                        o.setContent(r), o.open(map, l), toggleBounce(l), zoomHere(l.getPosition().lat(), l.getPosition().lng()), $(".btn-mapmenu").trigger("click")
                    }).appendTo("#list"), google.maps.event.addListener(l, "click", function () {
                        $("#list .clinic_list").removeClass("active"), $("#list").animate($("#l_" + l.__gm_id)[0].scrollIntoView(!0)), $("#l_" + l.__gm_id).addClass("active"), toggleBounce(l), o.setContent(r), o.open(map, l), map.setZoom(15)
                    })
                }), $(".clinic_list").click(function () {
                    $("#list .clinic_list").removeClass("active"), $(this).addClass("active"), $('div[title="Exit Street View"]').trigger("click")
                }), a > 0 && n > 0 ? $("#ajax_msg").html(lang[currCulture].found + "<span class='flash_good'>" + t.length + "</span>" + lang[currCulture].locations + lang[currCulture].searchResultName + lang[currCulture].nearYourLocation).fadeIn() : $("#ajax_msg").html(lang[currCulture].found + "<span class='flash_good'>" + t.length + "</span>" + lang[currCulture].locations + lang[currCulture].searchResultName + lang[currCulture].matchYourSearch).fadeIn()
            } else initmap(), $("#ajax_msg").html(lang[currCulture].notFound + lang[currCulture].searchResultName + lang[currCulture].matchYourSearch).fadeIn()
        }
    })
}

function sort_distance() {
    var e = 1,
        t = $("#list li").get();
    t.sort(function (e, t) {
        var a = $(e).find("#disval").text(),
            n = $(t).find("#disval").text();
        return Math.round(100 * parseFloat(a)) / 100 < Math.round(100 * parseFloat(n)) / 100 ? -1 : Math.round(100 * parseFloat(a)) / 100 > Math.round(100 * parseFloat(n)) / 100 ? 1 : 0
    });
    var a = $("#list");
    $.each(t, function (t, n) {
        a.append(n), $("#" + $(n).attr("id") + " .number").text(e), e++
    })
}

function toggleBounce(e) {
    $(markers).each(function (t, a) {
        e.__gm_id != a.__gm_id && a.setAnimation(null)
    }), null != e.getAnimation() ? e.setAnimation(null) : e.setAnimation(google.maps.Animation.BOUNCE)
}

function callback(e, t) {
    if (t == google.maps.DistanceMatrixStatus.OK) {
        for (var a = e.originAddresses, n = e.destinationAddresses, i = 0; i < a.length; i++)
            for (var o = e.rows[i].elements, l = 0; l < o.length; l++) {
                var s = o[l];
                if (null != s) {
                    var r = (parseFloat(s.distance.value) / 1e3).toFixed(1),
                        d = "";
                    d = "kms" == $("input[name=distance-units]:checked").val() ? themiles : thekm;
                    s.duration.text, a[i], n[l];
                    arr.push(r)
                }
            }
        if (++distancecode == totalrec + 1) {
            for (distancecode = 0, arr.sort(function (e, t) {
                    return e - t
                }), k = 0; k <= arr.length; k++) $("#d_" + (k + 1) + " .value").html(arr[k]), $("#d_" + (k + 1) + " .units").html(d);
            arr = []
        }
    }
}

function changeDistanceUnits(e) {
    var t = .621371192237334,
        a = $("#results"),
        n = a.find("p.distance-units label"),
        i = a.find(".distance"),
        o = i.find(".units");
    i.find(".value");
    switch (n.removeClass("unchecked"), n.filter(':not([units="' + e + '"])').addClass("unchecked"), e) {
        case "km":
            o.html(" " + thekm + " "), $.each(i, function (e, a) {
                e++, a = $("#d_" + e + " .value").html(), a = parseFloat(a), $("#d_" + e + " .value").text(Math.round(a / t * 100) / 100)
            });
            break;
        case "miles":
            o.html(" " + themiles + " "), $.each(i, function (e, a) {
                e++, a = $("#d_" + e + " .value").html(), a = parseFloat(a), $("#d_" + e + " .value").text(Math.round(a * t * 100) / 100)
            })
    }
}

function info_window_content(e) {
    var t = "<div class='maps_popup'>";
    return t += "<h1>" + lang[currCulture].name + e.getAttribute("name") + "</h1>", null != e.getAttribute("image") && "" != e.getAttribute("image") && (t += "<div class='image'><img src='" + e.getAttribute("image") + "' alt='" + e.getAttribute("name") + "' /></div>"), null != e.getAttribute("address") && "" != e.getAttribute("address") && (t += "<p class='address'><span>" + lang[currCulture].address + ":</span> " + e.getAttribute("address") + "</p>"), null != e.getAttribute("phone") && "" != e.getAttribute("phone") && (t += "<p class='tel'><span>" + lang[currCulture].phone + ":</span> " + e.getAttribute("phone") + "</p>"), null != e.getAttribute("fax") && "" != e.getAttribute("fax") && (t += "<p class='fax'><span>Fax:</span> " + e.getAttribute("fax") + "</p>"), null != e.getAttribute("email") && "" != e.getAttribute("email") && (t += "<p class='email'><span>Email:</span> <a href='mailto:" + e.getAttribute("email") + "'>" + e.getAttribute("email") + "</a></p>"), null != e.getAttribute("website") && "" != e.getAttribute("website") && ("http" != e.getAttribute("website").substring(0, 4) ? t += "<p class='web'><span>Website:</span> <a href='http://" + e.getAttribute("website") + "' target='new'>http://" + e.getAttribute("website") + "</a></p>" : t += "<p class='web'><span>Website:</span> <a href='" + e.getAttribute("website") + "' target='new'>" + e.getAttribute("website") + "</a></p>"), null != e.getAttribute("des") && "" != e.getAttribute("des") && (t += "<p class='description'>" + e.getAttribute("des") + "</p>"), t += "<a href='javascript:zoomHere(" + e.getAttribute("lat") + "," + e.getAttribute("lng") + ");'>" + lang[currCulture].zoom + "</a> ", t += "</div>"
}

function streetView(e, t) {
    street = new google.maps.StreetViewPanorama(document.getElementById("map_canvas"), {
        position: new google.maps.LatLng(e, t),
        zoomControl: !1,
        enableCloseButton: !0,
        addressControl: !1,
        panControl: !0,
        linksControl: !0
    })
}

function zoomHere(e, t) {
    map.setZoom(18);
    var a = new google.maps.LatLng(e, t);
    map.setCenter(a)
}

function direction(e, t, a) {
    $("#direction").show(), $("#results").hide(), $("#dest-direction").val(e), $("#origin-direction").val($("#address").val()), $("#get-direction").click(function () {
        var n = $("#origin-direction").val();
        console.log(1), map.setZoom(7);
        var i = new google.maps.LatLng(t, a);
        map.setCenter(i);
        var o = new google.maps.DirectionsRenderer;
        o.setMap(map), o.setPanel(document.getElementById("direction"));
        var l = new google.maps.DirectionsService,
            s = {
                origin: n,
                destination: e,
                travelMode: google.maps.DirectionsTravelMode.DRIVING,
                unitSystem: google.maps.DirectionsUnitSystem.METRIC
            };
        return l.route(s, function (e, t) {
            t == google.maps.DirectionsStatus.OK ? o.setDirections(e) : $("#direction").append('<table width="100%"><tr><td>' + lang[currCulture].directionNotFound + "</td></tr></table>")
        }), !1
    })
}

function directionBack() {
    $("#direction").hide(), $("#results").show(), resetDirection()
}

function resetDirection() {
    gmap_location_lookup($("#address").val(), $("#distance").val(), ""), $("#direction").html(""), $("#direction").html('<div id="direction-form"><p><table><tr><td>' + lang[currCulture].from + ':</td><td><input id="origin-direction" name="origin-direction" class="orides-txt" type=text /></td></tr><tr><td>' + lang[currCulture].to + ':</td><td><input id="dest-direction" name="dest-direction" class="orides-txt" type=text readonly /></td></tr></table><div id="get-dir-button" class="get-dir-button"><input type=submit id="get-direction" class="btn" value="' + lang[currCulture].direction + '"> <a href="javascript:directionBack()">' + lang[currCulture].back + "</a></div></p></div>");
    new google.maps.places.Autocomplete($("#origin-direction")[0], {})
}
lang.en = {
    name: "",
    searchResultName: "",
    phone: "Phone",
    address: "Address",
    zoom: "Zoom",
    direction: "Direction",
    directionNotFound: "Direction not found. Please try again",
    notFound: "No results ",
    found: "Found ",
    locations: " ",
    matchYourSearch: " match your search",
    nearYourLocation: " near your location",
    from: "From",
    to: "To",
    back: "Back"
}, lang.vi = {
    name: "",
    searchResultName: "",
    phone: "ĐT",
    address: "Địa chỉ",
    zoom: "Phóng to",
    direction: "Tìm đường đi",
    directionNotFound: "Không tìm thấy đường đi. Vui lòng thử lại",
    notFound: "Không tìm thấy địa điểm ",
    found: "Có ",
    locations: " ",
    matchYourSearch: " phù hợp với tìm kiếm của bạn",
    nearYourLocation: " gần với vị trí của bạn",
    from: "Từ",
    to: "Đến",
    back: "Trở lại"
}, $(document).ready(function () {
    //Đẩy cấu trúc trang vào thanh menu của Module Dealer
    if ($('.canhcam-net-1').length) {
        $('#zoneInput').detach().insertAfter('.dealer-zone-mapper');
    }

    $('body').on('change', '#zoneInput', function () {
        window.location.href = $(this).val();
    });


    currCulture = $("#hdfDealerLocatorCulture").val(), image = new google.maps.MarkerImage(iconUrl, new google.maps.Size(34, 46), new google.maps.Point(0, 0), new google.maps.Point(17, 46)), shadow = new google.maps.MarkerImage(shadowUrl, new google.maps.Size(60, 46), new google.maps.Point(0, 0), new google.maps.Point(17, 46)), $("p.distance-units label input:radio").click(function () {
        var e = $(this).parents("label").attr("units");
        $(this).parents("label").hasClass("unchecked") && changeDistanceUnits(e)
    }), initmap();
    new google.maps.places.Autocomplete($("#address")[0], {}), new google.maps.places.Autocomplete($("#origin-direction")[0], {});
    if ($("#edit-submit").length && $("#edit-submit").click(function () {
            return gmap_location_lookup($("#address").val(), $("#distance").val(), region), !1
        }), $("#ddlProvince").length && ($.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/DealerLocator/Services/GeoZoneService.asmx/LoadCountry",
            data: "{'languageId': '" + $("#hdnDealerLocatorLanguageId").val() + "'}",
            dataType: "json",
            success: function (e) {
                var t = $("#ddlCountry");
                $(t).empty(), $(t).append($("<option></option>").val("").html($("#hdfDealerLocatorSelectCountry").val())), $.each(e.d, function (e, a) {
                    $(t).append($("<option></option>").val(a.Key).html(a.Name))
                }), 3 == t.find("option").length && (t.addClass("hidden"), t.find("option").eq(2).prop("selected", !0), $("#ddlCountry").trigger("change"));
            },
            error: function (e) {}
        }), $("#ddlCountry").change(function () {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/DealerLocator/Services/GeoZoneService.asmx/LoadProvince",
                data: "{'languageId': '" + $("#hdnDealerLocatorLanguageId").val() + "', 'countryGuid': '" + $("#ddlCountry").val() + "'}",
                dataType: "json",
                success: function (e) {
                    var t = $("#ddlProvince");
                    $(t).empty(), $(t).append($("<option></option>").val("").html($("#hdfDealerLocatorSelectProvince").val())), $.each(e.d, function (e, a) {
                        $(t).append($("<option></option>").val(a.Key).html(a.Name))
                    })
                },
                error: function (e) {}
            })
        }), $("#ddlDistrict").length && $("#ddlProvince").change(function () {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/DealerLocator/Services/GeoZoneService.asmx/LoadDistrict",
                data: "{'languageId': '" + $("#hdnDealerLocatorLanguageId").val() + "', 'provinceGuid': '" + $("#ddlProvince").val() + "'}",
                dataType: "json",
                success: function (e) {
                    var t = $("#ddlDistrict");
                    $(t).empty(), $(t).append($("<option></option>").val("").html($("#hdfDealerLocatorSelectDistrict").val())), $.each(e.d, function (e, a) {
                        $(t).append($("<option></option>").val(a.Key).html(a.Name))
                    }), $("#edit-submit").trigger("click")
                },
                error: function (e) {}
            })
        })), $("#ddlDistrict").change(function () {
            $("#edit-submit").trigger("click")
        }), $("#add #map_canvas").length) {
        var e = 10.8230989,
            a = 106.6296638,
            n = !1;
        $("#latitude").length && (val = 1 * $("#latitude").val(), "" == val || isNaN(val) || (e = val, n = !0)), $("#longitude").length && (val = 1 * $("#longitude").val(), "" == val || isNaN(val) || (a = val)), geocoder = new google.maps.Geocoder;
        var i = new google.maps.LatLng(e, a),
            o = {
                zoom: zoom,
                center: i,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        if (map = new google.maps.Map(document.getElementById("map_canvas"), o), n) new google.maps.Marker({
            map: map,
            position: i
        })
    }
    $("#add #address").length && $("#add #address").blur(function () {
        var e = $(this).val();
        "" != e && get_coordinate(e, region)
    }), t = window.setInterval(function () {
        var e = zoom;
        zoom = zoomInit, gmap_location_lookup("", $("#distance").val() + 1e5, region, latInit, lngInit), zoom = e, window.clearInterval(t)
    }, 100)
});