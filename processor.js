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
            for(const item of items) {
                const { itemId, quantity } = item;
                const isItemNotAvailable = this.validateItemInStock(itemId, quantity);

                if(isItemNotAvailable) {
                    this.emit('PROCESSING_FAILED', {
                        orderNumber: payload.orderNumber,
                        reason: 'INSUFFICIENT_STOCK',
                        itemId: itemId,
                    });
                    return;
                }
            }
        } else {
            this.emit('PROCESSING_FAILED', {
                orderNumber: payload.orderNumber,
                reason: 'LINEITEMS_EMPTY',
            });
        }
    }

    validateItemInStock(itemId, quantity) {
        const stock = this.stock.find(i => (i.id === itemId && i.stock >= quantity));

        if(!stock) {
            return ({itemId, quantity});
        }

        return null;
    }
}

module.exports = OrderProcessor;