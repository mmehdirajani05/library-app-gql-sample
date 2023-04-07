
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
    images: string[];
}

export interface UpdateBookArgs {
    id: number;
    title: string;
    author: string;
    description: string;
    book_created_at: DateTime;
    images: string[];
}

export interface GetAllBooksArgs {
    sort: string;
    search_text: string;
    user_id: number;
}

export interface AddCollectionArgs {
    user_id: number;
    book_id: number;
    status: string;
}

export interface UpdateCollectionArgs {
    id: number;
    status: string;
}

export interface AddBookRatingsArgs {
    user_id: number;
    book_id: number;
    count: number;
}

export interface GetBookRatingsArgs {
    user_id: number;
    book_id: number;
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

export interface Collection {
    id: number;
    user_id: number;
    book_id: number;
    status: string;
}

export interface BookList {
    book_collection: Collection[];
    books: Book[];
}

export interface BookRatings {
    id: number;
    user_id: number;
    book_id: number;
    count: number;
}

export interface BookWithCollection {
    collection: Collection;
    book: Book;
    ratings: BookRatings[];
}

export interface BookRatingsSubscription {
    user_id: number;
    user_name: string;
    book_name: string;
    count: number;
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
    bookCollectionById(bookId: number, userId: number): BookWithCollection | Promise<BookWithCollection>;
}

export interface IMutation {
    register(addUserArgs: AddUserArgs): User | Promise<User>;
    login(getUserArgs: GetUserArgs): User | Promise<User>;
    addBook(addBookArgs: AddBookArgs): Book | Promise<Book>;
    updateBook(updateBookArgs: UpdateBookArgs): Book | Promise<Book>;
    allBooks(getAllBooksArgs: GetAllBooksArgs): BookList | Promise<BookList>;
    addCollection(addCollectionArgs: AddCollectionArgs): string | Promise<string>;
    updateCollection(updateCollectionArgs: UpdateCollectionArgs): string | Promise<string>;
    addBookRatings(addBookRatingsArgs: AddBookRatingsArgs): string | Promise<string>;
    getBookRatings(getBookRatingsArgs: GetBookRatingsArgs): BookRatings | Promise<BookRatings>;
}

export interface ISubscription {
    addBookRatingsSubscription(): BookRatingsSubscription | Promise<BookRatingsSubscription>;
}

export type DateTime = any;
type Nullable<T> = T | null;
