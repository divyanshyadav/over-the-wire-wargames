const fs = require('fs')

class LocalStorage {
    constructor(filePath = '.cache') {
        if (!LocalStorage.instance) {
            LocalStorage.instance = this
        } else {
            return LocalStorage.instance
        }

        this.filePath = filePath
        this.map = this._read(this.filePath)
    }

    set(key, value) {
        this.map[key] = value
        this._save()
    }

    get(key) {
        return this.map[key]
    }

    has(key) {
        return this.map[key] !== undefined
    }

    _save() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.map, null, 4))
        } catch (err) {
            console.log(err)
        }
    }

    _read() {
        try {
            const data = fs.readFileSync(this.filePath)
            return JSON.parse(data)
        } catch (err) {
            return {}
        }
    }
}

module.exports = LocalStorage
