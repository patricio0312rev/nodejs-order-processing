const EventEmitter = require('events');
const StockList = require('./stock-list.json');

class OrderProcessor extends EventEmitter {
    constructor() {
        super();
        this.stock = StockList;
    }


    placeOrder(payload) {
        this.emit('PROCESSING_STARTED', payload.orderNumber);

        const items = payload.lineItems;

        if(items && items.length > 0) {
            
        } else {
            this.emit('PROCESSING_FAILED', {
                orderNumber: payload.orderNumber,
                reason: 'LINEITEMS_EMPTY',
            });
        }
    }
}

module.exports = OrderProcessor;