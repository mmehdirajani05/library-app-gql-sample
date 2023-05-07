import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AddUserArgs } from 'src/user/args/addUser.args';
import { GetUserArgs } from 'src/user/args/getUser.args';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async VerifyEmailPassword(params: GetUserArgs) {
    const emailParams = { email: params.email };
    const user = await this.CheckUserExistByEmail(emailParams);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(params.password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException('Invalid password', HttpStatus.NOT_FOUND);
    }

    // create a access token
    const token = this.CreateSignedToken(user);

    delete user.password

    return { ...user, token };
  }

  async CheckUserExistByEmail(params: any) {

    const user = await this.userRepository.findOne({
      where: {
        ...params,
        is_delete: false
      },
      select: [
        'avatar',
        'email',
        'id',
        'password',
        'name'
      ]
    });

    if (!user) return null

    return {...user};
   
  }

  async CreateUser(params: AddUserArgs) {
    const emailParams = { email: params.email };
    const user = await this.CheckUserExistByEmail(emailParams);
    let newUser = null;
    let newUserRes = null;

    if (!!user && !user?.is_delete) {
      throw new HttpException(
        'User already exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const passwordHash = await this.CreatePasswordHash(params.password || '')

    newUser = new UserModel();
    newUser.name = params.name;
    newUser.password = passwordHash;
    newUser.email = params.email;
    newUser.is_delete = false;
    newUser.is_verified = false;  
    // create user and access token
    newUserRes = await this.userRepository.save(newUser);

    const token = this.CreateSignedToken(newUserRes);
    if (newUserRes.password) {
      delete newUserRes.password;
    }

    return { ...newUserRes, token };
  }

  async CreatePasswordHash(password: string) {
    const salt = 10
    return await bcrypt.hash(password, salt)
  }

  CreateSignedToken(user): any {
    const signedUser = this.ConvertToSingedUser(user);
    return this.jwtService.sign(signedUser);
  }

  ConvertToSingedUser(user) {
    const { name, id, email } = user;
    return {
      id,
      name,
      email,
    };
  }

  Logout(id?: number) {
    // await this.cacheManager.del('userToken');
    console.log(id)
    throw new HttpException('User logged out successfully!', HttpStatus.OK)
  }

  async GetUserById(userId: number) {
    return this.userRepository.findOne({
      where:  { id: userId }
    })
  }
}
