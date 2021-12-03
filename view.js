updateView();
//Updates what the user sees on the website whenever called
function updateView() {
    let html = "";
    html += `
        <div class="pointsPerClickDiv">Poeng per klikk: ${model.upgradesBought + 1} <br/> CPM: ${model.clicksPerMinute}</div>
        <div class="PointsDiv" onclick="doClick()">${model.smileyList[model.smileyIndex]}<br>${model.player.pointsTxt}</div>
        <button class="upgradeButton" onclick="buyUpgrade()" style="color: ${model.upgradeButtonColor};">
            Kjøp oppgraderinger: ${model.availableUpgrades}, ${model.actualUpgradePointCost} poeng (${model.currentUpgradeMultiplierTxt})
        </button>
        <div class="upgradeMultipliers">
            <button onclick="changeUpgradeAmount('1')">1x</button>
            <button onclick="changeUpgradeAmount('5')">5x</button>
            <button onclick="changeUpgradeAmount('10')">10x</button>
            <button onclick="changeUpgradeAmount('max')">Maks</button>
        </div>
        <div class="resetButtons">
            <button onclick="resetGame()" style="color: ${model.resetColor}">${model.resetButtonTxt}</button>
            <button onclick="resetCpm()">Reset CPM</button>
        </div>
        <div class="leaderBoardInput">
            <input type="text" ${model.leaderBoardSubmitState}>
            <button onclick="leaderBoardSubmit(this)" ${model.leaderBoardSubmitState}>Submit</button>
            <br>  
            <text>Score <br/> ${model.player.totalPoints}</text>
        </div>
        <table class="leaderBoardTable">
                <tr>
                    <th>Brukernavn</th>
                    <th>Poeng</th>
                </tr>
            `;
    for (let i = 0; i < model.leaderBoardList.length; i++) {
        html += `
                <tr>
                    <td>${model.leaderBoardList[i][0]}</td>
                    <td>${model.leaderBoardList[i][1]}</td>
                </tr>
                `;
    }
    html += `</table>`;
    document.getElementById('app').innerHTML = html;
}