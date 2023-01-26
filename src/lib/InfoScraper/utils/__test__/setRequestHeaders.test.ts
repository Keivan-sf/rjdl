import { setRequestHeaders } from '../index';
import { getRequestHeaders } from '../index';
import { headersInputType } from '../../interfaces';
describe("setRequestHeaders()", () => {

    
    it("should use default headers when not called setRequestHeaders()", () => {
        expect(getRequestHeaders())
            .toEqual({
               "user-agent":
                 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
             })
    })

    it("should set custom headers", () => {
        const headers:headersInputType = {
            "user-agent": "xxxx xxx xxx",
            "user-jwt":"xxxxxx.xxxxxxxx.xxxx"
        }
        setRequestHeaders(headers)
        expect(getRequestHeaders()).toEqual(headers)
    })


})