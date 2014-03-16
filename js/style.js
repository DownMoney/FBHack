$("window").ready(function () {
	var temp = ($(this).innerHeight()-200)/2;
	$('#qrcode').css("margin-top", temp);
	//$('buyAmazonImg').css("width", $('#m_artistPicture').width());
});

$(".playlistHeader").click(function (){
	$('.playlistDropdown').toggle('blind',100);
});


$("#qrcode").mouseover(function  () {
	$("#qrcode").animate({left:"0px"},500);
});

$("#qrcode").mouseleave(function  () {
	$("#qrcode").animate({left:"-450px"},500);
});