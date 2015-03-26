$(document).ready(function() {
	
	$('#about').click(function(){
		alert('Cat Grab is a cat gift generator');
	});

	$(function() {
		var searchTerms = ["cats", "cat clothes", "cat kitchenware", "cat crafts"];
		var clearMain = function(){
			$(".main").html("");
		}
    	
    	$('#general').click(function (event) {
	    	clearMain();
			//event.preventDefault();
	        var term = searchTerms[0];
	        getRequest(term);
    	});

    	$('#clothing').click(function (event) {
	    	clearMain();
	        event.preventDefault();
	        var term = searchTerms[1];
	        getRequest(term);
    	});

    	$('#kitchenware').click(function (event) {
	    	clearMain();
	        event.preventDefault();
	        var term = searchTerms[2];
	        getRequest(term);
    	});

    	$('#crafts').click(function (event) {
	    	clearMain();
	        event.preventDefault();
	        var term = searchTerms[3];
	        getRequest(term);
    	});
	});

	function getRequest(term) {
	    var key = "qtsni0uvpdyn1qg4bbpn1wc6";
	    var url = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + term + "&limit=9&includes=Images:1&api_key=" + key;

	    $.ajax({
			url: url,
			dataType: "jsonp",
			type: "GET",
		})

		.done(function(data){
			//For each...
			$.each(data.results, function(i, item) {
				var results = showResults(item);
				//console.log(inspiration);
				$('.main').append(results);
			});
		})
		.fail(function(jqXHR, error, errorThrown){
			//var errorElem = showError(error);
			//console.log(errorElem);
		});
	}

	function showResults(item) {

		var listingBlock = $('.templates .store-item').clone(); // .templates had to be selected before 9 would show up??

		var itemImage = listingBlock.find('.item-img');
		itemImage.attr('src', item.Images[0].url_170x135);
		//console.log(item.Images[0].url_75x75); // WORKS

		var listingTitle = listingBlock.find('.title');
		listingTitle.text(item.title);
		//console.log(item.title); // WORKS

		var listingLink = listingBlock.find('.listing');
		listingLink.attr('href', item.url);
		//console.log(item.url); // WORKS

		var listingPrice = listingBlock.find('.price');
		listingPrice.text(item.price);

		return listingBlock;
	}
});