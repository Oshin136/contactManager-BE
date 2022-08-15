import db from "../db/db";
import { UserToInsert } from "../domain/User";
import {User} from "../domain/User";

class UserModel{
    public static table = "user_account";

    public static async getAllUsers(){
        const users = await db(UserModel.table).select();

        return users;
    }

    public static async getUserById(id: number) {
        const user = await db(UserModel.table).where({ id }).first();
    
        return user;
      }
    
      public static async getUserByEmail(email:string):Promise<User>{
        const user = await db(UserModel.table).where({email:email})
        .select()
        .first();

        return user;
    }

    public static async createUser(user:UserToInsert){
        const newUser = await db(UserModel.table).insert(user,[
            'id','name','email','password']
        )

        return newUser;
    }


    

    public static async updateUser(user: User) {
        const [updatedUser] = await db(UserModel.table)
          .where({ id: user.id })
          .update(user)
          .returning(["id", "email"]);
    
        return updatedUser;
      }

      public static async deleteUser(id: number) {
        await db(UserModel.table).where({ id }).delete();
      }
    
}

export default UserModel;