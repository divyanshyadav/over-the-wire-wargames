const LocalStorage = require('./local-storage')

test('getInstance should give same instance every time', () => {
    const localStorage = LocalStorage.getInstance()

    expect(localStorage).toBe(LocalStorage.getInstance())
    expect(localStorage).toBe(LocalStorage.getInstance())
})
