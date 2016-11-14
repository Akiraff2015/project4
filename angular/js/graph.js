(function() {
	var app = angular.module('InventoryApp');

	app.controller('GraphController', ['$scope', 'InventoryFactory', function($scope, InventoryFactory) {
		angular.element(document).ready(function() {
			var quantityArray = [];
			var itemArray = [];
			var ctx = document.getElementById("stockItems").getContext("2d");

			InventoryFactory.data().then(function(res) {
				res.forEach(function(element, index, array) {
					itemArray.push(element.title);
					quantityArray.push(element.quantity);
				});

				var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: itemArray,
						datasets: [{
							label: 'Number of Items in Stock',
							data: quantityArray,
							backgroundColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)'
							],
						}]
					},
					options: {
						responsive: true,
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				});
			});
		});
	}]);
})();