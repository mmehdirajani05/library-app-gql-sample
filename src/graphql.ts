
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddUserArgs {
    name: string;
    email: string;
    password: string;
}

export interface GetUserArgs {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    indexNumber(): number | Promise<number>;
    logout(userId: number): string | Promise<string>;
}

export interface IMutation {
    register(addUserArgs: AddUserArgs): User | Promise<User>;
    login(getUserArgs: GetUserArgs): User | Promise<User>;
}

type Nullable<T> = T | null;
