import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { BaseController } from '../base/base.controller';

@Controller('user')
export class UserController extends BaseController {

  constructor(
    private userService: UserService
  ) {
    super()
  }

  @Post('login')
    async login(@Body() params) {
      const user =  await this.userService.VerifyEmailPassword(params);
      return this.OKResponse(user)
    }

    @Post('logout')
    async userLogout() {
      return await this.userService.Logout();
    }

    @Post('register')
    async register(@Body() params) {
      const user =  await this.userService.CreateUser(params);
      return this.OKResponse(user)
    }
}
