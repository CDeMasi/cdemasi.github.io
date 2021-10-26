/*
File: script.js
GUI Assignment: Creating an Interactive Dynamic Table
Caroline DeMasi, UMass Lowell Computer Science, Caroline_DeMasi@student.uml.edu
Copyright (c) 2021 by Caroline DeMasi. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Description: Controls all the behavior of this assignment. The matrix function handles errors,
calculates the values by multiplication, and creates the table, then adds values to the myMatrix div.
*/

function matrix() {

    //Retrieves the values of all the inputs
    var minY = Number(document.getElementById("minY").value);
    var maxY = Number(document.getElementById("maxY").value);
    var minX = Number(document.getElementById("minX").value);
    var maxX = Number(document.getElementById("maxX").value);

    //Clears any alerts previously displayed
    var elements = document.getElementsByClassName('alert');
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }

    var error = false;

    //Beginning of error handling section
    //Displays a bootstrap error message alert if user does not enter an input
    if(document.getElementById('minY').value == '') {
        document.getElementById('minY').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Please enter a value</div>');
        error = true;
    }

    if(document.getElementById('maxY').value == '') {
        document.getElementById('maxY').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Please enter a value</div>');
        error = true;
    }

    if(document.getElementById('minX').value == '') {
        document.getElementById('minX').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Please enter a value</div>');
        error = true;
    }

    if(document.getElementById('maxX').value == '') {
        document.getElementById('maxX').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Please enter a value</div>');
        error = true;
    }

    //Handles error if user input is too small using a bootstrap alert
    if(minY < -50) {
        document.getElementById('minY').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Value is too low</div>');
        error = true;
    }

    if(maxY < -50) {
        document.getElementById('maxY').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Value is too low</div>');
        error = true;
    }

    if(minX < -50) {
        document.getElementById('minX').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Value is too low</div>');
        error = true;
    }

    if(maxX < -50) {
        document.getElementById('maxX').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Value is too low</div>');
        error = true;
    }

    //Handles error if user input is too large using a bootstrap alert
    if(minY > 50) {
        document.getElementById('minY').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Value is too high</div>');
        error = true;
    }

    if(maxY > 50) {
        document.getElementById('maxY').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Value is too high</div>');
        error = true;
    }

    if(minX > 50) {
        document.getElementById('minX').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Value is too high</div>');
        error = true;
    }

    if(maxX > 50) {
        document.getElementById('maxX').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Value is too high</div>');
        error = true;
    }

    //Handles error if min is greater than the max using a bootstrap alert
    if (minY > maxY) {
        document.getElementById('maxY').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Min cannot be greater than max</div>');
        error = true;
    }

    if (minX > maxX) {
        document.getElementById('maxX').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Min cannot be greater than max</div>');
        error = true;
    }

    //Returns if any error is found
    if (error) {
        return;
    }

    var currX = minY;
    var currY = minX;
    var x;

    //Creates table
    var table = document.createElement('table');
    table.classList.add('newTable');

    //For loop to make row
    for (let i = 0; i <= (Math.abs(maxX - minX) + 1); i++){

        //Creates row
        var row = document.createElement('tr');

        currX = minY;

        //For loop to make column
        for (let j = 0; j <= (Math.abs(maxY - minY) + 1); j++){
            var col;

            //If it is first row, gives it header type
            if (i == 0) {
                col = document.createElement('th');
            } else {
                col = document.createElement('td');
            }

            //If it is header or first column, add a special class
            if ((i == 0) && (j == 0))  { 
                val = '';
                col.classList.add('firstCell');
            } 
            
            else if(i == 0) { 
                val = currX;
                currX++;
                col.classList.add('firstRow');
            } 
            
            else if(j == 0) {
                val = currY;
                col.classList.add('firstCol');
            }

            //Calculate the value by multiplying
            else {
                val = currX * currY;
                currX++;
            }

            //Sets column to calculated value
            col.innerHTML = val;

            //Adds to the row
            row.appendChild(col);
        }

        if(i != 0) {
            currY++;
        }

        //Adds the row to the table
        table.appendChild(row);
    }

    //Adds the table to div 'myMatrix'
    document.getElementById('myMatrix').innerHTML = '';
    document.getElementById('myMatrix').appendChild(table);
}