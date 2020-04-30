var images = {google: "https://image.flaticon.com/icons/svg/281/281764.svg",
            vk: "https://image.flaticon.com/icons/svg/226/226239.svg", 
            yandex: "https://image.flaticon.com/icons/svg/246/246182.svg",
            wiki: "https://image.flaticon.com/icons/svg/48/48930.svg"};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    var scriptOptions = message.scriptOptions;
    var obj = JSON.parse(scriptOptions.jsonData);
	
    if (document.getElementById("GolikovaCustomDiv")) {
		document.getElementById("backDivGolikova").remove();
	}
	
	tableContainer = document.createElement("div");
	tableContainer.setAttribute("id", "tableContainerGolikova");

    divBack = document.createElement('a');
    divBack.setAttribute("id", "backDivGolikova");

    obj = JSON.parse(obj);
    console.log(obj);
    var sourcesArray = JSON.parse(obj["items"]);

    sourcesArray.forEach( function(element, index) {
       res = sourcesArray[index];
       console.log(res.name + "____" + res.data);
       div = appendData(res.data, images[res.name],
                        "Вот, что об этом пишут в " + res.name);
       div.setAttribute("id", res.name);
       tableContainer.appendChild(div);
    });

    document.body.appendChild(tableContainer);
    document.body.appendChild(divBack);

    setCss();

});


function appendData(array, img, title) {

    customDiv = document.createElement("div");
    customDiv.setAttribute("class", "GolikovaCustomDiv");

    list = document.createElement('ul');
    array = JSON.parse(array);
    array.forEach( function(element, index) {
            item = document.createElement('li');
            a = document.createElement('a');
            a.appendChild(document.createTextNode(element.title));
            a.href = element.link;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            item.appendChild(a);
            list.appendChild(item);
            item.classList.add('itemGolikova');
            a.classList.add('aGolikova');
    });

    divTitle = document.createElement('h2');
    divTitle.classList.add('titleGolikova');

    icon = document.createElement("img");
    icon.src = img;
    icon.setAttribute("width", "19px");
    icon.style.marginRight = '5px';
    icon.style.marginBottom = '3px';

    divTitle.appendChild(icon);

    divTitle.appendChild(document.createTextNode(title));

    customDiv.appendChild(divTitle);
    customDiv.appendChild(list);

    customDiv.classList.add('customDivGolikova');
    list.classList.add('listGolikova');

    return customDiv;
}

function setCss() {

    $("#backDivGolikova").css({
        "background-color" : "rgba(0, 0, 0, 0.5)",
        "z-index" : "99999998",
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "display": "none"
    });

    $("#backDivGolikova").click(function() {
        $('#tableContainerGolikova').remove();
        $(this).remove();
    });

    $("#tableContainerGolikova").css({
        'width' : '100%',
        'inherit' : 'overflow-wrap',
        'position': 'fixed ',
        'top': '50%',
        'left': '50%',
        'margin-right': '-50%',
        'transform': 'translate(-50%, -50%) ',
        "z-index" : "99999999",
        "margin" : "0 -5px",
        'display': 'flex',
        'flex-direction' : 'row',
        'align-items' : 'baseline',
        'justify-content' : 'center',
         'flex-wrap': 'wrap'
    });

    $(".GolikovaCustomDiv").css({
        "background-color" : '#fff',
        "margin" : "3px 3px",
        'padding' : '5px',
        "box-shadow": "0 0 10px ",
        "border-radius": "10px ",
        'width' : '30em',
        "display": "none"
    });

    $(".titleGolikova").css({
        'font-family' : 'Merriweather, serif',
        'font-size' : '15px',
        'letter-spacing' : '1px',
        'max-width' : '320px',
        'width' : '100%',
        'position' : 'relative',
        'display' : 'inline-block',
        'color' : '#465457',
        'border-bottom' : '2px solid rgba(0,0,0,.07)'
    });

    $(".listGolikova").css({
          "list-style-type": "none",
          "margin": "0",
          "padding": "0"
    });

    $(".itemGolikova").css({
          "font": "120 12px/1.5 Helvetica, Verdana, sans-serif",
          "border-bottom": "1px solid #ccc",
          'margin-bottom': '5px'
    });

    $(".aGolikova").css({
          "text-decoration" : "none",
          "color": "#000",
          "display": "block",
    });

    $(".aGolikova").mouseover(function() {
      $(this).css({
          "background": "#f6f6f6"
      })
    }).mouseout(function() {
      $(this).css({
          "background": "#fff"
      })
    })

    $("#backDivGolikova").fadeIn('slow');
    $(".GolikovaCustomDiv").fadeIn(500);
}