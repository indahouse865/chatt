let expect = require('expect');

let {generateMessage} = require('./message');

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
