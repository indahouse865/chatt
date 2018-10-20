const expect = require('expect');

//import isRealString
const {isRealString} = require('./validation.js');
//isRelString
//shoudl reject non string values
//should reject string with only spaces
//should allow string with non space characters

describe('isRealString', () => {
    it('Should reject non string values', () => {
        let str = {test: false};
        let result = isRealString(str);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(false);
    });

    it('Should reject when only spaces are sent', () => {
        let str = " ";
        let result = isRealString(str);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(false);
    });

    it('Should allow strings when any non space character is included', () => {
        let str = "MEOW  ";
        let result = isRealString(str);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });
});

