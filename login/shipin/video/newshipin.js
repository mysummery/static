function san1() {
	$.ajax({
		url: obj.selectFenleiTwo,
		
		type: "post",
		
		success: function(data) {

			var data = data.resobj;
			
			console.log(data);
			
			$.each(data, function(index, value) {

				console.log(data[index].name);

				$(".gOne").append("<li><ahref=\"\">" + data[index].name + "</a></li>");
//				console.log(data[index].id);
//				san2(data[index].id);
				
			});
		}
	})

}
san1()

/*function san2() {
	$.ajax({
		url: obj.selectFenleiFour,
		type: "post",
		success: function(data) {

//			var data = data.resobj;
			console.log(data);			
		}
	})
}
san2();*/

/*	san2: function(key) {
		$.ajax({
			url: 'selectFenleiTwo ',
			data: {
				"zjid": data.resobj[i].zjid
			},
			success: function(data) {
		
				var zjid= data.resobj[i].zjid;
				san3(zjid)
			}
		})
	},
	san3: function(key) {
		$.ajax({
			url: 'selectFenleiThree ',
			data: {
				"zjid": data.resobj[i].zjid
			},
			success: function(data) {
				var zjid= data.resobj[i].zjid;
				san4(zjid)
			}
		})
	},
	san4: function(key) {
		$.ajax({
			url: 'selectFenleiFour  ',
			data: {
				"zjid": dat a.resobj[i].zjid
			},
			success: function(data) {}
		})
	}
		
}*/