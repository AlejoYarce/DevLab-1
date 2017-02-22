// document.addEventListener("DOMContentLoaded", () => {
//     let mensaje = document.getElementById("mensaje");
//     mensaje.classList.remove("hide");
//     mensaje.classList.add("unhide");
//     let boton = document.getElementById("boton");
//     boton.onclick = getData;
// });

// function getData() {
//     var message = document.getElementById("chuck-message");
//     randomApi("GET", "https://api.github.com/search/repositories")
//         .then((response) => {
//             let data = JSON.parse(response);
//             message.innerHTML = "";
//             message.appendChild(data.value.joke);
//         });
// }

// function randomApi ( method, url ) {
//         return new Promise((resolve) => {
//             let xhr = new XMLHttpRequest();
//             xhr.open(method, url);
//             xhr.onload = () => {
//                 resolve(xhr.response);
//             };
//             xhr.send();
//         });
//     };

document.addEventListener("DOMContentLoaded", () => {
    function $(element) {
        return document.getElementById(element);
    }

    var $btnSearch = $("btnSearch");
    var $txtRepoSarch = $("txtRepoSearch"); 
    var $lblRequired = $("lblRequiredText");
    var $results = $("listResults");
    var $lblNoResults = $("lblNoResultFound");
    var $totalResults = $("total-results");

    $btnSearch.addEventListener('click', callGitApi);
    // $txtRepoSarch.addEventListener('keyup', callGitApi);

    function getGitHubReposData (url, query) {
        $results.innerHTML = "";
        return new Promise((resolve) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url + query);
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.send();
        });
    }

    function callGitApi () {
        var text = $txtRepoSarch.value.trim();
        var url = "https://api.github.com/search/repositories?q=";

        if (text.length > 0) {
            $lblRequired.classList.add("hide");
            getGitHubReposData(url, text)
                .then((response) => {
                    var data = JSON.parse(response);
                    if (data.total_count > 0) {
                        $lblNoResults.classList.add("hide");
                        $totalResults.classList.remove("hide");
                        $totalResults.innerHTML = "Resultados encontrados: " + data.total_count;
                        for (var i = 0; i < data.items.length; i++) {
                            var node = document.createElement("LI");
                            var span = document.createElement("SPAN");
                            span.setAttribute("class", "label label-info");
                            node.setAttribute("class", "list-group-item");
                            span.appendChild(document.createTextNode(data.items[i].language == null ? "" : data.items[i].language));
                            node.appendChild(document.createTextNode(data.items[i].full_name));
                            $results.appendChild(node);
                            $results.appendChild(span);
                        }
                    } else {
                        $lblNoResults.classList.remove("hide");
                    }
            });
        } else {
            $lblRequired.classList.remove("hide");
        }
    }
});

