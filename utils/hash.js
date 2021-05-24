import md5 from "md5"
/**
 * getHash creates md5 of (ts+ privateKey+ publicKey) , which is to passed as query param
 * to the marvel api
 */
export const getHash = () => {
    const {PRIVATE_MARVEL_API_KEY, PUBLIC_MARVEL_API_KEY, TS} = process.env
    
    return md5(`${TS}${PRIVATE_MARVEL_API_KEY}${PUBLIC_MARVEL_API_KEY}`)
}