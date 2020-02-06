var express = require("express");
var instagramUser = require("instagram-user");
var search = require("youtube-search");
var router = express.Router();

/* GET Instagram user's data listing. */
router.get("/instagram/:id", function(req, res, next) {
  const { params } = req;
  instagramUser(params.id).then(
    resp => {
      res.send({ data: resp.edge_owner_to_timeline_media.edges });
    },
    err => {
      res.send({ data: [] });
    }
  );
});

/* GET Youtube user's data listing. */
router.get("/youtube/:id", function(req, res, next) {
  const { params } = req;

  var opts = {
    maxResults: 5,
    key: "AIzaSyC3mw8nEHMZZhlBllLaMWcOn6-kQKijLLo"
  };

  search(params.id, opts, function(err, results) {
    if (err) return res.send({ data: [] });
    res.send(results);
  });
});

module.exports = router;
