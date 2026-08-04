/** SpAbz script result.js
*   function called by button submit of page result.html
*   get values of localform alter, disziplin, geschlecht, leistung
*   set result as value of Personal Test and Table-Data from DSA

*   version 01.08.2026
*   Autor H. Conrad
*/
//    const myForm = document.localForm;

document.addEventListener('submit', function () {
    const myForm = document.localForm;
    const ftyp = myForm.typ;
    const falter = myForm.alter;
    const fsex = myForm.sex;
    const fleistung = myForm.leistung;
    const diszip = document.querySelector("#diszip");

    diszipIndex = ftyp.selectedIndex; // 0-9
    sexIndex = fsex.selectedIndex;
    diszipText = ftyp.value;
    alter = falter.value;
    sex = fsex.value;
    resetResult();
    leistung = Number(fleistung.value.replace( /,/,"." ));
    alterIndex = getIndexAlter(alter); // Index der altersstufe
    if (alterIndex >= 0) {
      if (diszipIndex == 3) { // Koordinationsleiter
         diszipText = "Leiter " + getDiszipTextExt(alterIndex);
      }
      diszip.textContent = diszipText;
//      window.alert("AI "+alterIndex);
      getResult(diszipIndex, alterIndex, sexIndex, leistung);
      event.preventDefault();
    }
});
/* Text Disziplin Koordinationsleiter für Altersstufe */
function getDiszipTextExt(alterIndex) {
    const KoordLeiter = ['Doppelschritt', 'Doppelschritt seitwÃ¤rts', 'Ickey Shuffle',
         '3 plus 1', '2-2 seitwÃ¤rts', 'Dreifachschritt', 'Zwei-eins Doppel'];
    const dis = [0,1,2,3,4,5,6,6,5,4,3,3,2,2,1,1,0,0,0,0,0];
    return  KoordLeiter[dis[alterIndex]];
}
/* Index Altersstufe */
function getIndexAlter(alter) {
    const aindex = [6,10,12,14,16,18,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90];
    if (alter < 6) return k = -1
    k = 0;
    while (alter >= aindex[k]) {
         k = k+1;
    }
    if (k > 0) {
      k = k-1;
    }
    return k;
}

function getResult(typidx, alteridx, sexidx, leistung) {
/* typidx: Index Tabelle, alteridx: Index Alter, sex: Index Geschlecht, leistung: wert */
/* Tabellendaten nach DSA, 4 Tabellen, je 21 Zeilen mit 6 spalten */
/* weiblich+mänlich: bronze, silber, gold */
    const ltabs = [
         [[5,9,14,6,10,14],[12,17,23,15,20,25],[19,25,31,23,29,36], // Tabelle 1
         [24,31,38,29,37,44],[28,36,44,34,42,51],[31,39,47,37,46,54],
         [32,40,48,39,47,56],[31,39,47,38,46,55],[30,38,46,37,45,54],
         [29,37,45,36,44,53],[28,36,44,35,43,52],[27,34,42,34,41,49],
         [25,32,40,30,38,46],[22,30,37,27,35,43],[19,27,34,23,31,39],
         [16,24,31,19,27,35],[13,20,26,15,22,29],[10,16,22,12,18,24],
         [7,12,17,9,14,19],[4,8,13,5,9,13],[3,6,9,4,8,12]],
         [[3,5,7,4,7,11],[5,7,9,7,10,14],[6,8,11,9,13,16], // Tabelle 2
         [7,9,12,11,14,18],[7,10,13,12,16,19],[8,11,14,13,17,20],
         [9,12,15,15,19,22],[8,11,14,14,18,21],[7,10,13,13,17,20],
         [7,10,13,13,17,20],[6,9,12,12,16,19],[6,8,11,11,15,19],
         [5,8,10,11,14,18],[4,7,10,10,13,17],[3,6,9,9,12,15]
         [3,6,8,7,11,14],[3,5,8,6,10,13],[2,5,7,5,8,12],
         [2,4,6,4,7,10],[2,4,6,3,5,8],[2,3,5,2,4,7]],
         [[21.1,19.7,18.2,20.6,19.1,17.6],[18.7,17.3,15.8,18.3,16.8,15.3],[16.9,15.4,13.9,16.5,15.0,13.5], // Tabelle 3
         [15.5,14.1,12.6,15.1,13.6,12.1],[14.7,13.2,11.7,14.1,12.6,11.2],[14.2,12.7,11.2,13.5,12.0,10.6],
         [13.8,12.4,10.8,13.0,11.5,10.0],[14.4,12.9,11.3,13.3,11.8,10.3],[14.9,13.4,11.9,13.6,12.1,10.6],
         [15.6,14.1,12.7,14.1,12.6,11.1],[16.5,15.0,13.5,14.8,13.3,11.8],[17.5,16.0,14.6,15.6,14.1,12.7],
         [18.6,17.1,15.7,16.6,15.1,13.6],[19.7,18.2,16.8,17.7,16.2,14.7],[20.8,19.3,17.8,18.8,17.3,15.8],
         [21.8,20.3,18.9,19.9,18.4,16.9],[22.7,21.2,19.8,21.0,19.5,18.0],[23.4,21.9,20.5,22.0,20.5,19.0],
         [23.9,22.4,21.0,23.0,21.5,20.0],[24.1,22.7,21.2,23.8,22.3,20.8],[24.3,22.9,21.4,24.0,22.5,21.0]],
         [[31.9,28.5,25.1,31.9,28.5,25.1],[26.1,22.7,19.3,26.1,22.7,19.3],[29.2,25.8,22.4,29.2,25.8,22.4], // Tabelle 4
         [33.5,30.1,26.7,33.5,30.1,26.7],[33.2,29.8,26.4,33.2,29.8,26.4],[28.5,25.1,21.7,28.5,25.1,21.7],
         [41.4,38.0,34.6,41.4,38.0,34.6],[41.4,38.0,34.6,41.4,38.0,34.6],[28.5,25.1,21.7,28.5,25.1,21.7],
         [34.4,31.0,27.6,34.4,31.0,27.6],[34.8,31.4,28.0,34.8,31.4,28.0],[37.1,33.7,30.3,37.1,33.7,30.3],
         [30.2,26.8,23.4,30.2,26.8,23.4],[31.2,27.8,24.4,31.2,27.8,24.4],[26.1,22.7,19.3,26.1,22.7,19.3],
         [27.3,23.9,20.5,27.3,23.9,20.5],[32.2,28.8,25.4,32.2,28.8,25.4],[33.7,30.3,26.9,33.7,30.3,26.9],
         [36.0,32.6,29.2,36.0,32.6,29.2],[38.8,35.4,32.0,38.8,35.4,32.0],
         [40.5,37.1,33.7,40.5,37.1,33.7]]
    ];
    const soll = Array(3);
    const sollOut = Array(3);

    let ofs = 0;
    let result;

    sollOut[0] = document.querySelector("#sollbz");
    sollOut[1] = document.querySelector("#sollsb");
    sollOut[2] = document.querySelector("#sollgd");

    if (sexidx == 1) { ofs = 3; }

//    if (typidx < 4) { // Tabelle 0-3

       for (let i = 0; i < 3; i++) {
           result = ltabs[typidx][alteridx][i+ofs];
           soll [i] = result.toString();
           if ((typidx > 1) && (soll[i].indexOf('.')<0)) soll[i] = soll[i]+".0";
           sollOut[i].textContent = soll[i];
       }
       if (leistung > 0) {
           result = ergebnis(leistung, soll, typidx);
           leistung = leistung.toString();
           if ( (typidx >= 2) && (leistung.indexOf('.') <0 ) ) {
             leistung = leistung+".0";
           }
           document.querySelector("#leistung").textContent = leistung;
           setStyle(result);
       }
}
function resetResult() {

}

function setStyle(result) {
    const ug = document.getElementById("ug");
    const bz = document.getElementById("bz");
    const sb = document.getElementById("sb");
    const gd = document.getElementById("gd");

    ug.style.borderstyle="none";
    bz.style.borderstyle="none";
    sb.style.borderstyle="none";
    gd.style.borderstyle="none";

    ug.style.backgroundColor="#FFCC00";
    bz.style.backgroundColor="#FFCC00";
    sb.style.backgroundColor="#FFCC00";
    gd.style.backgroundColor="#FFCC00";

    switch (result) {
    case 0:
        ug.style.borderStyle = "solid";
        ug.style.backgroundColor = "#FF0000";
        break;
    case 1:
        bz.style.borderStyle = "solid";
        bz.style.backgroundColor = "#FFFF00";
        break;
    case 2:
        sb.style.borderStyle = "solid";
        sb.style.backgroundColor = "#FFFF00";
        break;
    case 3:
        gd.style.borderStyle = "solid";
        gd.style.backgroundColor = "#FFFF00";
        break;
    }
}

function ergebnis(ist, soll, tidx) {
    let res = 0;
    let i;
    if ( tidx < 2 ) {   // Anzahl
       for (i =0; i<3; i++) {
          if (ist >= soll[i]) { res++ }
       }
    } else {
      for (i =0; i<3; i++) {  // Zeit
         if (ist <= soll[i]) { res++ }
      }
    }
    return res;
}


function goToHome() {
    window.location.href = "index.html";
}