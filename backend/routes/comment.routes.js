const router = require('express').Router();
const Comment = require('../models/comment.model');

router.post('/add', (req, res) => {
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        } res.status(200).json({ success: true, message: comment })
    })
});

router.post('/view', (req, res) => {
    console.log('karan - data', req.body.videoId);
    Comment.find({ videoId: req.body.videoId })
        .then((comment) => {
            res.status(200).json({ success: true, message: comment })
            console.log('comments', comment)
        })
        .catch((err) => {
            res.json({ success: false, message: err });
            console.log('error', err)
        })

});

module.exports = router;
