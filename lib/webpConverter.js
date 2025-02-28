// https://github.com/salismazaya/whatsapp-bot

const fs = require("fs");
const path = require("path");
const os = require("os");
const FileType = require('file-type');
const { exec } = require("child_process");


//if (!fs.existsSync(".temp")) fs.mkdirSync(".temp");

function imageToWebp(bufferImage) {
	return new Promise((resolve, reject) => {
		FileType.fromBuffer(bufferImage)
			.then((response) => {
				try {
					const pathFile = path.join(os.tmpdir(), Math.floor(Math.random() * 1000000 + 1) + "." + response.ext);
					fs.writeFileSync(pathFile, bufferImage);
					exec(`cwebp -q 50 ${pathFile} -o ${pathFile}.webp`, (error, stdout, stderr) => {
						if (!fs.existsSync(pathFile + ".webp")) {
							reject(new Error("failed convert file!"));
							fs.unlinkSync(pathFile);
							return;
						}
						const webpBufferImage = fs.readFileSync(pathFile + ".webp");
						fs.unlinkSync(pathFile);
						fs.unlinkSync(pathFile + ".webp");
						resolve(webpBufferImage);
					});

				} catch(e) {
					reject(e);
				}
			})
			.catch(e => reject(e));
	});
}

function webpToJpg(bufferImage) {
	return new Promise((resolve, reject) => {
		try {
			const pathFile = path.join(os.tmpdir(), Math.floor(Math.random() * 1000000 + 1) + ".webp");
			fs.writeFileSync(pathFile, bufferImage);

			exec(`ffmpeg -i ${pathFile} ${pathFile}.jpg`, (error, stdout, stderr) => {
				/*if (!fs.existsSync(pathFile + ".jpg")) {
					reject(new Error("failed convert file!"));
					fs.unlinkSync(pathFile);
					return;
				}*/
				fs.existsSync(pathFile + ".jpg")
				const jpgBufferImage = fs.readFileSync(pathFile + ".jpg");
				fs.unlinkSync(pathFile);
				fs.unlinkSync(pathFile + ".jpg");
				resolve(jpgBufferImage);
			})
		} catch(e) {
			reject(e);
		}
	});
}

function gifToWebp(bufferImage) {
	return new Promise((resolve, reject) => {
		try {
			const pathFile = path.join(os.tmpdir(), Math.floor(Math.random() * 1000000 + 1) + ".gif");
			fs.writeFileSync(pathFile, bufferImage);

			exec(`gif2webp ${pathFile} -o ${pathFile}.webp`, (error, stdout, stderr) => {
				if (!fs.existsSync(pathFile + ".webp")) {
					reject(new Error("failed convert file!"));
					fs.unlinkSync(pathFile);
					return;
				}
				const webpBuffer = fs.readFileSync(pathFile + ".webp");
				fs.unlinkSync(pathFile);
				fs.unlinkSync(pathFile + ".webp");
				resolve(webpBuffer);
			})
		} catch(e) {
			reject(e);
		}
	});
}

function webpToVideo(bufferImage) {
	return new Promise((resolve, reject) => {
		try {
			const pathFile = path.join(os.tmpdir(), Math.floor(Math.random() * 1000000 + 1) + ".webp");
			fs.writeFileSync(pathFile, bufferImage);

			exec(`convert ${pathFile} ${pathFile}.gif`, (error, stdout, stderr) => {

				exec(`ffmpeg -i ${pathFile}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${pathFile}.mp4`, (error, stdout, stderr) => {
					if (!fs.existsSync(pathFile + ".gif") || !fs.existsSync(pathFile + ".mp4")) {
						reject(new Error("failed convert file!"));
						fs.unlinkSync(pathFile);
						return;
					}
					const videoBuffer = fs.readFileSync(pathFile + ".mp4");
					fs.unlinkSync(pathFile);
					fs.unlinkSync(pathFile + ".gif");
					fs.unlinkSync(pathFile + ".mp4");
					resolve(videoBuffer);
				});

			});
		} catch(e) {
			reject(e);
		}
	});
}


module.exports = { imageToWebp, webpToJpg, gifToWebp, webpToVideo }