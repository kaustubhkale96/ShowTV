const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "kilo",
    api_key: "338842513885831",
    api_secret: "VJGvUZKhG1x1SEQtMOsxLZ5d3ts",
});
module.exports = cloudinary.v2;