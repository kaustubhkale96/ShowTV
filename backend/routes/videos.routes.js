const router = require('express').Router();
const cloudinary = require('../config/cloudinary.config');
const Videos = require('../models/videos.model');

router.post('/upload', (req, res) => {
    console.log('/upload inside')
    const { title, description, category, thumbnail, video_id } = req.body;
    console.log("upload-req=", req.body)
    cloudinary.uploader.upload(thumbnail, { upload_preset: 'ml_default', folder: 'ShowTV', resource_type: 'image' }, (err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            console.log("upload-err=", err)
        }
        Videos.findOne({ video_id: { $eq: video_id } })
            .then(res => {
                if (res === undefined || res === null) {
                    const newVideo = new Videos({
                        title: title,
                        description: description,
                        category: category,
                        thumbnail: result.public_id,
                        video_id: video_id
                    });
                    newVideo.save()
                        .then((res) => {
                            res.json({ success: true, video: res });
                        })
                        .catch((err) => {
                            res.status(500).send({ message: err });
                            console.log('addVideo-catch=', err);
                        });
                }
                else {
                    response.json({ success: false, message: 'Video ID already present' });
                }
            })
            .catch((err) => {
                res.status(500).send({ message: err });
                console.log('addVideo_catch=', err);
            });
    });
});

router.get('/get/all', (req, res) => {
    cloudinary.search.expression('folder:ShowTV')
        .execute()
        .then((res) => {
            console.log('/api/thumbnail-res', res);
            res.resources;
        })
        .catch((err) => {
            console.log('/api/thumbnail-catch', err);
        })
});

module.exports = router;
