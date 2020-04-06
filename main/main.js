'use strict';

function printReceipt(inputs) {
    var boughtItemDetails = receiptProcessing(inputs); //array
    var Receipt = generateReceipt(calculateSingleItemPrice(countItem(gatherItemDetails(inputs))));
//sumTotalPrice(calculateSingleItemPrice(countItem(gatherItemDetails(inputs))))
  console.log(Receipt);
}

function receiptProcessing(itemIDList) { //input ARRAY
    var boughtItemDetails = [];
    var matchedIDItems = gatherItemDetails(itemIDList);
    var countedItem = countItem(matchedIDItems);
    var singleItemPrice = calculateSingleItemPrice(countedItem); //object with quantity
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
    var itemListWithQuantity = loadAllItems();
    itemListWithQuantity= itemListWithQuantity.map(function(o){o.quantity = 0; return o;});
    var loopMatchedItem;
    for (loopMatchedItem = 0 ; loopMatchedItem < matchedIDItems.length ; loopMatchedItem ++) {
        var quantity = matchedIDItems[loopMatchedItem].length;
        itemListWithQuantity[loopMatchedItem].quantity = quantity;
    }
    return itemListWithQuantity ; //array
}

function calculateSingleItemPrice(countedItem) {
    var itemQuantityAndPrice = countedItem;
    itemQuantityAndPrice= itemQuantityAndPrice.map(function(o){o.singlePrice = 0; return o;});
    var loopCountedItem;
    for (loopCountedItem = 0 ; loopCountedItem < countedItem.length ; loopCountedItem ++) {
        var singlePrice = countedItem[loopCountedItem].price * countedItem[loopCountedItem].quantity;
        itemQuantityAndPrice[loopCountedItem].singlePrice = singlePrice;
    }
    return itemQuantityAndPrice; //array
}

function generateReceipt(itemQuantityAndPrice) {
    var totalPrice = sumTotalPrice(itemQuantityAndPrice);
    return presentReceipt(totalPrice, itemQuantityAndPrice);
}

function sumTotalPrice(itemQuantityAndPrice) {
    var totalPrice = 0;
    var loopAllItem;
    for (loopAllItem = 0 ; loopAllItem < itemQuantityAndPrice.length ; loopAllItem ++){
        totalPrice = totalPrice + parseFloat(itemQuantityAndPrice[loopAllItem].price) * parseInt(itemQuantityAndPrice[loopAllItem].quantity);
    }
    return totalPrice;
}

function presentReceipt(totalPrice, itemQuantityAndPrice) {
    var itemString = "";
    var loopAllItem;
    for (loopAllItem = 0 ; loopAllItem < itemQuantityAndPrice.length ; loopAllItem ++){
            if (itemQuantityAndPrice[loopAllItem].quantity != 0){
            itemString = itemString +  "Name:"+ itemQuantityAndPrice[loopAllItem].name+"，Quantity:"+ itemQuantityAndPrice[loopAllItem].quantity+" "+
            itemQuantityAndPrice[loopAllItem].unit;

            if(itemQuantityAndPrice[loopAllItem].quantity > 1){
                    itemString = itemString + "s,Unit:"+parseFloat(itemQuantityAndPrice[loopAllItem].price).toFixed(2)+" (yuan),Subtotal:"+
                    parseFloat(itemQuantityAndPrice[loopAllItem].singlePrice).toFixed(2)+" (yuan)";
            }

            if(itemQuantityAndPrice[loopAllItem].quantity == 1){
            itemString = itemString + ",Unit:"+parseFloat(itemQuantityAndPrice[loopAllItem].price).toFixed(2)+" (yuan),Subtotal:"+
            parseFloat(itemQuantityAndPrice[loopAllItem].singlePrice).toFixed(2)+" (yuan)";
            }

                if(loopAllItem != itemQuantityAndPrice.length - 1){
                    itemString = itemString + "\n";
                }
            }
        }
    return ("***<store earning no money>Receipt *** " + "\n" + itemString + "----------------------"+"\n"+
            "total:"+ parseFloat(totalPrice).toFixed(2) +" (yuan)"+"\n"+"**********************");

}


