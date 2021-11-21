var list = document.getElementsByTagName('ul')[0];

// ADD NEW ITEM TO END OF LIST
var lastItem = document.createElement('li');
var lastText = document.createTextNode('cream');
lastItem.appendChild(lastText);
list.appendChild(lastItem);

// ADD NEW ITEM START OF LIST
var firstItem = document.createElement('li');
var firstText = document.createTextNode('kale');
firstItem.appendChild(firstText);
list.insertBefore(firstItem, list.firstChild); 

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var listItems = document.getElementsByTagName('li');
var i;
for (i = 0; i < listItems.length; i++) {
 listItems[i].setAttribute('class', 'cool');
}


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var header = document.getElementsByTagName('h2')[0];
header.insertAdjacentHTML("beforeend", `<span>${list.children.length}</span>`);
