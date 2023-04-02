import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "src/services/user/user.service";
import { AddUserArgs } from "./args/addUser.args";
import { GetUserArgs } from "./args/getUser.args";
import { User } from "./schema/user.schema";

@Resolver(of => User)
export class UserResolver {

  constructor(
    private userService: UserService
  ) {}
  
  @Mutation(returns => User, {name: 'register'})
  register(@Args("addUserArgs") addUserArgs: AddUserArgs) {
    return this.userService.CreateUser(addUserArgs)
  }
  
  @Mutation(returns => User, {name: 'login'})
  login(@Args("getUserArgs") getUserArgs: GetUserArgs) {
    return this.userService.VerifyEmailPassword(getUserArgs)
  }

  @Query(returns => String, {name: 'logout'})
  logout(@Args({name: 'userId', type:() => Int}) id: number) {
    return this.userService.Logout(id)
  }
  
}