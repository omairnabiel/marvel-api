/**
 * requestHandler is a wrapper around express requestHandler function to make error handling
 * cleaner through a centralized `catch`
 * @param {*} fn 
 * @returns 
 */
export const requestHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}