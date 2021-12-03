const model = {
    player: {
        points: 0, //The players current points
        pointsTxt: "0", //Points as they're shown to the player
        pointsPerClick: 1, //The amount of points the player will get each time they click
        totalPoints: 0, //Total points gained throughout the run
        playerName: "", //A name the player submits that is added to the leaderboard
    },
    smileyIndex: 0, //Index to grab the correct smiley from smileyList
    smileyList: ["😀", "😁", "😤", "😢"], //List of all the smileys used in the program
    baseUpgradePointCost: 10, //The starting cost of upgrades
    UpgradecostMultiplier: 1.01, //The multiplier to increase the upgrade cost by whenever one is bought
    actualUpgradePointCost: 10, //The total cost of upgrades for the multiplier chosen by the player
    upgradesBought: 0, //Total amount of upgrades bought by the player
    availableUpgrades: 1, //How many upgrades will be bought with the current multiplier chosen by the player
    currentUpgradeMultiplier: 1, //The current multiplier for the amount of upgrades to buy at the same time (0 means max)
    currentUpgradeMultiplierTxt: "1x", //Text version of the current multiplier for amount of upgrades to buy
    resetButtonTxt: "Start på nytt", //Text on the reset button
    resetColor: "black", //Text color of the reset button
    upgradeButtonColor: "red", //Text color of the upgrade button
    firstClick: true, //If true, the next click is the first since the player started/restarted the game, or reset the cpm
    clickCount: 0, //How many times the player has clicked since they started/restarted the game, or reset the cpm
    startTime: new Date(), //Stores the time the player clicked the first time since they started/restarted the game, or reset the cpm
    lastClickTime: new Date(), //Stores the time of the most recent click
    clicksPerMinute: 0, //Stores the amount of clicks done per minute by the player
    leaderBoardSubmitState: "", //Used to disable the input field and button
    leaderBoardPlayerIndex: null, //Index of the players entry on the leaderboard
    leaderBoardList: [], //The list that contains all the info for the leaderboard
    listOfNames: [
        "Marcus", "Alexander", "Elisabeth", "Geir",
        "Anders A", "Eric", "Linn", "Anders K",
        "Lillie", "Pathom", "Reidar", "Carina",
        "Magnus", "Magomed", "Marius",
    ] //List of names to pull from when generating the random leaderboard when you load the page
}