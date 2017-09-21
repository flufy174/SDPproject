window.onload = function () {
	document.getElementById("addJournalButton").onclick = function () {
		var overlay = document.getElementById("overlay");
		var popup = document.getElementById("popup")
		overlay.style.display = "block";
		popup.style.display = "block";
	};

	document.getElementById("cancelButton").onclick = function () {
		var overlay = document.getElementById("overlay");
		var popup = document.getElementById("popup");
		overlay.style.display = "none";
		popup.style.display = "none";
	};

	document.getElementById("createButton").onclick = function () {
		var overlay = document.getElementById("overlay");
		var popup = document.getElementById("popup");
		overlay.style.display = "none";
		popup.style.display = "none";
		var journalName = document.getElementById("journalName").value;
		if (journalName == "") {
			alert('Please enter a name for the journal');
		}
		else {
			alert('Journal created with name: ' + journalName);
		}
	};
}