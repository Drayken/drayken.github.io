/* Code by Drayken @KGDrayken */
/*eslint-env es6*/
/*eslint-env browser*/

const searchButton = document.getElementById('sumSearchButton');
const searchInput = document.getElementById('sumSearchName');
const searchRegion = document.getElementById('sumSearchRegion');
const resSumID = document.getElementById('resSumID');
const resAccID = document.getElementById('resAccID');
const resPUUID = document.getElementById('resPUUID');
const resSumName1 = document.getElementById('resSumName1');
const resSumName2 = document.getElementById('resSumName2');
const resSumIcon = document.getElementById('resSumIcon');
const resSumLvl = document.getElementById('resSumLvl');
const resSumRank = document.getElementById('resSumRank');
const cblStatus = document.getElementById('cblStatus');
const apiKey = "API_KEY_HERE_NOT_PUBLIC";
const urlKey = "?api_key=" + apiKey;

//fetch("https://ddragon.leagueoflegends.com/api/versions.json",{method: GET})
//.then(data => console.log(data[0]))
    

function searchfDB(name, callback){ 
    $.get('fDB/flagged.txt', function(data) {
        var contains = (data.indexOf(name) > -1);
        callback(contains);
    }, 'text');
}

searchInput.addEventListener('keypress', function (e) { // Trigger Button Click on Enter Keypress While Search Area is Focused
    if (e.key === 'Enter') {
      searchButton.click();
    }
});

searchButton.addEventListener('click', () => { // Trigger Code on Button Click
    const inputValue = searchInput.value;
    const regionValue = searchRegion.value;
    const sumAPILink = "https://" + regionValue + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + inputValue + urlKey;
        
    fetch(sumAPILink) // Fetch SummonerV4 API for General Summoner Data
    .then(function(response){ 
        if (response.status == 200) {
            console.log("Summoner Found. Status Code: " + response.status);
            return response.json();
        } else {
            alert("Summoner not found. Status Code: " + response.status);
            resSumIcon.src = "http://ddragon.leagueoflegends.com/cdn/11.13.1/img/profileicon/29.png";
            resSumName1.textContent = "";resSumName2.textContent = "";resSumID.textContent = "";resAccID.textContent = "";
            resPUUID.textContent = "";resSumLvl.textContent = "";resSumRank.textContent = "";cblStatus.textContent = "";
            return;
        }
        
    })
    .then(function(data){ // Write Summoner Data
        const {id, accountId, puuid, name, profileIconId, revisionDate, summonerLevel} = data;
        resSumID.textContent = id;
        resAccID.textContent = accountId;
        resPUUID.textContent = puuid;
        resSumName1.textContent = name;
        resSumName2.textContent = name;
        resSumIcon.src = "http://ddragon.leagueoflegends.com/cdn/11.13.1/img/profileicon/" + profileIconId + ".png";
        resSumLvl.textContent = summonerLevel;
        return fetch("https://" + regionValue + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + urlKey); // Fetch LeagueV4 API for Rank
    })
    .then(function(response){
          return response.json();
    })
    .then(function(data){ // Write Summoner Rank
        if (data == "") {
            resSumRank.textContent = "UNRANKED";
        } else {
            const {tier, rank, leaguePoints} = data[0];
            resSumRank.textContent = tier + " " + rank + " " + leaguePoints + "lp";
        }
    })
    .then(function(){ // Verify PUUID Database to Apply CBL Status
        const dbPuuid = document.getElementById('resPUUID').textContent;
        searchfDB(dbPuuid, function (matched) {
            if (matched) {
                cblStatus.innerHTML = '<span style="color:#d62e2e">FLAGGED</span>';
            } else {
                cblStatus.textContent = "CLEAN";
            }
        })
    })
});

// Get Latest DDragon CDN version https://ddragon.leagueoflegends.com/api/versions.json