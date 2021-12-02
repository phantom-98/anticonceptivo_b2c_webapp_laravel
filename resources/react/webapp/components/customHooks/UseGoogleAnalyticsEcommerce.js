import React, { useState, useEffect } from 'react';
import ReactGA from "react-ga";

export default function useGoogleAnalyticsEcommerce() {

    // ga('require', 'ecommerce'); (?)
    // instanciar ga (?)
    // key de ga (?) -> humberto (?)
    // queda en memoria (?)
    // usar solo una función send / close (?)

    const defaultTransaction = {
        'id': '1234',                     // Transaction ID. Required.
        'affiliation': 'Acme Clothing',   // Affiliation or store name.
        'revenue': '11.99',               // Grand Total.
        'shipping': '5',                  // Shipping.
        'tax': '1.29',                    // Tax.
        'currency': 'EUR',                // local currency code.
    }

    const defaultItem = {
        'id': '1234',                     // Transaction ID. Required.
        'name': 'Fluffy Pink Bunnies',    // Product name. Required.
        'sku': 'DD23444',                 // SKU/code.
        'category': 'Party Toys',         // Category or variation.
        'price': '11.99',                 // Unit price.
        'quantity': '1',                  // Quantity.
        'currency': 'GBP',                // local currency code.
    };

    const [transaction, setTransaction] = useState({
        'id':'',
        'affiliation': null,
        'revenue': null,
        'shipping': null,
        'tax': null,
        'currency': null,
    })
    const [items, setItems] = useState([]);

    function addTransaction(obj){
        // add transaction in state
        setTransaction({
            ...transaction,
            'id': obj.id,
            'affiliation': obj.affiliation ? obj.affiliation : null,
            'revenue': obj.revenue ? obj.revenue : null,
            'shipping': obj.shipping ? obj.shipping : null,
            'tax': obj.tax ? obj.tax : null,
            'currency': obj.currency ? obj.currency : null,
        })

        // or use the command directly
        // ga('ecommerce:addTransaction', obj); 
    }

    function addItems(objs) {
        // add item in state

        let newItems = [];

        newItems = objs.map(obj => {
            return {
                'id': obj.id,
                'name': obj.name,
                // 'sku': obj.sku ? obj.sku : null,
                // 'category': obj.category ? obj.category : null,
                // 'price': obj.price ? obj.price : null,
                // 'quantity': obj.quantity ? obj.quantity : null,
                // 'currency': obj.currency ? obj.currency : null,
            } 
        });

        setItems(newItems);

        // or use the command directly
        // ga('ecommerce:addItem', obj);
    }

    function send(){
        ReactGA.initialize({
            trackingId: "UA-209380285-1",
            debug: true,
            gaOptions: {
                cookieDomain: "none"
            }
        });

        if (!transaction.id) {
            console.log('add transaction error, no id found.');
            return null;
        }

        if (!items.length) {
            console.log('add item error, no items found');
            return null;
        }

        ReactGA.plugin.execute('ec', 'addTransaction', transaction);
        items.forEach(item => {
            ReactGA.plugin.execute('ec', 'addItem', item);
        });
        ReactGA.plugin.execute('ec', 'send');
        ReactGA.plugin.execute('ec', 'clear');

        // recursive ecommerce:commands
        // ga('ecommerce:addTransaction', transaction);

        // items.forEach(item => {
        //     ga('ecommerce:addItem', item);
        // });

        // ga('ecommerce:send');

        // or use the command directly
        // ga('ecommerce:send');
    }

    function clear(){
        // just clear in case of error (?)
        // ga('ecommerce:clear');
    }

    return {
        addTransaction, 
        addItems,
        send,
        clear,
        transaction,
        items,
    };
}

