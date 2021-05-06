import { LocalStorage } from './local-storage.service';

describe('LocalStorage service', () => {

  let localStorageService: LocalStorage;

  beforeEach(() => {

    localStorage.clear();

    localStorageService = new LocalStorage();

  });

  it('should (de)serialize correctly', () => {

    const index = 'test';
    const value = { hello: 'world' };

    localStorageService.setItem(index, value);

    const result = localStorageService.getItem(index);

    expect(result).toEqual(value);

  });

});
