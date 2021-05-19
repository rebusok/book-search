import axios from "axios";
import {urlEnum} from "../data/constant/rootConst";


// http://covers.openlibrary.org/b/olid/${id}${size}.jpg
const axiosInstance = axios.create();


const Api = {
    searchBook(q: string, page?: number) {
        return axiosInstance.get<ResponseType>(urlEnum.SEARCH, {params: {q, mode: "ebooks", has_fulltext: true, page}})
    },
    fetchOneBook(bookId: string) {
        return axiosInstance.get<ResponseBookInfo>(`${urlEnum.FETCH_ONE_BOOK}${bookId}.json`)
    }
}

export interface ResponseType {
    docs: Array<ResponseBookType>
    num_found: number
    numFound: number
    start: number
}

export interface ResponseBookInfo {
    authors: [
        {
            author: { key: string },
            type: { key: string }
        }
    ]
    covers: number[]
    created: { type: string, value: string }
    key: string
    last_modified: { type: string, value: string }
    latest_revision: number
    revision: number
    subjects: string[]
    title: string
    type: {
        key: string
    }
    description?: string
    links?: [
        {
            "url": string,
            "title": string,
            "type": {
                "key": string
            }
        },
    ]
    subject_places?: string[]
    subject_people?: string[]
    excerpts?: {
        "author": {
            "key": string
        },
        "excerpt": string
        "comment": string
    }
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