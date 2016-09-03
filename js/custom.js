$(document).ready(function(){
	$('#table').hide();
	$('#display').hide();
	$('#spinner').hide();
	sourceCode = "";
	tagCount = "";
	oldinputUrl = "";
	viewSource = function() {
		$('#spinner').show();
		$('#table').hide();
		$('.CodeMirror').remove();
		inputUrl = $("#input-url").val();
		if(sourceCode === "" || inputUrl != oldinputUrl) {
			oldinputUrl = inputUrl;
			$( "#display" ).text("");
			var encoded = encodeURIComponent(inputUrl);
			$.get('php/GetContent.php?url=' + encoded, function(data) {
				$('#spinner').hide();
				sourceCode = data.toString();
				if(sourceCode === "") {
					sourceCode = "Please check the URL. Page not found.";
				}
				$("#display").text(sourceCode);
				
				var mixedMode = {
					name: "htmlmixed",
					scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
						mode: null},
						{matches: /(text|application)\/(x-)?vb(a|script)/i,
							mode: "vbscript"}]
				};
				var editor = CodeMirror.fromTextArea(document.getElementById("display"), {
					mode: mixedMode,
					selectionPointer: true,
					lineNumbers: true,
					viewportMargin: Infinity
				});
				editor.getDoc().setValue(sourceCode);
				var totalLines = editor.lineCount();
				editor.autoFormatRange({line:0, ch:0}, {line:totalLines});
				editor.commentRange(false, {line:0, ch:0}, {line:totalLines+2});
				
			});
		} else {
			$('#spinner').hide();
			$("#display").text(sourceCode);
			var mixedMode = {
			name: "htmlmixed",
			scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
				mode: null},
				{matches: /(text|application)\/(x-)?vb(a|script)/i,
					mode: "vbscript"}]
			};
			var editor = CodeMirror.fromTextArea(document.getElementById("display"), {
				mode: mixedMode,
				selectionPointer: true,
				lineNumbers: true,
				viewportMargin: Infinity
			});
			editor.getDoc().setValue(sourceCode);
			var totalLines = editor.lineCount();
			editor.autoFormatRange({line:0, ch:0}, {line:totalLines});
			editor.commentRange(false, {line:0, ch:0}, {line:totalLines+2});
		}
	}

	tagSummary = function(){
		$('#spinner').show();
		$('#table').show();
		$('#display').hide();
		$('.CodeMirror').hide();
		inputUrl = $("#input-url").val();
		if(tagCount === "" || inputUrl != oldinputUrl) {
			var encoded = encodeURIComponent(inputUrl);
			$.get('php/GetAllTags.php?url=' + encoded, function(data) {
				$('#spinner').hide();
				if(data.toString() === "[]") {
					$( "#table").html("");
					alert("Unable to fetch Tag Count. Please check the URL.");
					tagCount = "";
				} else {
					var jsonData = JSON.parse(data);
					tagCount = "<html><body><table align=\"center\" class=\"table table-bordered\">";
					tagCount +=	"<tr><th style=\"text-align:center\">Tags</th><th style=\"text-align:center\">Counts</th></tr>";
					for(var key in jsonData) {
						tagCount +=  "<tr>";
						tagCount +=  "<td align=\"center\"><a id=\""+key+"\" onClick=\"highlightTags(this)\" >"+key+"</a></td><td align=\"center\">"+jsonData[key]+"</td>";
						tagCount +=  "</tr>";
					}
					tagCount += "</table></body></html>";
					$("#table").html(tagCount);
				}
			});
		} else {
			$('#spinner').hide();
			$( "#table" ).html(tagCount);	
		}
	}

	highlightTags = function(elem){
		$('#spinner').show();
		$('#table').hide();
		$('#display').hide();
		$('.CodeMirror').remove();
		$('.CodeMirror').show();
		var tag =  $(elem).text();
		inputUrl = $("#input-url").val();
		if(sourceCode === "" || inputUrl != oldinputUrl) {
			$( "#display" ).text("");
			var encoded = encodeURIComponent(inputUrl);
			$.get('php/GetContent.php?url=' + encoded, function(data) {
				$('#spinner').hide();
				sourceCode = data.toString();
				$( "#display" ).text(sourceCode);
				var mixedMode = {
					name: "htmlmixed",
					scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
					mode: null},
					{matches: /(text|application)\/(x-)?vb(a|script)/i,
						mode: "vbscript"}]
				};
				var editor = CodeMirror.fromTextArea(document.getElementById("display"), {
					mode: mixedMode,
					selectionPointer: true,
					lineNumbers: true,
					viewportMargin: Infinity
				});
				editor.getDoc().setValue(sourceCode);
				var totalLines = editor.lineCount();
				editor.autoFormatRange({line:0, ch:0}, {line:totalLines});
				tag = $(elem).text();
				$(".CodeMirror-code").find(".cm-tag").each(function() {
					if($(this).text().toUpperCase() === tag.toUpperCase()) {
						$(this).addClass("highlight");
					}
				});
			});
		} else {
			$('#spinner').hide();
			$("#display").text(sourceCode);
			var mixedMode = {
				name: "htmlmixed",
				scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
					mode: null},
					{matches: /(text|application)\/(x-)?vb(a|script)/i,
						mode: "vbscript"}]
			};
			var editor = CodeMirror.fromTextArea(document.getElementById("display"), {
				mode: mixedMode,
				selectionPointer: true,
				lineNumbers: true,
				viewportMargin: Infinity
			});
			editor.getDoc().setValue(sourceCode);
			var totalLines = editor.lineCount();
			editor.autoFormatRange({line:0, ch:0}, {line:totalLines});
			editor.commentRange(false, {line:0, ch:0}, {line:totalLines+2});
			tag = $(elem).text();
			$(".CodeMirror-code").find(".cm-tag").each(function() {
				if($(this).text().toUpperCase() === tag.toUpperCase()) {
					$(this).addClass("highlight");
				}
			});
		}
	}
});