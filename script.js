$(document).ready(function(){

  /* THIS IS MAYBE FOR FUTURE ADD ON
  var numberofRadios = $('input:radio[id^="option_"]').length;
  console.log(numberofRadios);
  */

  var enableSubmit = function(element) {
    $(element).css({"pointer-events": "auto"});
    $(element).css({"color": "white"});

  }

  var value = 1;
  value = $('input:radio').val();
  //console.log(value);



  //RADIO START
  $('input:radio').change(function(){
    value = $(this).val();
    //console.log(value);
  });
  //RADIO END

  $(".jumbotron").addClass("animated bounceIn");

  $("body").addClass("animated fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass("animated fadeIn");
    });

  // RESTS THE ENTIRE PAGE
  $('#resetValue').click(function() {
    $("#searchText").val('');
    $("#numberSearches").html("");
    $("#searchLength").html("");
    $("#centermagic").addClass("centered");
    $(".thisPara").show();
    $("body").addClass("animated fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $(this).removeClass("animated fadeIn");
      });
  });

  // THIS HAS FOCUS ON BODY AND ENTRY SUBMITS VIA ENTER KEY
  $("body").keyup(function(e){
    if(e.which === 13 && $('#getValue').css("pointer-events") == "auto"){
        $('#getValue').click();
        $('#getValue').css({"pointer-events": "none"});
        $('#getValue').css({"color": "#2d2d2d"});

    }
  });

  // ESCAPE KEY FOR RESET
  $("body").keydown(function(e){
    if(e.which === 27){
        $('#resetValue').click();
    }
  });

  $('#getValue').click(function() { //click START


    var that = this;
    $(this).css({"pointer-events": "none"});
    $('#getValue').css({"color": "#2d2d2d"});
    setTimeout(function() {
      enableSubmit(that)}, 1000);


    var searchValue = $("#searchText").val();
    searchValue = searchValue.split(" ").join("+");
    //console.log(searchValue);
    var numberOfSearch = value;
    //console.log(numberOfSearch);
    if(searchValue=='') {
      $("#searchText").addClass("animated shake").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass("animated shake");
        });

    //alert("Enter Some Text In Input Field");

  } else { //ELSE START
      $("#centermagic").removeClass("centered");
      $("#searchLength").html("");
      $("#numberSearches").html("");
      $(".searchFound").html("");
      $(".daTitles").html("");
      $(".daWords").html("");
      $(".thisPara").hide();

      var idButton = "https://en.wikipedia.org/?curid="
      //SEARCH URL
      var reqURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&indexpageids=1&generator=search&exsentences=2&exlimit=max&exintro=1&explaintext=1&exsectionformat=plain&piprop=original&gsrsearch="
      //SEARCH TERM
      var searhReq = searchValue
      reqURL += searhReq;
      //LIMIT OF SEARCH [] -500 max
      var searchLimit = "&gsrlimit=" + numberOfSearch;
      reqURL += searchLimit;
      //CALLBACK (CROSSORIGIN)
      var callBack = "&callback=?";
      reqURL += callBack;

      // FOR STROING JSON STRING THEN STRING TO OBJECT
      var JSONstring;
      var JSONobj;
      var JSONids; // PAGE IDS
      var JSONpages;


      $.getJSON(reqURL, function( json ) {
        JSONstring = (JSON.stringify(json));
        JSONobj = JSON.parse(JSONstring);
        //console.log(reqURL);
        //console.log(JSONobj);

      })
      .done(function() {
        console.log(" SUCCESS ");

        if (JSONobj.hasOwnProperty('query')) { //IF START (FIRST) --> CHECKS TO SEE IF PAGES EXIST


          JSONpages = JSONobj.query.pages;
          //console.log(JSONpages);

          JSONids = JSONobj.query.pageids;
          //console.log(JSONids);

          $("#searchLength").html("</br>Search Results: " + JSONids.length);

          for (var i = 0; i < JSONids.length; i++) { //FOR START


            for (var ii = 0; ii < JSONids.length; ii++) { // START FOR
              //console.log(JSONpages[JSONids[ii]].index);

              if (JSONpages[JSONids[ii]].index == (i+1)) { //START IFF ONE

                var makeButton = "<div id=\"" + JSONpages[JSONids[ii]].pageid + "\" class=\"container-fluid searchFound\">" + "<a target=\"_blank\" href=\"" + idButton + JSONpages[JSONids[ii]].pageid + "\">" + "</div>";
                var makeTitle = "<div class=\"row daTitles\">" + JSONpages[JSONids[ii]].title + "</div>";
                var makeWords = "<div class=\"row daWords blaBLA" + JSONpages[JSONids[ii]].pageid + "\"></div>";
                var tempText = JSONpages[JSONids[ii]].extract;


                $("#numberSearches").append(makeButton);
                $("#" + JSONids[ii]).append(makeTitle);
                $("#" + JSONids[ii]).append(makeWords);
                $(".blaBLA" + JSONids[ii]).append(tempText + "...");

                $("#" + JSONids[ii]).click(function() {
                  window.open($(this).find("a").attr("href"), $(this).find("a").attr("target"));
                  return false;
                });

                //idButton + JSONpages[JSONids[ii]].pageid;
                //console.log(tempText);
                $(".searchFound").addClass("animated bounceIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                      $(this).removeClass("animated bounceIn");
                  });
                break;

              } else {
                continue;
              }; //ENDD IFF ONE
            }; //END FOR

        }; //FOR END
      } else { //IF END (FIRST)
        console.log(" NO PAGES FOUND ");
        $("#searchLength").html("</br><i class=\"fa fa-times-circle\"></i> NO RESULTS");
      }

    })
      .fail(function() {
        console.log(" FAILED ");
      });




    }; //ELSE END


  }); //click END

}); // END OF DOCUMENT






//$(".thisBox").hide();
//$(':root').css({'--daColor': "FUNCTIONORCOLOR"})
