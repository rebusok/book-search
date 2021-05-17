import axios from "axios";

const configOMB = {
    baseURL: 'https://openlibrary.org/search.json',
};
// http://covers.openlibrary.org/b/olid/${id}${size}.jpg
const axiosInstance = axios.create(configOMB);
export enum sizeTypeCover  {
    SMALL = 'S',
    MEDIUM = 'M',
    LARGE = 'L'
}
const Api = {
    searchBook(q:string, page?:number) {
       return  axiosInstance.get<ResponseType>('', {params: {q, mode:"ebooks", has_fulltext:true, page}})
    }
}
export interface ResponseType {
    docs: Array<ResponseBookType>
    num_found: number
    numFound: number
    start: number
}

export interface ResponseBookType {
    author_key: string[]
    author_name: string[]
    cover_edition_key: string //id image
    cover_i: number
    ddc: string[]
    ebook_count_i: number
    edition_count: number
    edition_key: string[]
    first_publish_year: number
    has_fulltext: boolean
    ia: string[]
    ia_collection_s: string
    id_goodreads: string[]
    id_librarything: string[]
    isbn: string[]
    key: string // id book
    language: string[]
    last_modified_i: number
    lcc: string[]
    lccn: string[]
    printdisabled_s: string
    public_scan_b: boolean
    publish_date: string[]
    publish_place: string[]
    publish_year: number[]
    publisher: string[]
    seed: string[]
    subject: string[]
    text: string[]
    title: string
    title_suggest: string
    type: string
}

export default Api