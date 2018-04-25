
$(document).ready(function(){
//  var url = 'https://www.ratemyprofessors.com/search.jsp?query=';
//  var url = 'https://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+illinois+at+urbana%5C%5C-champaign&queryoption=HEADER&query='
  var end = '&facetSearch=true'

  var url = 'https://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+illinois+at+urbana%5C-champaign&queryoption=HEADER&query='

 
  $('#rateButton').click(function(){
    var namez = $('#name').val();




    url = url + namez + end;
//console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send(null);
    //console.log(xhr.responseText);
    //document.getElementById("mobilemyProfContainer").innerHTML = xhr.responseText
    //  console.log(document);
    //var doc = xhr.responseText;
    //html = $.parseHTML(doc);
    //var x = html.getElementById('mobilemyProfContainer');
    //var Data = JSON.parse(xhr.responseText);


    //var link = $(x[0]).find('a').attr('href');
    //console.log(x[0]);
     xhr.onreadystatechange = function () {
    //
        if (xhr.readyState == 4 && (xhr.status == 200)) {

           console.log("ready")
           var doc = xhr.responseText;
           var elements = $(doc);
           var x = $(".listings",elements);
           var links = $(x[0]).find("a");
           var names = $(x[0]).find(".main");
           var link;
           var name;
           if(links.length>1)
           {
             link = $(links[0]).attr("href");
             name = names["0"].childNodes["0"].data;
           }
           else if(links.length==1)
           {
             link = $(x[0]).find("a").attr("href");
             name = names["0"].childNodes["0"].data;
           }
           else
           {
             link = "";
           }
           console.log(name);

           if(!namez)
              createNotFound();

          else if(!name)
              createNotFound();

           else if(link.length!=0)
           getDetails(link,name);

         }

         else
         {
           console.log("not ready yet")
         }
     };

    $('#name').val('');
    //url = 'https://www.ratemyprofessors.com/search.jsp?query=';
    url = 'https://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+illinois+at+urbana%5C-champaign&queryoption=HEADER&query='
  });

});



function getDetails(link,n){
  var url = 'https://www.ratemyprofessors.com'
  var urlC = url + link;
  var name = n.replace(/\s/g,'');
  var last = name.substring(0,name.indexOf(','));
  var first = name.substring(name.indexOf(',')+1);


  var xhr = new XMLHttpRequest();
  xhr.open("GET", urlC, true);
  xhr.send(null);

  xhr.onreadystatechange = function () {
 //
     if (xhr.readyState == 4 && (xhr.status == 200)) {

        console.log("ready")
        var doc = xhr.responseText;
        var elements = $(doc);
        var x = $(".rating-breakdown",elements);
        var dept = $(".result-title",elements);

        console.log(dept);
        var univ = dept["0"].childNodes[3].innerText;
      //  console.log(univ);
        var check1 = univ.substring(univ.indexOf(','));
      //  console.log(check1);
        check1 = check1.replace(/\s/g,'');


        var schoolName = $(dept).find("h2");

        if(schoolName == 'undefined')
          createNotFound();


        schoolName = schoolName["0"].textContent;
        // schoolName = schoolName.replace(/\s/g,'');
        // schoolName = schoolName.substring(schoolName.indexOf('f'),schoolName.indexOf('s')+1);
        // console.log(schoolName);






        var deptname = dept["0"].innerHTML;
        deptname = deptname.substring(0,deptname.indexOf('<'));
        deptname = deptname.replace('Professor in the ', '');
        console.log(deptname);

        //var y = $(x).find(".breakdown-container quality").html();
        //console.log(y);

        var content = x["0"].innerHTML;
        var info = $(content).find(".grade").text();
        info = info.replace(/\s/g,'');
       //info.split(' ').join
        var overall = info.substring(0,3);
        var takeAgain = info.substring(3,6);
        var difficulty = info.substring(6);
        //var overallC = $(content).find(".breakdown-container quality");


        console.log(first + " " + last + " " +  overall + " " + takeAgain + " " + difficulty);

        var check3 = 'ityO'

        // var check = new String("at University Of Illinois at Urbana-Champaign, Champaign-Urbana, IL");
        // check = check.replace(/\s/g,'');
        // console.log(check);
        // if(schoolName === check3){
        //   console.log(check);
          createTable(first, last, overall, takeAgain, difficulty, deptname, schoolName, urlC);

        // }
        //
        // else {
        //   console.log("error");
        //   createNotFound();
        // }


      }

      else
      {
         console.log("not ready yet")
     }
  };
}

function createTable(first, last, overall, takeAgain, difficulty, deptname, schoolName, link)
{

//  $("#link").attr("href",link);

  $('#other-wrapper').html(

  //+'<font size="30" face="Courier New">'
  +'<table id="table" cellspacing="0" width="100%">'
  +'<tr>'
      +'<th scope="row">Name: </th><td align="center">'
      +first + ' ' + last
      +'</td>'
  +'</tr>'
  +'<br>'
  +'<tr>'
      +'<th scope="row">Overall Rating: </th>'
      +'<td align="center">'
      +overall
      +'</td>'
  +'</tr>'
  +'<br>'
  +'<tr>'
     +'<th scope="row">Would take again (%): </th>'
     +'<td align="center">'
     +takeAgain
     +'</td>'
  +'</tr>'
  +'<br>'
  +'<tr>'
     +'<th scope="row">Difficulty: </th>'
     +'<td align="center">'
     +difficulty
     +'</td>'
  +'</tr>'
  +'<tr>'
     +'<th scope="row">Department: </th>'
     +'<td align="center">'
     +deptname
     +'</td>'
  +'</tr>'
  +'<tr>'
     +'<th scope="row">University: </th>'
     +'<td align="center">'
     +schoolName
     +'</td>'
  +'</tr>'
  +'<tr>'
     +'<th scope="row">Link for reviews: </th>'
     +'<td align="center">'
     +'<a id="link" href="" target="_blank"> Link </a>'
     +'</td>'
  +'</tr>'
  +'</table>'
  //+'</font>'

  );
  console.log(link);
//  document.getElementById("link").href = link;
  $('#link').attr('href',link );
  $("#table").attr("border","3");


}


function createNotFound(){
  var not = new String("Not Found. Enter Full Name for better search results");

   $('#other-wrapper').html(
       '<textarea >'
       +not
       +'</textarea>'
     );

//  $('#other-wrapper').append(question_html);


}
