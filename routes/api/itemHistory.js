var ItemHistory = require('../../angular/modules/itemHistory');

module.exports = function(app) {

	// Get History
	app.get('/api/item/history', function(req, res) {
		ItemHistory.find({}, function(err, itemHistory) {
			if (err) {
				res.status(404).send(err);
			}

			else {
				res.status(200).send(itemHistory);
			}
		});
	});
};