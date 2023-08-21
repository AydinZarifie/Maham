const fs = require('fs');
const path = require('path');

exports.clearImage = async (estate) => {
	console.log(estate);

	const filePath = path.join(__dirname, '../', estate);
	console.log(filePath);

	fs.rmSync(filePath, { recursive: true }, (err) => {
		if (err) {
			console.log('Delete files was failed');
		} else {
			console.log('Delete file successfully');
		}
	});
};

exports.clearVideo = async (filePath) => {
	filePath.forEach(async (videoPath) => {
		console.log(videoPath);

		videoPath = path.join(__dirname, '../', videoPath);

		if (fs.existsSync(videoPath)) {
			fs.unlinkSync(videoPath, (err) => {
				throw err;
			});

			console.log('Video deleted successfully');
		} else {
			console.log('Image not found');
		}
	});
};
