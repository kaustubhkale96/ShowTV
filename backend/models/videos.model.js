const mongoose = require("mongoose");

const schema = mongoose.Schema({
    video_id: String,
    title: String,
    description: String,
    thumbnail: String,
    category: String,
});

schema.method("toJSON", function () {
    const { _v, _id, ...object } = this.object();
    object.id = _id;
    return object;
});

const Videos = mongoose.model("Videos", schema);
module.exports = Videos;
