import { URRL_HASH_LENGTH } from '@/config';
import { randomInteger } from '@/utils/random-number';
import { IURRL } from '../../../shared/interfaces/urrl';

class URRLService {
  private urrlStore = new Map<string, IURRL>();
  private hashPossibleChars = [];

  constructor() {
    // Initialize array of possible chars for hash
    for (let i = 0; i < 26; i++) {
      // add letters
      this.hashPossibleChars.push(String.fromCharCode(97 + i));
      // add uppercase letters
      this.hashPossibleChars.push(String.fromCharCode(65 + i));
    }
    for (let j = 0; j < 10; j++) {
      // add numbers
      this.hashPossibleChars.push(j);
    }
  }

  /**
   * Get a URRL associated to a given hash
   * @param hash 
   * @returns (IURRL) URRL associated to a given hash
   */
  public async getUrrlFromHash(hash: string): Promise<IURRL> {
    const currentUrrl = this.urrlStore.get(hash);
    if (currentUrrl) {
      currentUrrl.nbClicks++;
    }
    return currentUrrl;
  }

  /**
   * Return the list of all saved URRLs
   * @returns (Promise<IURRL[]>) Array of all saved URRLs
   */
  public async getAnalytics(): Promise<IURRL[]> {
    return this.urrlStore.size > 0 ? [...this.urrlStore.values()] : [];
  }

  /**
   * Create a new URRL from a URL
   * @param url (string) URL to shrink
   * @returns (Promise<IURRL>) Newly created URRL from URL
   */
  public async createURRL(url: string): Promise<IURRL> {
    if (!url) {
      return null;
    }
    const newHash = this.generateHash();
    const newURRL = {
      creationDate: new Date().getTime(),
      nbClicks: 0,
      originalUrl: url,
      shortUrl: newHash,
    };
    this.urrlStore.set(newHash, newURRL);
    return newURRL;
  }

  /**
   * Generates a new hash used to associate with a new URRL
   * @returns a new generated hash
   */
  private generateHash(): string {
    let hash = '';
    for (let i = 0; i < URRL_HASH_LENGTH; i++) {
      hash += this.hashPossibleChars[randomInteger(0, this.hashPossibleChars.length - 1)];
    }
    if (this.urrlStore.get(hash) !== undefined) {
      return this.generateHash();
    }
    return hash;
  }
}

const uRRLService = new URRLService();
export {
  uRRLService
};
