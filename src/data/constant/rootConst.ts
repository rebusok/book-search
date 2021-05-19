export enum sizeTypeCover  {
    SMALL = '-S',
    MEDIUM = '-M',
    LARGE = '-L'
}
export enum urlEnum {
    SEARCH = 'https://openlibrary.org/search.json',
    FETCH_ONE_BOOK = 'https://openlibrary.org/works/',
    FETCH_COVER_ONE_BOOK = 'https://covers.openlibrary.org/b/id/'
}
export const urlImg = 'https://covers.openlibrary.org/b/olid/';

export enum StatusFetchEnum {
    OK = 'succeeded',
    LOADING = 'loading',
    FAIL = 'failed'
}

