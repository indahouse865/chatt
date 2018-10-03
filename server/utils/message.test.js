let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMesage', () => {
    it('Should generate correct message object', () => {
        let from = 'testString';
        let text = "Hello World!";
        let message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = "geoFrom";
        let lat = "1";
        let long = "2";
        let url = "https://www.google.com/maps?q=1,2";
        let message = generateLocationMessage(from, lat, long);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            url
        });
    });
});
