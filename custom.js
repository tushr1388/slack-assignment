
$(document).ready(function(){
	sourceCode = "";
	tagCount = "";
	oldinputUrl = "";
	viewSource = function() {
		inputUrl = $("#input-url").val();
		if(sourceCode === "" || inputUrl != oldinputUrl) {
			oldinputUrl = inputUrl;
			$( "#display" ).text("");
			inputUrl = $("#input-url").val();
			var encoded = encodeURIComponent(inputUrl);
			$.get('php/GetContent.php?url=' + encoded, function(data) {
				sourceCode = data.toString();
				$("#display").text(sourceCode);
			});
		} else {
			$("#display").text(sourceCode);
		}
	}

	tagSummary = function(){
		inputUrl = $("#input-url").val();
		if(tagCount === "" || inputUrl != oldinputUrl) {
			$( "#display" ).text("");
			var encoded = encodeURIComponent(inputUrl);
			$.get('php/GetAllTags.php?url=' + encoded, function(data) {
				var jsonData = JSON.parse(data);
				tagCount = "<html><body><table align=\"center\" class=\"table table-bordered\">";
				tagCount +=	"<tr><th style=\"text-align:center\">Tags</th><th style=\"text-align:center\">Counts</th></tr>";
				for(var key in jsonData) {
					tagCount +=  "<tr>";
					tagCount +=  "<td align=\"center\"><a id=\""+key+"\" onClick=\"highlightTags(this)\" >"+key+"</a></td><td align=\"center\">"+jsonData[key]+"</td>";
					tagCount +=  "</tr>";
				}
				tagCount += "</table></body></html>";
				$("#display").html(tagCount);
			});
		}
		$( "#display" ).html(tagCount);
	}

	highlightTags = function(elem){
		var tag =  $(elem).text();
		inputUrl = $("#input-url").val();
		if(sourceCode === "" || inputUrl != oldinputUrl) {
			$( "#display" ).text("");
			var encoded = encodeURIComponent(inputUrl);
			$.get('php/GetContent.php?url=' + encoded, function(data) {
				sourceCode = "<pre class=\"prettyprint\">" +data.toString()+"</pre>";
				$( "#display" ).text(sourceCode);
				var myHilitor = new Hilitor("display");
				tag = "<" + $(elem).text() + ">";
				myHilitor.apply("\<"+tag);
			});
		} else {
			$("#display").text(sourceCode);
			var myHilitor = new Hilitor("display");
			myHilitor.apply(tag);
		}
	}
});