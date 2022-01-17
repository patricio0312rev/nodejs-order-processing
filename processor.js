const EventEmitter = require('events');
const StockList = require('./stock-list.json');

class OrderProcessor extends EventEmitter {

    constructor() {
        super();
        this.stock = StockList;
    }
}

module.exports = OrderProcessor;