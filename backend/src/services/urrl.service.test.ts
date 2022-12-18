import { uRRLService } from './urrl.service'

describe('URRLService', () => {
    describe('getUrrlFromHash', () => {
      it('should return undefined', async() => {
        expect(await uRRLService.getUrrlFromHash(null)).toBe(undefined);
        expect(await uRRLService.getUrrlFromHash('')).toBe(undefined);
        expect(await uRRLService.getUrrlFromHash('unknown_hash')).toBe(undefined);
      });
    });

    describe('getAnalytics', () => {
        it('should return an empty array', async() => {
          expect((await uRRLService.getAnalytics()).length).toBe(0);
        });

        it('should return an array with an item', async() => {
            expect((await uRRLService.getAnalytics()).length).toBe(0);
            const originalUrl = 'http://lunii.fr';
            const hash = await uRRLService.createURRL(originalUrl);
            expect((await uRRLService.getAnalytics()).length).toBe(1);           
          });
    });

    describe('createURRL', () => {
        it('should return an empty hash', async() => {
          expect((await uRRLService.createURRL(null))).toBe(null);
        });

        it('should return a valid hash', async() => {
            const originalUrl = 'http://lunii.fr';
            const hash = await uRRLService.createURRL(originalUrl);
            expect(hash.shortUrl.length).toBe(6);
            expect(hash.originalUrl).toBe(originalUrl);
        });
    });
});