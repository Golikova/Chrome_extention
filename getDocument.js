document.getElementById("getDomBtn").addEventListener('click', () => {

    var startOffset;
    var endOffset;
    var parentNode;

    chrome.tabs.executeScript( {
      code: "window.getSelection().getRangeAt(0).startOffset;"
    }, function(res) {
        startOffset = res;

    });

    chrome.tabs.executeScript( {
        code: "window.getSelection().getRangeAt(0).commonAncestorContainer.localName;"
    }, function(res) {
        console.log("HERE IS THE PARENT NODE --->" + res);
        parentNode = res;
    });

    chrome.tabs.executeScript( {
      code: "window.getSelection().toString();"
    }, function(selection) {

        console.log("HERE IS THE SELECTION --->" + selection[0]);
        endOffset = parseInt(startOffset) + selection[0].length - 1;

        console.log("Selection starts at: " + startOffset);
        console.log("Selection ends at: " + endOffset);

        var data = new Object();
        data.selection = selection[0];
        data = JSON.stringify(data);
        console.log(data);

        $.ajax({
                    type : "POST",
                    contentType : 'application/json; charset=utf-8',
                    dataType : 'json',
                    url : "http://localhost:8080/greeting",
                    data : data,

                    success : function(result) {
                        console.log("AJAX прошел успешно!");
                        console.log(result);
                        //var newBody = JSON.parse(result).code;

                    },

                    error: function(e){
                        console.log("ОШИБОЧКА вышла: ", e);
                    },

                    done : function(e) {
                        console.log("ВСЕ ОТЛИЧНО");
                    }

        });
    });

    var obj = [{"title":"Chicago Real Estate and Homes For Sale | @properties","link":"https://www.atproperties.com/"},
                {"title":"Properties | Definition of Properties at Dictionary.com","link":"https://www.dictionary.com/browse/properties"},
                {"title":"Properties (Stanford Encyclopedia of Philosophy)","link":"https://plato.stanford.edu/entries/properties/"},
                {"title":"Properties (Java Platform SE 7 )","link":"https://docs.oracle.com/javase/7/docs/api/java/util/Properties.html"},
                {"title":".properties - Wikipedia","link":"https://en.wikipedia.org/wiki/.properties"},
                {"title":"Properties - Manual - PHP","link":"https://www.php.net/manual/en/language.oop5.properties.php"},
                {"title":"Full property table","link":"https://www.w3.org/TR/CSS2/propidx.html"},
                {"title":"LoopNet: Commercial Real Estate For Sale and Lease","link":"https://www.loopnet.com/"},
                {"title":"Descriptor HowTo Guide — Python 3.8.2rc2 documentation","link":"https://docs.python.org/3/howto/descriptor.html"},
                {"title":"Water Properties Information by Topic","link":"https://www.usgs.gov/special-topic/water-science-school/science/water-properties-information-topic"}];

    var myJSON = JSON.stringify(obj);

    chrome.tabs.query({active: true}, function(tabs){
      chrome.tabs.executeScript(tabs[0].id,{file: "jquery.js"}, function(){
            chrome.tabs.executeScript({file: "tabScript.js"}, function(){
                chrome.tabs.sendMessage(tabs[0].id, {scriptOptions: {jsonData : myJSON}}, function(){
                    //all injected
                    });
                });
        });
    });
    
});

