import request from 'supertest';
import App from '@/app';
import IndexRoute from '@/routes/urrl.route';

const websiteUrl = 'http://lunii.fr';
describe('Testing URRL API', () => {
    describe('[GET] /api/shorturl/analytics', () => {
        it('response statusCode 200', () => {
            const indexRoute = new IndexRoute();
            const app = new App([indexRoute]);

            return request(app.getServer()).get(`/api/shorturl/analytics`).expect(200, []);
        });
    });

    describe('[POST] and [GET] /api/shorturl', () => {
        it('response statusCode 200', async() => {
            const indexRoute = new IndexRoute();
            const app = new App([indexRoute]);

            const postResponse = await request(app.getServer()).post(`/api/shorturl`).send({url: websiteUrl}).expect(200);
            const getResponse = await request(app.getServer()).get(`/api/shorturl/${postResponse.body.urrl.shortUrl}`).expect(302);
            expect(postResponse.body.urrl.originalUrl).toBe(websiteUrl);
            expect(getResponse.headers.location).toBe(websiteUrl);
        });
    });
});