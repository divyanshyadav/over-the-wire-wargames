function createSingleton(fn, ...args) {
    let instance = null

    function createInstance() {
        return new fn(...args)
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance()
            }

            return instance
        },
    }
}

module.exports = {
    createSingleton,
}
