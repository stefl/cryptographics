$(function() {

  var w = 0;
  var r = 1;
  var b = 2;
  var g = 3;
  window.colors = ["#555555", "#00deef", "#fce172", "#ffffff"];

  window.language = {
    "a": [w,w,r,r],
    "b": [w,w,b,b],
    "c": [r,r,b,b],
    "d": [g,g,r,r],
    "e": [g,g,b,b],
    "f": [g,g,w,w],
    "g": [r,w,w,r],
    "h": [b,w,w,b],
    "i": [b,r,r,b],
    "j": [r,g,g,r],
    "k": [b,g,g,b],
    "l": [w,g,g,w],
    "m": [w,r,r,w],
    "n": [b,b,w,w],
    "o": [b,b,r,r],
    "p": [r,r,g,g],
    "q": [b,b,g,g],
    "r": [w,w,g,g],
    "s": [w,r,r,w],
    "t": [w,b,b,w],
    "u": [r,b,b,r],
    "v": [g,r,r,g],
    "w": [g,b,b,g],
    "x": [g,w,w,g],
    "y": [r,r,w,r],
    "z": [b,b,w,b],
    "A": [g,g,w,g],
    "B": [r,r,b,r],
    "C": [r,r,g,r],
    "D": [b,b,r,b],
    "E": [r,w,r,r],
    "F": [b,w,b,b],
    "G": [g,w,g,g],
    "H": [r,b,r,r],
    "I": [r,g,r,r],
    "J": [b,r,b,b],
    "K": [w,r,r,r],
    "L": [w,b,b,b],
    "M": [w,g,g,g],
    "N": [b,r,r,r],
    "O": [g,r,r,r],
    "P": [r,b,b,b],
    "Q": [r,r,r,w],
    "R": [b,b,b,w],
    "S": [g,g,g,w],
    "T": [r,r,r,b],
    "U": [r,r,r,g],
    "V": [b,b,b,r],
    "W": [b,b,g,b],
    "X": [g,g,r,g],
    "Y": [g,g,b,g],
    "Z": [b,g,b,b],
    "@": [g,r,g,g],
    "#": [g,b,g,g],
    "&": [b,b,b,g],
    "*": [g,g,g,r],
    "(": [g,g,g,b],
    ")": [b,r,w,b],
    "—": [r,b,w,r],
    "+": [w,r,b,w],
    "-": [w,b,r,w], // something wrong with encoding here I think. Should be emdash?
    "=": [r,w,b,b],
    "[": [b,w,r,r],
    "]": [r,b,w,w],
    "{": [b,r,w,w],
    "}": [w,b,b,r],
    ";": [w,r,r,b],
    "'": [b,w,w,r],
    ":": [r,w,w,b],
    "\"": [b,b,r,w],
    ",": [r,r,b,w],
    ".": [w,w,r,b],
    "/": [w,w,b,r],
    "?": [b,g,w,b],
    "\\": [g,b,w,g],
    "1": [w,g,b,w],
    "2": [w,b,g,w],
    "3": [g,w,b,b],
    "4": [b,w,g,g],
    "5": [g,b,w,w],
    "6": [b,g,w,w],
    "7": [w,b,b,g],
    "8": [w,g,g,b],
    "9": [b,w,w,g],
    "0": [g,w,w,b],
    "\n": [b,b,g,w],
    "!": [g,g,b,w],
    "\0": [0,1,2,3] // reserved for the colour indicator square at [0]
  };

  window.generate = function(scrolling, include_labels) {
    if($("#secret").val() == "") {
      $.scrollTo( '#creating', 800);
    }
    if($("#password").val() == "") {
      window.encrypted_secret = "\0" + $("#secret").val();
    } else {
      window.encrypted_secret = "\0" + GibberishAES.enc($("#secret").val(), $("#password").val());
    }
    var chars = window.encrypted_secret.split('');
    var columns = Math.floor(Math.sqrt(chars.length));
    var rows = Math.ceil(chars.length / columns);
    var square = Math.floor((width / columns)/2)*2;
    
    if((square * rows) > ($(window).height() * 0.75)) {
      square = Math.floor((($(window).height() * 0.75) / rows) / 2) * 2;
    }

    var row_height = include_labels ? square * 2 : square;
    var half = square/2;
    var left_gutter = (width - (columns * square))/2;
    paper.setSize(width, rows*row_height);


    paper.clear();
    for(var row = 0; row < rows; row++) {
      for(var col = 0; col < columns; col++ ) {
        var character = chars[row*columns + col];
        if(character !== undefined) {
          var left = "M" + (left_gutter + col * square) + " " + row * row_height + "l" + half + " " + half + " l " + (0 - half) + " " + half + "z";
          var top = "M" + (left_gutter + col * square) + " " + row * row_height + "l" + square + " 0 l" + (0-half) + " " + half + "z";
          var right = "M" + (left_gutter + (col * square) + square) + " " + row * row_height + "l 0 " + square + " l" + (0-half) + " " + (0 - half) + "z";
          var bottom = "M" + (left_gutter + col * square) + " " + ((row * row_height) + square) + "l" + square + " 0 l" + (0-half) + " " + (0 - half) + "z";

          paper.path(top).attr({fill: colors[language[character][0]], "stroke-width": 0.2, stroke: colors[language[character][0]]});
          paper.path(right).attr({fill: colors[language[character][1]], "stroke-width": 0.2, stroke: colors[language[character][1]]});
          paper.path(bottom).attr({fill: colors[language[character][2]], "stroke-width": 0.2, stroke: colors[language[character][2]]});
          paper.path(left).attr({fill: colors[language[character][3]], "stroke-width": 0.2, stroke: colors[language[character][3]]});
          if(include_labels) {
            paper.text(half + left_gutter + (col * square), row * row_height + half*3, character).attr({ "font-size": 16, "font-weight": 900, "font-color": "#444", "font-family": "effra, 'Helvetica Neue', Arial, Helvetica, sans-serif" });;
          }
        }
        else {
          var character_above = chars[(row-1)*columns + col];
          paper.rect(left_gutter + col*square, row * row_height, square, square).attr({fill: colors[language[character_above][2]], "stroke-width": 0.2, stroke: colors[language[character_above][2]]});
        }
      }
    }
    if(scrolling) {
      $.scrollTo( '#display', 800);
    }
  }

  $(".color-pick").each(function(i,e) {
    var ctx = this;
    var picker_color_id = $(ctx).data().color;
    $(this).spectrum({
      color: colors[picker_color_id]
    });
    $(this).change(function() {
      colors[picker_color_id] = $(ctx).val();
      generate(false, $("#display").hasClass("include_labels") );
    })
  });

  $("#generate").click(function(e) {
    e.preventDefault();
    generate(true, false);
  });

  $("#save").click(function(e) {
    e.preventDefault();
    svgString = paper.toSVG();
    blob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    saveAs(blob, "cryptographic.svg");
  });

  $("#send").click(function(e) {
    e.preventDefault();
    $(".svg").val(paper.toSVG());
    $("#send-it").submit();
  });

  $('#flash').delay(4000).fadeOut();

  if($("#display").size() > 0) {
    var width = $("#display").width();
    var height = $(window).height();
    var aspect = "portrait";

    if(width > height) {
      aspect = "landscape";
    }
    
    window.paper = Raphael("display", width, height);
    generate(false, $("#display").hasClass("include_labels"));
  }
  $("#secret").val("");
  $("#password").val("");
});