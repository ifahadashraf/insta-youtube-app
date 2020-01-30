var express = require('express');
var instagramUser = require('instagram-user');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const { params } = req; 
  instagramUser(params.id).then(resp => {
    res.send({ data: resp.edge_owner_to_timeline_media.edges});
  });
});

module.exports = router;
