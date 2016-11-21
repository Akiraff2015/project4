var ItemHistory = require('../../angular/modules/itemHistory');

module.exports = function(app) {

	// Get History
	app.get('/api/history', function(req, res) {
		ItemHistory.find({}, function(err, itemHistory) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(itemHistory);
			}
		});
	});

	app.post('/api/history', function(req, res) {
		var newItemHistory;

		newItemHistory = new ItemHistory({
			title: req.body.title,
			quantity: req.body.quantity,
			dateCreated: new Date(),
		});

		newItemHistory.save(function(err) {
			if (err) {
				console.log(err);
			}

			else {
				console.log("Item History have been created");
			}
		});
	});
};