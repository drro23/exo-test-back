// const request = require('supertest');
// const app = require('../src/app');
//
// describe('basic', function () {
//     it('app is working', async () => {
//         await request(app).get('/').expect('Content-Type', /json/).then((response) => {
//             expect(response.statusCode).toEqual(200)
//             return JSON.parse(response.text)
//         }).then(data => {
//             expect(data.message).toBe('Hello World');
//         })
//     })
// });

describe('Jest simple test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true);
    })
})
