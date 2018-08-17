$(function() {




	$('#close').click(function() {
		$('.hidden').fadeOut();
	})

	$(".services-item").equalHeights();

	// $.pixlayout("img/pixel-perfect.png", "body");




	
	$.ajax({
		type: "GET",
		url: "http://504080.com/api/v1/directories/enquiry-types", //Change
		dataType: "json"
	}).done(function(ourData) {
		var output = '';
		var count = 1;
		for (var i = 0; i < ourData.data.length - 1; i++) {
				output += '<option>' + ourData.data[i].name + '</option>';
		}
		$('#select_all').prepend(output);
	})

	$('#select_all').change(function() {
		if (this.value == '1') {
			$('#other_type').fadeIn();
		} else {
			$('#other_type').fadeOut();
		}
	})

		$('#search').keyup(function(e) { //Change
			e = e || window.event;
    if (e.keyCode === 13) {

		var searchField = $(this).val();
		var myExp = new RegExp(searchField, "i"); // Register
		$.ajax({
			type: "GET",
			url: "http://504080.com/api/v1/services/categories", //Change
			dataType: "json",
			beforeSend: function (xhr) {
    		xhr.setRequestHeader('Authorization', '62d6f23b659f066b6bcc13647d58b33e8d550b8c');
			},
			statusCode: {
	    	401: function() {
    			$('.hidden').fadeIn();
	      	$('#update').html('<h1>ERROR!</h1><h2>401</h2><p>Unauthorized</p><p class="descr">Access token is missing or expired. Please login or signup to use our service</p>')
    		},
    		501: function() {
    			$('.hidden').fadeIn();
	      	$('#update').html('<h1>ERROR!</h1><h2>500</h2><p>Server error</p><p class="descr">Something happens on serverside. Please contact administrator or try again later</p>')
    		}

		}
	}).done(function(ourData) {
			var notFound = '';
			var output = '<div class="container">';
			output += '<div class="row">';
			var flag = false;
			for (var i = 0; i < ourData.data.length; i++) { // get values
				if (ourData.data[i].title.toUpperCase() === searchField.toUpperCase()) { 
					output += '<div class="col-md-4">';
					output += '<div class="services_item">';
					output += '<div class="img_wrap">';
					output += '<img src="'+ ourData.data[i].icon + '">';
					output += '</div>';
					output += '<p>'+ ourData.data[i].title +'</p>';
					output += '</div>';
					output += '</div>';
					flag = true;
				} 
			}
			if (!flag) {
				output += '<div class="col-md-4">';
					output += '<div class="services_item">';
					output += '<div class="img_wrap">';
					output += '<img src="img/services/no-categories.png">';
					output += '</div>';
					output += '</div>';
				output += '</div>';
				output += '<p class="not_found">Search for «'+ searchField +'» found no results</p>';
			}
			output += '</div>';
			output += '</div>';
			$('#services_items').html(output);
		}).fail(function() {
		});
    }


		return false;
	});



	// $('#search').keyup(function() { 
	// 	var ourRequest = new XMLHttpRequest();
	// 	ourRequest.open('GET', 'http://504080.com/api/v1/services/categories');
	// 	ourRequest.setRequestHeader('Authorization', '62d6f23b659f066b6bcc13647d58b33e8d550b8c');
	// 	var searchField = $(this).val();
	// 	var myExp = new RegExp(searchField, "i"); // Register

	// 	ourRequest.onload = function() {
	// 		var ourData = JSON.parse(ourRequest.responseText);
	// 		// console.log(ourData.data[1])
	// 		var output = '<div class="container">';
	// 		output += '<div class="row">';
	// 		for (var i = 0; i < ourData.data.length; i++) { // get values
	// 			if (ourData.data[i].title.search(myExp) != -1) { 
	// 				output = '<div class="col-md-4">';
	// 				output += '<div class="services_item">';
	// 				output += '<div class="img_wrap">';
	// 				output += '<img src="'+ ourData.data[i].icon + '">';
	// 				output += '</div>';
	// 				output += '<p>'+ ourData.data[i].title +'</p>';
	// 				output += '</div>';
	// 				output += '</div>';
	// 			} 
	// 		}
			
	// 		output += '</div>';
	// 		output += '</div>';
	// 		$('#services_items').html(output);
	// 	} 

	// 	ourRequest.send();

	// });


	// $('#search').keyup(function() { // working with inputs and JSON  
	// 	var searchField = $(this).val();
	// 	var myExp = new RegExp(searchField, "i"); // Register

	// 	$.getJSON('service_category_collection_example.json', function(data) { // get JSON file
	// 		var output = '<div class="container">';
	// 		output = '<div class="row">';
	// 		$.each(data, function(key, val) { // get values
	// 			if (val.title.search(myExp) != -1) { 
	// 				output = '<div class="col-md-4">';
	// 				output += '<div class="services_item">';
	// 				output += '<div class="img_wrap">';
	// 				output += '<img src="'+ val.icon + '">';
	// 				output += '</div>';
	// 				output += '<p>'+ val.title +'</p>';
	// 				output += '</div>';
	// 				output += '</div>';
	// 			} 
	// 		});
			
	// 		output += '</div>';
	// 		output += '</div>';
	// 		$('#services_items').html(output);
	// 	});
	// });

	//dowmload img

	function buildImage(input, id) {
		 if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
							$(id).attr('src', e.target.result);
					}
					reader.readAsDataURL(input.files[0]);
			}
	}

	$(".input_fields > input").change(function(e){
		if (this.files[0].size > 5242880) {
			$('.error').css('display', 'block');
			$('.plus_add').css('top', '15px');
			$('.plus').css('top', '40px');
		} else {
		$('.plus_add').css('top', '35px');
		$('.plus').css('top', '60px');
		$('.error').css('display', 'none');
  	$('.plus_add, .plus').css('display', 'none');
  	$('.remove-asoc').fadeIn();
		// e.target.parentNode.getElementsByTagName("span").className="hide";
  	buildImage(this, e.target.parentNode.getElementsByTagName("img")[0]);
  }
	});

	$('.remove-asoc').click(function() {
		$('.input_fields > img').attr('src', '');
		$('.plus_add, .plus').fadeIn();
		$('.remove-asoc').fadeOut();
	})
		
	$(".input_fields > img, .input_fields > span").on('click', function(e){
		$(e.target.parentNode.getElementsByTagName("input")[0]).trigger('click');
			return;
	});

	//textarea

	$('#descr').keydown(function(event) {
		var current = $('#count_num').html();
		if (current < 1000 && (event.keyCode != 8)) {
			current++;
			$('#count_num').html(current);
			current = 0;
		} else {
			if (current <= 0) {
				return;
			} else {
			current--;
			$('#count_num').html(current);
			// $('#descr').attr('dissabled', 'true');
			}
		}
	});

	function validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	}

	function validateName(name) {
		var result = /^[a-zA-Z ]+$/;
		return result.test(name);
	}



	$('#send').click(function() {
		if ($('input[name="name"]').html() != '' && $('input[name="email"]').html() != '') {
			var ourData = 'name=' + $('input[name="name"]').val() + '&' + 'email=' + $('input[name="email"]').val() + '&' + 'photo=' + '&' + 'enquirytype=' + '&' + 'other=' + $('input[name="other"]').val(); 
			$.ajax({
			type: "POST",
			url: "http://504080.com/api/v1/support", //Change
			data: ourData
		}).done(function(Data) {
			alert(Data.data.message);
		}).fail(function() {
			alert('fail');
		})
		} else {
		if (!validateEmail($('#email').val()) && validateName($('#name').val())) {
			$('.validate_email').css('display', 'block');
			$('#email').addClass('validate');
			$('#name').removeClass('validate');
		} else if (!validateName($('#name').val()) && validateEmail($('#email').val()) ) {
			$('.validate_name').css('display', 'block');
			$('#name').addClass('validate');
			$('#email').removeClass('validate');
		} else if (!validateEmail($('#email').val()) && !validateName($('#name').val())){
			$('.validate_email, .validate_name').css('display', 'block');
			$('#email, #name').addClass('validate');
		} else {
			$('.validate_email, .validate_name').css('display', 'none');
			$('#email, #name').removeClass('validate');
		}
	}
	})

// $('#send').click(function() {
// 	// var ourData = 'sdsddsaddsa'
// 			var ourData = 'name=' + $('input[name="name"]').val() + '&' + 'email=' + $('input[name="email"]').val() + '&' + 'photo=' + '&' + 'enquirytype=' + $('#select_all').$(this).val() + '&' + 'other=' + $('input[name="other"]').val(); 

// 	alert(ourData);
// })

	// var myFile = document.getElementById('upload-1-file');

//binds to onchange event of the input field
	// myFile.addEventListener('change', function() {
 //  //this.files[0].size gets the size of your file.
 //  alert(this.files[0].size);

	// });

	// $(".form").submit(function() { //Change
	// 	var th = $(this);
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "http://504080.com/api/v1/support", //Change
	// 		data: th.serialize()
	// 	}).done(function() {
	// 		alert("Thank you!");
	// 		setTimeout(function() {
	// 			// Done Functions
	// 			th.trigger("reset");
	// 		}, 1000);
	// 	});
	// 	return false;
	// });

});
