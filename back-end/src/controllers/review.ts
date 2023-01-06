import { Users } from '../models/user';
import { Review, Reviews } from '../models/review';
import { Request, Response } from 'express';

export const create = (req: Request, res: Response): void => {
  try {
    const review = new Review({ ...req.body });
    if (!req.body._user) throw 'token not found';
    if (!req.body.user) throw 'user reviewed not found';

    review.user = { ...req.body._user };
    //check if review already exists
    Users.findOne({ _id: req.body.user, 'reviews.user._id': req.body._user._id })
      .then((user) => {
        if (user)
          res.status(400).json({
            error: 'a review already exist',
          });
        else {
          //check if user reviewing exists
          Users.findOne({
            _id: req.body.user,
          })
            .then((user) => {
              //create review
              if (!user) throw 'no user found';

              user.reviews.push(review);
              Users.updateOne(
                { _id: req.body.user },
                {
                  $set: user,
                  $currentDate: { lastModified: true },
                },
              )
                .then((user) => {
                  res.status(201).json(user);
                })
                .catch((error) => {
                  res.status(400).json({
                    error: error,
                  });
                });
            })
            .catch((error) => {
              res.status(404).json({
                error: error,
              });
            });
        }
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const find = (req: Request, res: Response): void => {
  Reviews.find()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

export const findByUser = (req: Request, res: Response): void => {
  Users.findOne({
    _id: req.params.idUser,
  })
    .then((user) => {
      Reviews.find({ user: user })
        .then((reviews) => {
          res.status(200).json(reviews);
        })
        .catch((error) => {
          res.status(404).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
