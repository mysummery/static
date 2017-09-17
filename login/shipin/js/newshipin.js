function selectOne() {
	$.ajax({
		url: obj.selectFenlei,
		type: "post",
		success: function(data) {
			var data = data.resobj;
			var id = data[0].id;
			$.each(data, function(index, value) {
				$(".gOne").append("<li name=" + data[index].id + "><a href='javascript:void(0)'>" + data[index].name + "</a></li>");
			});
			selectTwo(id);
		}
	})

}

function selectTwo(id) {
	$.ajax({
		url: obj.selectFenleiTwo,
		type: "post",
		data: {
			page: "1",
			id: id,
		},
		success: function(data) {
			var data = data.resobj.rows;
			//			console.log(data);	
			var id = data[0].id;
			var type = 1;
			$.each(data, function(index, value) {

				$(".gTwo").append("<li name=" + data[index].id + "><a href='javascript:void(0)'>" + data[index].name + "</a></li>");
			});
			selectThree(id, type);
		}
	})
}

function selectThree(id, type) {
	$.ajax({
		url: obj.selectFenleiThree,
		type: "post",
		data: {
			page: "1",
			id: id,
			type: type
		},
		success: function(data) {

			var data = data.resobj.rows;
			//			console.log(data);		
			var id = data[0].id;
			var type = 1;
			$.each(data, function(index, value) {

				$(".gThree").append("<li name=" + data[index].id + "><a href='javascript:void(0)'>" + data[index].name + "</a></li>");

			});

			selectFour(id, type);
		}
	})
}

function selectFour(id, type) {
	$.ajax({
		url: obj.selectFenleiFour,
		type: "post",
		data: {
			courseid: id,
			page: '1',
			type: type
		},
		success: function(data) {
			console.log(data);
			var data = data.resobj.rows;
			$.each(data, function(index, value) {
				$(".gFour").append('<li name=' + data[index].id + '><a class="pic" href="javascript:void(0)"><img src=\"\" alt=\"\" /></a><a href="javascript:void(0)" class="tittle">' + data[index].name + '</a></li>');
			});
		}
	});

}

$(function() {
	selectOne();
	$(".gOne").on("click", "li", function() {
		$(".gTwo").find("li").remove();
		var id = $(this).attr("name");
		console.log(1);

		selectTwo(id);
		$(".gTwo").find("li").remove();
		$(".gThree").find("li").remove();
		$(".gFour").find("li").remove();

	});

	$(".gTwo").on("click", "li", function() {
		$(".gThree").find("li").remove();
		var id = $(this).attr("name");
		var type = 1;

		selectThree(id, type);
		$(".gThree").find("li").remove();
		$(".gFour").find("li").remove();

	});

	$(".gThree").on("click", "li", function() {
		$(".gFour").find("li").remove();
		var id = $(this).attr("name");
		var type = 1;

		selectFour(id, type);
		$(".gFour").find("li").remove();

	});

})