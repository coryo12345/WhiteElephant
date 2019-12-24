class Game {
    constructor(code) {
        this.code = code;
        this.items = [];
        this.latest = -1;
    }

    addItem(item) {
        this.items.push(item);
        return this.items.length - 1;
    }

    randomItem() {
        return (Math.random() * this.items.length) | 0;
    }

    getLatest() {
        if (this.latest == -1) {
            return "The game hasn't started yet";
        }
        else {
            return this.items[this.latest];
        }
    }
}

module.exports = Game;