
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

export interface AddBookArgs {
    title: string;
    author: string;
    description: string;
    book_created_at: DateTime;
}

export interface UpdateBookArgs {
    id: number;
    title: string;
    author: string;
    description: string;
    book_created_at: DateTime;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    book_created_at: string;
    ratings: string;
    images: string[];
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
    bookById(bookId: number): Book | Promise<Book>;
    allBooks(): Book[] | Promise<Book[]>;
}

export interface IMutation {
    register(addUserArgs: AddUserArgs): User | Promise<User>;
    login(getUserArgs: GetUserArgs): User | Promise<User>;
    addBook(addBookArgs: AddBookArgs): Book | Promise<Book>;
    updateBook(updateBookArgs: UpdateBookArgs): Book | Promise<Book>;
}

export type DateTime = any;
type Nullable<T> = T | null;
