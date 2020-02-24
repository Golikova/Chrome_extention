chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    var scriptOptions = message.scriptOptions;
    var obj = JSON.parse(scriptOptions.jsonData);
    obj.forEach(function(node, index){
	  console.log(node.title);
	  console.log(node.link); 
	});

	if (document.getElementById("GolikovaCustomDiv")) {
		document.getElementById("backDivGolikova").remove();
	}

	customDiv = document.createElement("div");
    customDiv.setAttribute("id", "GolikovaCustomDiv");

    divBack = document.createElement('a');
    divBack.setAttribute("id", "backDivGolikova");

    list = document.createElement('ul');

    obj.forEach( function(element, index) {
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
    divTitle.appendChild(document.createTextNode("Вот, что об этом пишут в Google:"));

    customDiv.appendChild(divTitle);
    customDiv.appendChild(list);

    customDiv.classList.add('customDivGolikova');
    list.classList.add('listGolikova');

    divBack.appendChild(customDiv);
    document.body.appendChild(divBack);

    $("#backDivGolikova").css({
    	"background-color" : "rgba(0, 0, 0, 0.4)",
    	"z-index" : "99998",
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%"
    });

    $("#backDivGolikova").click(function() {
		$(this).remove();
    });

    $("#GolikovaCustomDiv").css({
    	"background-color" : '#fff',
    	"left" : (window.innerWidth/2 - 200) + 'px',
    	"top" : (window.innerHeight/2 - $("#GolikovaCustomDiv").height()/2 -100) + 'px',
    	"position" : "fixed",
    	"z-index" : "99999",
    	"box-shadow": "0 0 10px",
		"border-radius": "10px",
		"padding" : "1%"
    });

    $(".titleGolikova").css({
		  "font": "200 20px/1.5 Helvetica, Verdana, sans-serif",
		  "margin": "0",
		  "padding": "0"
    });

    $(".listGolikova").css({
    	  "list-style-type": "none",
		  "margin": "0",
		  "padding": "0"
    });

    $(".itemGolikova").css({
    	  "font": "170 17px/1.5 Helvetica, Verdana, sans-serif",
  		  "border-bottom": "1px solid #ccc"
    });

    $(".aGolikova").css({
    	  "text-decoration" : "none",
		  "color": "#000",
		  "-webkit-transition": "font-size 0.3s ease, background-color 0.3s ease",
		  "-moz-transition": "font-size 0.3s ease, background-color 0.3s ease",
		  "-o-transition": "font-size 0.3s ease, background-color 0.3s ease",
		  "-ms-transition": "font-size 0.3s ease, background-color 0.3s ease",
		  "transition": "font-size 0.3s ease, background-color 0.3s ease",
		  "display": "block",
		  "width": "300px"
	});

	$(".aGolikova").mouseover(function() {
	  $(this).css({
	  	  "font-size": "20px",
  		  "background": "#f6f6f6"
	  })
	}).mouseout(function() {
	  $(this).css({
	  	  "font-size": "17px",
  		  "background": "#fff"
	  })
	})

	delete divBack;
    delete customDiv;
    delete list;
    delete item;

    
});