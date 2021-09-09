const LocalStorage = require('./local-storage')

test('new operator should return same instance every time', () => {
    const localStorage = new LocalStorage()

    expect(localStorage).toBe(new LocalStorage())
    expect(localStorage).toBe(new LocalStorage())
})
