angular.module('userControllersEmad',[])

.controller('superbanCtrl',function($http){
	
	var app= this;

	this.superbanUser = function(superbanData){
	

		$http.put('/users/superban', this.superbanData).then(function(data){
			console.log(data.data.success);
			console.log(data.data.msg);
			if(data.data.success){
				
				app.successMsg=data.data.msg;
			}else{
				app.errorMsg=data.data.msg;
			}
		});
	};


})

.controller('superdebanCtrl',function($http){
	this.superdebanUser = function(superdebanData){
		var app= this;
		$http.put('/users/superdeban', this.superdebanData).then(function(data){
		console.log(data.data.success);
			console.log(data.data.msg);
			if(data.data.success){
				
				app.successMsg=data.data.msg;
			}else{
				app.errorMsg=data.data.msg;
			}
		});
	};

})

.controller('promoteCtrl',function($http){
	this.promoteUser = function(promoteData){
		var app= this;
		$http.put('/users/promote', this.promoteData).then(function(data){
			console.log(data.data.success);
			console.log(data.data.msg);
			if(data.data.success){
				
				app.successMsg=data.data.msg;
			}else{
				app.errorMsg=data.data.msg;
			}
		});
	};

})

.controller('demoteCtrl',function($http){
	this.demoteUser = function(demoteData){
	
	var app= this;

		$http.put('/users/demote', this.demoteData).then(function(data){
			console.log(data.data.success);
			console.log(data.data.msg);
			if(data.data.success){
				
				app.successMsg=data.data.msg;
			}else{
				app.errorMsg=data.data.msg;
			}
		});
	};

});