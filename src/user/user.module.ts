import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "src/models/user.model";
import { JwtStrategy } from "src/services/user/jwt.strategy";
import { UserService } from "src/services/user/user.service";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: '60d',
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  providers: [UserResolver, UserService, JwtStrategy],
})
export class UserModule {}