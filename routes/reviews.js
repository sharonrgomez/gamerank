var express = require("express");
var router = express.Router({ mergeParams: true });
var Game = require("../models/game");
var Review = require("../models/review");
var middleware = require("../middleware");

// ----------------
//  REVIEW ROUTES
// -----------------

// // Reviews Index
// router.get("/games/:id/reviews", function (req, res) {
//     Game.findById(req.params.id).populate({
//         path: "reviews",
//         options: { sort: { createdAt: -1 } } // sorting the populated reviews array to show the latest first
//     }).exec(function (err, game) {
//         if (err || !game) {
//             req.flash("errorMsg", err.message);
//             return res.redirect("back");
//         }
//         res.render("reviews/index", { game: game });
//     });
// });

// Reviews New
router.get("/games/:id/reviews/new", middleware.isLoggedIn, middleware.checkReviewExistence, function (req, res) {
    // middleware.checkReviewExistence checks if a user already reviewed the game, only one review per user is allowed
    Game.findById(req.params.id, function (err, game) {
        if (err) {
            req.flash("errorMsg", err.message);
            return res.redirect("back");
        }
        res.render("reviews/new", { game: game });

    });
});

// Reviews Create
router.post("/games/:id/reviews", middleware.isLoggedIn, middleware.checkReviewExistence, function (req, res) {
    // lookup game using ID
    Game.findById(req.params.id).populate("reviews").exec(function (err, game) {
        if (err) {
            req.flash("errorMsg", err.message);
            return res.redirect("back");
        }
        Review.create(req.body.review, function (err, review) {
            if (err) {
                req.flash("errorMsg", err.message);
                return res.redirect("back");
            }
            //add author username/id and associated game to the review
            review.author.id = req.user._id;
            review.author.username = req.user.username;
            review.game = game;
            //save review
            review.save();
            game.reviews.push(review);
            // calculate the new average review for the game
            game.rating = calculateAverage(game.reviews);
            //save game
            game.save();
            req.flash("successMsg", "Your review has been successfully added.");
            res.redirect('/games/' + game._id);
        });
    });
});

// Reviews Edit
router.get("/games/:id/reviews/:review_id/edit", middleware.checkReviewOwnership, function (req, res) {
    Review.findById(req.params.review_id, function (err, foundReview) {
        if (err) {
            req.flash("errorMsg", err.message);
            return res.redirect("back");
        }
        res.render("reviews/edit", { game_id: req.params.id, review: foundReview });
    });
});

// Reviews Update
router.put("/games/:id/reviews/:review_id", middleware.checkReviewOwnership, function (req, res) {
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, { new: true }, function (err, updatedReview) {
        if (err) {
            req.flash("errorMsg", err.message);
            return res.redirect("back");
        }
        Game.findById(req.params.id).populate("reviews").exec(function (err, game) {
            if (err) {
                req.flash("errorMsg", err.message);
                return res.redirect("back");
            }
            // recalculate game average
            game.rating = calculateAverage(game.reviews);
            //save changes
            game.save();
            req.flash("successMsg", "Your review was successfully edited.");
            res.redirect('/games/' + game._id);
        });
    });
});

// Reviews Delete
router.delete("/games/:id/reviews/:review_id", middleware.checkReviewOwnership, function (req, res) {
    Review.findByIdAndDelete(req.params.review_id, function (err) {
        if (err) {
            req.flash("errorMsg", err.message);
            return res.redirect("back");
        }
        Game.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.review_id } }, { new: true }).populate("reviews").exec(function (err, game) {
            if (err) {
                req.flash("errorMsg", err.message);
                return res.redirect("back");
            }
            // recalculate game average
            game.rating = calculateAverage(game.reviews);
            //save changes
            game.save();
            req.flash("successMsg", "Your review was deleted successfully.");
            res.redirect("/games/" + req.params.id);
        });
    });
});

function calculateAverage(reviews) {
    if (reviews.length === 0) {
        return 0;
    }
    var sum = 0;
    reviews.forEach(function (element) {
        sum += element.rating;
    });
    return sum / reviews.length;
}

module.exports = router;