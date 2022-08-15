import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import bycrpt from 'bcrypt';

export const getAllUsers = (req:Request,res:Response,next:NextFunction) =>{
    userService.getAllUsers()
    .then(data => res.json(data))
    .catch(err => next(err))
};

export const getUserById = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    userService
      .getUserById(+id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  };

  export const getUserByEmail = (req:Request,res:Response,next:NextFunction)=>{
    const {email} = req.body;
    userService.getUserByEmail(email);
}



export const createUser = (req:Request,res:Response,next:NextFunction)=>{
    const data = req.body;
    userService.createUser(data)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { password } = req.body;
  
    bycrpt.hash(password, 15, (err, hash) => {
      userService
        .updateUser({ ...req.body, password: hash, id: +id })
        .then((data) => res.json(data))
        .catch((err) => next(err));
    });
  };


  export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    userService
      .deleteUser(+id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  };
  
