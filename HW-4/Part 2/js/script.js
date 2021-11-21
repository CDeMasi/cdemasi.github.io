/*
File: script.js
GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table
Caroline DeMasi, UMass Lowell Computer Science, Caroline_DeMasi@student.uml.edu
Copyright (c) 2021 by Caroline DeMasi. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Description: Controls all the behavior of this assignment. The matrix function handles errors,
calculates the values by multiplication, and creates the table, then adds values to the myMatrix div.
Updated for HW 4 with jQuery validation and tab interface.
*/

//Loads sliders and tab deletion function
$(document).ready(function() {
    //Creates sliders
    sliders();

    //Tab gets deleted when x is clicked
    const tabs = $("#tabs").tabs();
    tabs.on("click", "span.ui-icon-close", function() {
        //Searches for table
        let tableID = this.closest("li").querySelector("a").text;
        let checkedTable = document.getElementById(`${tableID}`);
        //Selects the tab table
        const child = checkedTable.querySelector(".tabTable");
        //Deletes tab
        this.parentElement.remove();
        //Deletes tab content
        child.parentElement.remove();
        tabs.tabs("refresh");
    });

    //Delete function for checked tabs
    $("#delete").on("click", function() {
        //Searches for checkboxes
        const checkBox = document.querySelectorAll(".checkBox");
        checkBox.forEach(checkBoxChecked => {
            //Searches for table
            let tableID = checkBoxChecked.closest("li").querySelector("a").text;
            const checkedTable = document.getElementById(`${tableID}`)
            //Selects the tab table
            const child = checkedTable.querySelector(".tabTable")
            //Removes tab and content if check box is checked
            if (checkBoxChecked.checked == true) {
                checkBoxChecked.parentElement.remove()
                child.parentElement.remove()
            }
        });
        $("#tabs").tabs("refresh");
    });
});

//Makes submit button submit form if input is valid
$("#submit").click(function(event){
    if($("#inputForm").valid()){
        $("#inputForm").submit();

        let minY = $("#minY").val();
        let maxY = $("#maxY").val();
        let minX = $("#minX").val();
        let maxX = $("#maxX").val();
        //Table header using min and max values
        const tableHeader = `[${minY},${maxY}]x[${minX},${maxX}]`;
        //Creates tabs using the createTab function
        $("#tabList").append(createTab(tableHeader));

        const tabTable = $("#tabData");
        const currentTable = document.querySelector("#myMatrix table").outerHTML;
        //Update the tab data
        tabTable.append(
            `<div id='${tableHeader}'>
                <div class='tabTable'>${currentTable}</div>
            </div>`
        );
    
        $("#tabs").tabs("refresh");
    }
});

//Tab creation function
function createTab(tableHeader) {
    //Creates all the parts of each tab
    const li = document.createElement("li");
    const link = document.createElement("a");
    const span = document.createElement("span");
    const input = document.createElement("input");
    const br = document.createElement("br");
    
    //Sets up the tab
    link.href = `#${tableHeader}`;
    link.textContent = tableHeader;
    span.className += "ui-icon-close";
    span.textContent = "x";
    input.type = "checkbox";
    input.className += "checkBox";
    
    //Updates and creates the tab
    li.append(link);
    li.append(span);
    li.append(br);
    li.append(input);
    return li;
}

//Validation handler
function validate(){
    //Checks if value is greater than any other
    $.validator.addMethod("greaterThan", function (value, element, param) {
        var i = parseInt(value)
        var j = parseInt($(param).val())
        return i >= j
    },"ERROR: Max must be greater than min");

    //Form validation
    $("#inputForm").validate({
        //Rules for validation, sets range and makes it required for each input (-50, 50)
        rules: {
            minY: {
                required: true,
                range: [-50, 50]
            },
            maxY: {
                required: true,
                range: [-50, 50],
                greaterThan: $("#minY")
            },
            minX: {
                required: true,
                range: [-50, 50]
            },
            maxX: {
                required: true,
                range: [-50, 50],
                greaterThan: $("#minX")
            }
        },
        //Error messages
        messages: {
            minY: {
                required: "ERROR: Empty input. Please enter a value between -50 to 50.",
                range: "ERROR: Please enter a value between -50 and 50."
            },
            maxY: {
                required: "ERROR: Empty input. Please enter a value between -50 to 50.",
                range: "ERROR: Please enter a value between -50 and 50."
            },
            minX: {
                required: "ERROR: Empty input. Please enter a value between -50 to 50.",
                range: "ERROR: Please enter a value between -50 and 50."
            },
            maxX: {
                required: "ERROR: Empty input. Please enter a value between -50 to 50.",
                range: "ERROR: Please enter a value between -50 and 50."
            }
        },
        //Matrix function gets run if form is successfully submitted
        submitHandler: function() {
            matrix();
            return false;
        },
        //Errors are placed after parent div
        errorPlacement(error, element) {
            error.insertAfter(element.parent('div'));
        }
    });
}

//Code for sliders
function sliders() {
    //Minimum Y value slider
    $("#minY_slider").slider({
        min: -50,
        max: 50,
        //Value and form updates when slider is moved
        slide: function(event, ui) {
            $("#minY").val(ui.value);
            validate();
            if($("#inputForm").valid()){
                $("#inputForm").submit();
            }
        }
    });

    //If user types in input, updates the slider value and validates the form
    $("#minY").on("keyup", function() {
        $("#minY_slider").slider("value", this.value);
        validate();
        if($("#inputForm").valid()){
            $("#inputForm").submit();
        }
    });

    //Maximum Y value slider
    $("#maxY_slider").slider({
        min: -50,
        max: 50,
        //Value and form updates when slider is moved
        slide: function(event, ui) {
            $("#maxY").val(ui.value);
            validate();
            if($("#inputForm").valid()){
                $("#inputForm").submit();
            }
        }
    });

    //If user types in input, updates the slider value and validates the form
    $("#maxY").on("keyup", function() {
        $("#maxY_slider").slider("value", this.value);
        validate();
        if($("#inputForm").valid()){
            $("#inputForm").submit();
        }
    });

    //Minimum X value slider
    $("#minX_slider").slider({
        min: -50,
        max: 50,
        //Value and form updates when slider is moved
        slide: function(event, ui) {
            $("#minX").val(ui.value);
            validate();
            if($("#inputForm").valid()){
                $("#inputForm").submit();
            }
        }
    });

    //If user types in input, updates the slider value and validates the form
    $("#minX").on("keyup", function() {
        $("#minX_slider").slider("value", this.value);
        validate();
        if($("#inputForm").valid()){
            $("#inputForm").submit();
        }
    });

    //Maximum X value slider
    $("#maxX_slider").slider({
        min: -50,
        max: 50,
        //Value and form updates when slider is moved
        slide: function(event, ui) {
            $("#maxX").val(ui.value);
            validate();
            if($("#inputForm").valid()){
                $("#inputForm").submit();
            }
        }
    });

    //If user types in input, updates the slider value and validates the form
    $("#maxX").on("keyup", function() {
        $("#maxX_slider").slider("value", this.value);
        validate();
        if($("#inputForm").valid()){
            $("#inputForm").submit();
        }
    });
}

//Start of code from HW 3
function matrix() {

    //Retrieves the values of all the inputs
    var minY = Number(document.getElementById("minY").value);
    var maxY = Number(document.getElementById("maxY").value);
    var minX = Number(document.getElementById("minX").value);
    var maxX = Number(document.getElementById("maxX").value);

    //Commenting out error handling from HW 3
    /*
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
    */

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