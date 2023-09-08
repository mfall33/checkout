import { BASE_URL } from "@/config";
import useStore from "@/store";

type FetchProps = {
    url: string,
    method?: string,
    headers?: HeadersInit,
    body?: BodyInit,
    nextParams?: object
}

export const authedFetch = ({ url, method, headers = {}, body, nextParams }: FetchProps) => {

    return fetch(BASE_URL + url, {
        next: nextParams,
        method: method,
        headers: headers,
        body: body
    })
}

export const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}