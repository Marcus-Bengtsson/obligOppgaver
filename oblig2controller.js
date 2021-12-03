generateRandomLeaderBoard();
//Checks the current modifier, calculates the cost of upgrades and returns them
function upgradePointCostCalc() {
    //stores the points added so far so they carry over between each loop
    let tempPoints = 0;
    //stores what the next cost increase will be if the loop runs again
    let nextCostIncrease = 0;
    //Check the upgrade multiplier, if it's not 0(max), it calculates the cost of the next x upgrades depending on the multiplier
    if (model.currentUpgradeMultiplier != 0) {
        for (let i = 0; i < model.currentUpgradeMultiplier; i++) {
            //every loop it takes the base upgrade cost and multiplies it with 
            //the upgrade cost multiplier raised to the power of upgrades bought + i,
            //this let's it calculate how much the next x upgrades will cost in total as if you bought them one by one.
            tempPoints += Math.round(model.baseUpgradePointCost * Math.pow(model.UpgradecostMultiplier, (i + model.upgradesBought)));
            model.availableUpgrades = model.currentUpgradeMultiplier;
        }
        if (model.player.points < tempPoints) model.upgradeButtonColor = "red";
        else model.upgradeButtonColor = "black";
        return tempPoints;
    }
    else {
        //Does the same thing as the loop above, but since it needs to stop one loop before the cost is more
        //than the player's current points, it calculates what the cost increase would be next loop,
        //and stops if it would be more than the current points.
        for (let i = 0; (tempPoints + nextCostIncrease) <= model.player.points; i++) {
            //Sets nextCostIncrease to what would be added to tempPoints next loop.
            nextCostIncrease = Math.round(model.baseUpgradePointCost * Math.pow(model.UpgradecostMultiplier, (1 + i + model.upgradesBought)));
            tempPoints += Math.round(model.baseUpgradePointCost * Math.pow(model.UpgradecostMultiplier, (i + model.upgradesBought)));
            model.availableUpgrades = i + 1;
            //if the player can't afford any upgrades this makes sure they're told they can't buy anything
            if ((tempPoints) > model.player.points && i == 0) {
                model.availableUpgrades = 0;
                tempPoints = 0;
                break;
            }
        }
        model.upgradeButtonColor = "black";
        return tempPoints;
    }
}
//Whenever the player clicks the smiley this: adds the value of pointsPerClick to their points, 
//updates to a new smiley, calculates cpm, and resets the reset button if it was pressed once
function doClick() {
    model.player.points += model.player.pointsPerClick;
    updatePoints()
    model.player.totalPoints += model.player.pointsPerClick;
    model.smileyIndex = getNextSmileyIndex(model.smileyIndex);
    model.actualUpgradePointCost = upgradePointCostCalc();
    model.resetButtonTxt = "Start på nytt";
    model.resetColor = "black";
    model.clickCount++;
    if (model.firstClick == true) {
        model.startTime = new Date().getTime();
        model.firstClick = false;
        console.log(model.startTime);
    } else {
        model.lastClickTime = new Date().getTime();
        model.clicksPerMinute = Math.floor(model.clickCount / ((model.lastClickTime - model.startTime) / 60000));
    }
    if (model.leaderBoardSubmitState == "disabled") refreshLeaderBoard();
    updateView();
    return "Points were updated, smiley was updated, cpm was updated";
}
//Changes the modifier for upgrades to either 1x, 5x, 10x, or max possible with your current points
function changeUpgradeAmount(modifier) {
    if (modifier == "1") {
        model.currentUpgradeMultiplier = 1;
        model.actualUpgradePointCost = upgradePointCostCalc();
        model.currentUpgradeMultiplierTxt = "1x";
        updateView()
        return "Upgrade amount was set to 1x";
    }
    else if (modifier == "5") {
        model.currentUpgradeMultiplier = 5;
        model.actualUpgradePointCost = upgradePointCostCalc();
        model.currentUpgradeMultiplierTxt = "5x";
        updateView()
        return "Upgrade amount was set to 5x";
    }
    else if (modifier == "10") {
        model.currentUpgradeMultiplier = 10;
        model.actualUpgradePointCost = upgradePointCostCalc();
        model.currentUpgradeMultiplierTxt = "10x";
        updateView()
        return "Upgrade amount was set to 10x";
    }
    else if (modifier == "max") {
        model.currentUpgradeMultiplier = 0;
        model.actualUpgradePointCost = upgradePointCostCalc();
        model.currentUpgradeMultiplierTxt = "Maks";
        updateView()
        return "Upgrade amount was set to max";
    } else return "error, Invalid modifier: changeUpgradeAmount()";
}
//Checks if the player has enough to buy at least one set of upgrades (depending on the current multiplier). 
//If they do, it subtracts the cost and updates the their points per click
function buyUpgrade() {
    if (model.player.points < model.actualUpgradePointCost) return false;
    model.player.points -= model.actualUpgradePointCost;
    model.player.pointsPerClick += model.availableUpgrades;
    model.upgradesBought += model.availableUpgrades;
    model.actualUpgradePointCost = upgradePointCostCalc();
    updatePoints()
    updateView();
    return true;
}
//The first time the player presses the reset button: 
//Changes it to ask if they're sure they want to reset and changes the smiley to a sad one
//The second time the user presses it: Resets the game back to the beginning
function resetGame() {
    if (model.resetColor == "red") {
        model.player.points = 0;
        model.player.totalPoints = 0;
        model.player.pointsPerClick = 1;
        model.player.playerName = "";
        model.smileyIndex = 0;
        model.actualUpgradePointCost = 10;
        model.availableUpgrades = 1;
        model.currentUpgradeMultiplier = 1;
        model.currentUpgradeMultiplierTxt = "1x";
        model.resetButtonTxt = "Start på nytt";
        model.resetColor = "black";
        model.upgradesBought = 0;
        model.firstClick = true;
        model.clickCount = 0;
        model.clicksPerMinute = 0;
        model.leaderBoardList.splice(model.leaderBoardPlayerIndex, 1);
        model.leaderBoardSubmitState = "";
        model.leaderBoardPlayerIndex = null;
        updatePoints();
        updateView();
        return "Game was reset";
    }
    else {
        model.resetButtonTxt = "Er du helt sikker på at du vil starte på nytt?";
        model.resetColor = "red";
        model.smileyIndex = 3;
        updateView();
        return "Button was updated";
    }
}
//Resets the CPM counter
function resetCpm() {
    model.firstClick = true;
    model.clickCount = 0;
    model.clicksPerMinute = 0;
    updateView();
    return "CPM was reset";
}
//If the player gains a million points or more it shows the score in millions
function updatePoints() {
    if (model.player.points >= 1000000) {
        model.player.pointsTxt = `${(model.player.points / 1000000).toFixed(2)}M`;
        return "player has at least 1 million points";
    }
    else {
        model.player.pointsTxt = model.player.points;
        return "player has under 1 million points";
    }
}
//Finds the index for the next smiley
function getNextSmileyIndex(aSmileyIndex) {
    const maxSmileyIndex = 2;
    aSmileyIndex++;
    if (aSmileyIndex > maxSmileyIndex) {
        aSmileyIndex = 0;
    }
    return aSmileyIndex;
}
//Generates a random leaderboard
function generateRandomLeaderBoard() {
    model.leaderBoardList = [];
    let randomName;
    let randomScore = 0;
    let leaderBoardLength = generateRandomNumber(4, 12);
    for (let i = 0; i < leaderBoardLength; i++) {
        randomName = model.listOfNames[generateRandomNumber(0, 14)];
        randomScore = generateRandomNumber(1000, 1000000);
        model.leaderBoardList.push([randomName, randomScore]);
    }
    leaderBoardSort();
}
//Submits the name written into the input field to the leaderboard
function leaderBoardSubmit(element) {
    let parentDiv = element.parentElement;
    let input = parentDiv.children[0];
    if (input.value == "" || input.value == null || input.value == undefined) return "Invalid input";
    console.log(input.value);
    model.player.playerName = input.value;
    model.leaderBoardList.push([input.value, model.player.totalPoints])
    model.leaderBoardSubmitState = "disabled";
    refreshLeaderBoard();
    leaderBoardSort();
    updateView();
}
//Refreshes the leaderboard by finding the player in the list, updating their score and sorting again
function refreshLeaderBoard() {
    if (model.player.playerName == undefined || model.player.playerName == "") return false;
    model.leaderBoardPlayerIndex = model.leaderBoardList.findIndex(function (player) { return player[0] == model.player.playerName });
    model.leaderBoardList[model.leaderBoardPlayerIndex][1] = model.player.totalPoints;
    leaderBoardSort();
    updateView();
    return "leaderboard was refreshed";
}
//Sorts the leaderboard in descending order
function leaderBoardSort() {
    model.leaderBoardList.sort(function (a, b) { return b[1] - a[1] });
    updateView()
    return "leaderboard was sorted";
}
//Generates a random number between the min and max numbers
function generateRandomNumber(min = 0, max = 100) {
    return Math.floor(min + Math.random() * (max - min));
}
