//Variable initialization, including scores, Letters, Rack, dictionary, and distribution arrays
var bestScore = 0 
var currscore = 0
var Letters = []
var Rack = []
let dict = []
let distribution = []

//This is the data structure that holds each letter tiles's value, amount, and image
var ScrabbleTiles = 
    [
        {"letter":"A", "value" : 1,  "amount" : 9,  "image":"graphics_data/Scrabble_Tiles/a.jpg"},
        {"letter":"B", "value" : 3,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/b.jpg" },
        {"letter":"C", "value" : 3,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/c.jpg" },
        {"letter":"D", "value" : 2,  "amount" : 4,  "image":"graphics_data/Scrabble_Tiles/d.jpg" },
        {"letter":"E", "value" : 1,  "amount" : 12, "image":"graphics_data/Scrabble_Tiles/e.jpg" },
        {"letter":"F", "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/f.jpg" },
        {"letter":"G",  "value" : 2,  "amount" : 3,  "image":"graphics_data/Scrabble_Tiles/g.jpg" },
        {"letter":"H",  "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/h.jpg" },
        {"letter":"I",  "value" : 1,  "amount" : 9,  "image":"graphics_data/Scrabble_Tiles/i.jpg"  },
        {"letter":"J",  "value" : 8,  "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/j.jpg"  },
        {"letter":"K",  "value" : 5,  "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/k.jpg"  },
        {"letter":"L",  "value" : 1,  "amount" : 4,  "image":"graphics_data/Scrabble_Tiles/l.jpg"  },
        {"letter":"M",  "value" : 3,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/m.jpg"  },
        {"letter":"N",  "value" : 1,  "amount" : 6,  "image":"graphics_data/Scrabble_Tiles/n.jpg"  },
        {"letter":"O",  "value" : 1,  "amount" : 8,  "image":"graphics_data/Scrabble_Tiles/o.jpg"  },
        {"letter":"P",  "value" : 3,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/p.jpg"  },
        {"letter":"Q",  "value" : 10, "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/q.jpg"  },
        {"letter":"R",  "value" : 1,  "amount" : 6,  "image":"graphics_data/Scrabble_Tiles/r.jpg"  },
        {"letter":"S",  "value" : 1,  "amount" : 4,  "image":"graphics_data/Scrabble_Tiles/s.jpg"  },
        {"letter":"T",  "value" : 1,  "amount" : 6,  "image":"graphics_data/Scrabble_Tiles/t.jpg"  },
        {"letter":"U",  "value" : 1,  "amount" : 4,  "image":"graphics_data/Scrabble_Tiles/u.jpg"  },
        {"letter":"V",  "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/v.jpg"  },
        {"letter":"W",  "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/w.jpg"  },
        {"letter":"X",  "value" : 8,  "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/x.jpg"  },
        {"letter":"Y",  "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/y.jpg"  },
        {"letter":"Z",  "value" : 10, "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/z.jpg"  },
        {"letter":"_",  "value" : 0,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/free.jpg" }
    ]

//The is the data structure that holds the board images and the special slot types
var ScrabbleBoard = 
    [
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Double","lMultiply":1, "wMultiply":2,"image": "graphics_data/double.png"},
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Double","lMultiply":1, "wMultiply":2,"image": "graphics_data/double.png"}   
    ]

$(document).ready(function()
{   
    //Parses the dictionary 
    $.ajax({
        url: "https://cdemasi.github.io/HW-5/words.txt",
        success: function(result) {
            //Each word is added to the dictionary array
            var words = result.split("\n")
            for (var i = 0; i < words.length; ++i) {
                dict.push([words[i].toUpperCase()])
            }
        }
    });

    for (var i = 0; i < 7; i++)
    {   
        //Scrabble board is set up, images get added, index and type are stored
        $("#board").append("<img id = 'boardtile" + i + "'class= 'board' index = '" + i + "'type = '" + ScrabbleBoard[i].type + "'src = '" + ScrabbleBoard[i].image + "' />")
    }

    reset()
})

//Function when letter is dropped onto the board
function addLetter(event,ui)
{
    const letter = ui.draggable.attr('Letter')
    const id = ui.draggable.attr('id')
    const type = $(this).attr('type')
    const index = $(this).attr('index')

    //Determines if Letters is or is not empty
    var empty = true
    if (Letters.length != 0 && Letters !== undefined) {
        for (var i in Letters) {
            if (i) {
                empty = false
                break
            }
        }
    }

    //This figures out if the letter is being dragged from one board slot to another slot
    var dupe = false
    for (var i in Letters) {
        if (i) {
            if(Letters[i]['id'] == id){
                delete Letters[i]
                dupe = true
                break
            }
        }
    }

    var valid = empty
    if (!empty) {
        var skip = false
        //Determines if the slot user is trying to drag a tile to is already taken
        for (var i = 0; i < Letters.length; ++i) {
            if (Letters[i]) {
                if (index == i) {
                    skip = true
                    break
                }
            }
        }

        if (!skip) {
            //Determines if the tile the user is dropping is next to a filled slot
            for (var i = 0; i < Letters.length; ++i) {
                if (Letters[i]) {
                    if (index == i + 1 || index == i - 1) {
                        valid = true
                        break
                    } 
                }
            }
        }
    }

    if (valid) {
        //The letter tile being dropped is added to the Letters array
        Letters[index] = {index,type,letter,id}
        if (!dupe){

            //Dropped letter gets removed from the rack
            for (var i = 0; i < Rack.length; ++i) {
                if (Rack[i]) {
                    if (Rack[i]['id'] == id) {
                        delete Rack[i]
                        break
                    }  
                }
            }
        }

        //Tile gets nicely snapped to the center of the slot
        ui.draggable.position({
            of: $(this),
        })
    } else {
        //Tile gets bounced back to its original place in the rack
        ui.draggable.css({"position": "relative", "top": "", "left": ""})
    }
}

//This function gets called when a tile is placed in the rack
function removeLetter(event,ui)
{
    const letter = ui.draggable.attr('Letter')
    const id = ui.draggable.attr('id')
    //The moved tile is moved to the rack array
    Rack[id] = {letter, id} 
    //Tile is removed from the letters array
    for (var i = 0; i < Letters.length; ++i) {
        if (Letters[i]) {
            if (Letters[i]['id'] == id) {
                delete Letters[i]
                break
            }
        }
    }
    //Tile is snapped back to the rack
    ui.draggable.css({"position": "relative", "top": "", "left": ""})
    update()
}

//Draggable and droppable stuff gets set up starting here
function update()
{
    //This is the letter tile draggable, if a tile isn't dropped then it gets sent back to its original place in the rack
    $(".letterTile").draggable({
        snapMode: 'inner',
        revertDuration: 200,
        start: function(event,ui){
            $(this).draggable("option", "revert", "invalid")
        }
    })

    //This is the board droppable
    $(".board").droppable({
        accept: '.letterTile',
        drop: addLetter
    })

    //This is the rack droppable
    $('#rack').droppable({
        accept: '.letterTile',
        drop: removeLetter,
    });
}

//When submit is pressed, points are added to score
function score()
{
    var word = ""
    var blank = false

    //Fills the word string with the word the user creates, and checks for blank tiles
    for(var j = 0; j < Letters.length; ++j) {
        if (Letters[j]) {
            var key = Letters[j]['letter']
            word += key
            if (key == "_")
                blank = true
        } else {
            word += " "
        }
    }

    word = word.trim()
    let i = 0

    //Handles case if a blank tile is detected
    if (blank) {
        //Generates all possible words with the blank
        var words = []
        for (j = 0; j < 27; ++j) {
            words[j] = word.replace("_", ScrabbleTiles[j].letter)
        }

        var b = false

        //Cross checks all possible words with the dictionary
        for (j = 0; j < 26; ++j) {
            for (i = 0; i < dict.length; i++) {
                if (dict[i][0] == words[j]) {
                    b = true
                    break
                }
            } 
            if (b)
                break
        }
    } else {
        //Checks the word with the dictionary file
        for (i = 0; i < dict.length; i++) {
            if (dict[i][0] == word) {
                break
            }
        }
    }

    //Any alerts previously shown are removed
    var elements = document.getElementsByClassName('alert');
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }

    //Error message for if it is not a valid word
    if (i == dict.length) {
        document.getElementById('rack').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">ERROR: Not a valid word!</div>');

    //Else if it is valid, generate the user's current score
    } else {
        //Each letter value is added to the current score.
        for(var j = 0; j < Letters.length; ++j) {
            if (Letters[j]) {
                var key = Letters[j]['letter']
                const tiles = Letters[j]['type']
                const value = ScrabbleTiles.filter((val) => val.letter == key)[0].value

                //If tile is on double letter score, x2 to the letter score
                if (tiles == 'Double')
                {
                    currscore += value * 2
                }
                else
                {
                    currscore += value
                }
            }
        }

        //Checks current score against best score, sets it to best score if it is higher
        if (bestScore < currscore)
        {
            bestScore = currscore
        }

        //Board is cleared, scores are displayed
        clear()
        $("#Score").text(currscore)
        $("#BestScore").text(bestScore)
    }
    
}

//Function runs if game is reset
function reset()
{
    currscore = 0
    Letters = []
    Rack = []
    $("#Score").text("0")
    $("#rack").empty()
    //Proper distribution of letters is created
    distribution = []

    for (var i = 0; i < 27; ++i){
        for (var j = 0; j < ScrabbleTiles[i].amount; ++j){
            distribution.push([ScrabbleTiles[i].letter])
        }
    }

    //7 totally new tiles are generated 
    for(var i = 0; i < 7; ++i)
    {
        //Random number generator
        const x = Math.floor(Math.random() * (100 - i))
        const letter = distribution[x]
        const index = ScrabbleTiles.filter((val) => val.letter == letter)[0]
        //New tile is appended to the rack
        $("#rack").append("<img id= '" + i + "' class = 'letterTile' letter= '" + index.letter + "' src= '" + index.image + "' />")
        const id = i
        //Tile is added to the rack array
        Rack[i] = {letter, id}
        distribution.splice(x,1)
    }

    //The tiles left counter is updated
    $("#TilesLeft").text(distribution.length)
    update()

    //All alerts are removed
    var elements = document.getElementsByClassName('alert');
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
}

//Function clears board in between rounds
function clear() {
    Letters = []
    $("#rack").empty()

    //Rack regeneration using the rack array
    for (var i = 0; i < 7; ++i) {
        //If a tile already exists in a certain slot, it gets added again
        if (Rack[i]) {
            const index = ScrabbleTiles.filter((val) => val.letter == Rack[i]['letter'])[0]
            $("#rack").append("<img id= '" + i + "' class = 'letterTile' letter= '" + index.letter + "' src= '" + index.image + "' />")

        //If there is not a tile already in the slot, a new one is added
        } else {
            if (distribution.length > 0) {
                const x = Math.floor(Math.random() * distribution.length)
                const letter = distribution[x]
                const index = ScrabbleTiles.filter((val) => val.letter == letter)[0]
                $("#rack").append("<img id= '" + i + "' class = 'letterTile' letter= '" + index.letter + "' src= '" + index.image + "' />")
                const id = i
                Rack[i] = {letter, id}
                distribution.splice(x,1)
            }
        }
    }

    //Tiles left counter is updated
    $("#TilesLeft").text(distribution.length)
    update()
}