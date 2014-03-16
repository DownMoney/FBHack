$("window").ready(function () {
	var temp = ($(this).innerHeight()-200)/2;

	$('#qrcode').css("margin-top", temp);
});

$(".playlistHeader").click(function (){
	$('.playlistDropdown').toggle('blind',100);
});


$("#qrcode").mouseover(function  () {
	$("#qrcode").animate({left:"12%"},500);
});

$("#qrcode").mouseleave(function  () {
	$("#qrcode").animate({left:"-150px"},500);
});