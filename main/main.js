'use strict';

function printReceipt(inputs) {
    var boughtItemDetails = receiptProcessing(inputs); //array

  console.log(countItem(gatherItemDetails(inputs)));
}

function receiptProcessing(itemIDList) { //input ARRAY
    var boughtItemDetails = [];
    var matchedIDItems = gatherItemDetails(itemIDList);
    var countedItem = countItem(matchedIDItems);
    return boughtItemDetails; //array return to printReceipt
}

function gatherItemDetails(itemIDList) {
    var allItems = loadAllItems();
    var boughtItem =[];
    var loopAllItem;
    var matchedItem = [];
    for (loopAllItem = 0 ; loopAllItem < allItems.length ; loopAllItem ++) {
        var matched = itemIDList.filter(element => allItems[loopAllItem].barcode.includes(element));
        matchedItem.push(matched);
    }
    return matchedItem; //array  --> [ [ 'ITEM000000', 'ITEM000000', 'ITEM000000', 'ITEM000000', 'ITEM000000' ], [ 'ITEM000001', 'ITEM000001' ], [  ], [  ], [ 'ITEM000004' ], [  ] ]
}

function countItem(matchedIDItems) {
    //var itemListWithQuantity = [];
    var itemListWithQuantity = loadAllItems();
    var loopMatchedItem;
    for (loopMatchedItem = 0 ; loopMatchedItem< matchedIDItems.length ; loopMatchedItem ++) {
        var quantity = matchedIDItems[loopMatchedItem].length;
        // matchedIDItems[loopMatchedItem]['quantity'] = quantity;
        //var temp = {"quantity": quantity};
        itemListWithQuantity[loopMatchedItem]= itemListWithQuantity.map(function(o){o.quantity = quantity; return o;});
    }

    //itemListWithQuantity= itemListWithQuantity.map(function(o){o.quantity = quantity; return o;});
    return itemListWithQuantity ; //array
}

function calculateSingleItemPrice(itemIDList) {
    var itemQuantityAndPrice = [];
    return itemQuantityAndPrice; //array

}

function generateReceipt() {

}

function sumTotalPrice() {
}

function presentReceipt() {
}
