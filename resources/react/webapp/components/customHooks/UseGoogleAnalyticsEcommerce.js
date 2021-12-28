import React, { useState } from 'react';
import ReactGA from "react-ga";
ReactGA.pageview(window.location.pathname + window.location.search);
ReactGA.initialize('UA-209380285-1', {
    standardImplementation: true
});
ReactGA.plugin.require('ecommerce');


export default function useGoogleAnalyticsEcommerce() {

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
        'currency': 'CLP',
    })
    const [items, setItems] = useState([]);

    function addTransaction(obj){
        // console.log('add transaction', {'id': obj.id});
        setTransaction({
            ...transaction,
            'id': obj.id,
            'affiliation': obj.affiliation,
            'revenue': obj.revenue,
            'shipping': obj.shipping,
            'tax': obj.tax,
            'currency': 'CLP',
        })
    }

    function addItems(objs) {
        let newItems = [];

        // console.log('order items: ', objs);

        newItems = objs.map(obj => {
            // console.log('order item iteration',obj);
            return {
                'id': obj.order_id,
                'name': obj.name,
                'sku': obj.product.sku,
                'category': obj.product.subcategory.name,
                'price': obj.price,
                'quantity': obj.quantity,
                'currency': 'CLP',
            }
        });
        // console.log('new items',newItems);
        setItems(newItems);
    }

    function send(){
        console.log('send to Google Analytics', items);

        ReactGA.plugin.execute('ecommerce', 'addTransaction', transaction);

        items.forEach(item => {
            console.log('adding item to transaction ', transaction.id);
            console.log(item);
            ReactGA.plugin.execute('ecommerce', 'addItem', item);
        });

        ReactGA.plugin.execute('ecommerce', 'send');
        ReactGA.plugin.execute('ecommerce', 'clear');

        clearTransaction();
    }

    const clearTransaction = () => {
        setTransaction({
            'id': '',
            'affiliation': null,
            'revenue': null,
            'shipping': null,
            'tax': null,
            'currency': 'CLP',
        });
        setItems([]);
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

