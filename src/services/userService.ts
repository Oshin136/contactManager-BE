import {User, UserToInsert} from "../domain/User";
import Success from "../domain/Success";
import UserModel from "../models/UserModel";
import logger from "../misc/logger";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from "../domain/Token";

export const getAllUsers = async():Promise<Success<User[]>>=>{
    logger.info("Getting all users");
    const users = await UserModel.getAllUsers();

    return{
        data:users,
        message:"Users fetched successfully"
    }
}

export const getUserById = async (id: number): Promise<Success<User>> => {
    logger.info("Getting user by id!!");
    const user = await UserModel.getUserById(id);
  
    if (user) {
      return {
        data: user,
        message: "User fetched successfully",
      };
    }
  
    return {
      message: "User not found",
    };
  };

  export const getUserByEmail = async(email:string):Promise<Success<User>>=>{
    const user = await UserModel.getUserByEmail(email);

    return{
        data:user,
        message:"User fetched successfully"
    }

}


export const createUser = async(user:UserToInsert):Promise<Success<User>>=>{

    const {password} = user;
    console.log(password);


    const passwordHash  = await bcrypt.hash(password,15);

    const insertedUser = await UserModel.createUser({...user,password:passwordHash})

    logger.info('User created successfully');

    return{
        data:insertedUser,
        message:'User created successfully'
    }
}

export const updateUser = async (user: User): Promise<Success<User>> => {
    logger.info("Updating user!!");
    const updatedUser = await UserModel.updateUser(user);
  
    return {
      data: updatedUser,
      message: "User updated successfully",
    };
  };
  
 
  export const deleteUser = async (id: number) => {
    logger.info("Deleting user!!");
    await UserModel.deleteUser(id);
  
    return {
      message: "User deleted successfully",
    };
  };



export const login = async(email:string,password:string):Promise<Success<Token>>=>{
    const user = await UserModel.getUserByEmail(email);
    if(!user){
        return{
            message:"Invalid email or password!"
    
        }
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return{
            message:"Password do not match"
        }
    }

    const accessToken  =  jwt.sign({userId:user.id},process.env.JWT_SECRET as string);

    return {
        data:{accessToken,userId:user.id},
        message:"User logged in"
    }

}