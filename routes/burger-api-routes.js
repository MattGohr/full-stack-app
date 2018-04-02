var db = require("../models");

module.exports = function(app) {
  app.get("/api/burger", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Burger.findAll({
      include: [db.Post]
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  app.get("/api/burger/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Burger.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  app.post("/api/burger", function(req, res) {
    db.Burger.create(req.body).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  app.delete("/api/burger/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

};
