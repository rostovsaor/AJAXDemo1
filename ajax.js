var xmlHttp = createXmlHttpRequestObject();

/**
 * Ajuda a criar o objecto xmlHttp correcto dependendo do browser,
 * ActiveXObject("Microsoft.XMLHTTP") para Internet Explorer/Edge ou XMLHttpRequest para os restantes
 */
function createXmlHttpRequestObject() {
  var xmlHttp;

  if (window.ActiveXObject) {
    try {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      xmlHttp = false;
    }
  } else {
    try {
      xmlHttp = new XMLHttpRequest();
    } catch (e) {
      xmlHttp = false;
    }
  }

  if (!xmlHttp) alert("Não criou o objecto XMLHttpRequest");
  else return xmlHttp;
}

// Listner para o botao da pagina
var btn = document.getElementById("btn");
btn.addEventListener("click", process);
showTable();

/**
 * Mostra a tabela inicial
 */
function showTable() {
  xmlHttp.onload = function() {
    var ourData = JSON.parse(xmlHttp.responseText);
    loadTable(ourData);
  };
  xmlHttp.open("GET", "ajax1tabela.php", true);
  xmlHttp.send();
}

/**
 * Carrega os dados nos campos, envia para o server e volta a criar a tabela
 */
function process() {
  if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
    nome = encodeURIComponent(document.getElementById("nome").value);
    idade = encodeURIComponent(document.getElementById("idade").value);
    mail = encodeURIComponent(document.getElementById("mail").value);
    xmlHttp.open(
      "GET",
      "ajax2adicionar.php?nome=" + nome + "&idade=" + idade + "&mail=" + mail,
      true
    );
    xmlHttp.onload = function() {
      var ourData = JSON.parse(xmlHttp.responseText);
      loadTable(ourData);
    };
    xmlHttp.send();
  } else {
    setTimeout("process()", 1000);
  }
}

/**
 * Create table with JSON data
 * @param {} data
 */
function loadTable(data) {
  
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200) {
      var col = [];

      // Extract keys for table headers.
      for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }

      // Create the table
      var table = document.createElement("table");

      // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
      var tr = table.insertRow(-1); // TABLE ROW.

      for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
      }

      // Add JSON data to table as rows
      for (var i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[i][col[j]];
        }
      }

      // Add created table with data from JSON to an html container
      var divContainer = document.getElementById("tabela");
      divContainer.innerHTML = "";
      divContainer.appendChild(table);
    } else {
      alert("Ocorreu algum erro! - loadTable()");
    }
  }
}
