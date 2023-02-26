class contender
{
    constructor(cardsAsJSON,playerId,playerUsername,timeStamp){
        
        this.cardsAsJSON = cardsAsJSON;
        this.getCardsFromCollectionCardHandler = false;
        this.playerUsername = playerUsername;
        this.playerId = playerId;
        this.timeStamp = timeStamp;
        this.wins = 0;
        this.ties = 0;
        this.defeats = 0;
        this.matches = 0;
        this.defeatedByPlayer = false;
        this.defeatedPlayer = false;
        this.tiedPlayer = false;
    //} how to automate testing using tournament Handler
}

export class tournamentHandler{ //tournament is ended in scenarioMaintenance.js
    
    constructor(){
        
        this.contenders = [];
        
    }
    
    AddContender(cardsAsJSON,playerId,playerUsername,timeStamp){
        
        const c = new contender(cardsAsJSON,playerId,playerUsername,timeStamp);
        
        if(cardsAsJSON == false) c.getCardsFromCollectionCardHandler = true; //if you don't pass this JSON cards, it will get the cards from collection Card Handler by userid instead
        
        this.contenders.push(c);
        
        return c
        
    }
    
    EmptyContenders(){
        
        this.contenders = [];
    }
    
    GetMatchByOtherPlayerId(id){
        
        for(const match of this.matches){
            
            if(match.otherPlayerId == id) return match
        }
    }
    
    GetContenderByUserId(id){
        
        for(const contender of this.contenders){
            
            if(contender.playerId == id) return contender
        }
    }
    
    SortContendersByWinscore(){
        
        for(const contender of this.contenders){
            
            contender.ws =  ((2*contender.wins) + contender.ties - (2*contender.defeats))/contender.matches;
            
        }
        
        this.contenders = this.contenders.sort(SortWinscoreThenDate); //lowest winscores first
    }
    
    RunAllLegalPermutations(){
        
        const gh = window.gameHandler;
    
        const cardHandler = gh.collectionCardHandler;

        const scenario =  gh.scenarioHandler.GetCurrentScenario();
        
        const mode = scenario.GetMode();

        for(const submission of leaderboardArrAsJSON){

           const newContender =  gh.tournamentHandler.AddContender(submission.teamAsJSONArr,submission.userId,submission.username,submission.submissionTimestamp);

        }

        const matchesArr = GenerateCombinations(gh.tournamentHandler.contenders,2)

        for(const match of matchesArr){

            scenario.QueueProcess(match);
        }

        const playerContender = gh.tournamentHandler.AddContender(false,gh.playerId,gh.playerUsername,Date.now());

        for(const serverContender of gh.tournamentHandler.contenders){

            if(serverContender.playerId == playerContender.playerId) continue

            scenario.QueueProcess([playerContender,serverContender]);
        }

        gh.cardChoiceTrayArtist.SetDOMDisplayTo("none");

        scenario.queuedProcessors.reverse(); // reverse so it runs the actual player scenarios first. Otherwise server matches will replace the player's choices in the card choice tray.

        console.log(scenario.queuedProcessors);

        scenario.ProcessNextInQueue();
    }
}

export function SortWinscoreThenDate(ob1,ob2) {
    if (ob1.ws > ob2.ws) {
        return 1;
    } else if (ob1.ws < ob2.ws) { 
        return -1;
    }

    // Else go to the 2nd item
    if (ob1.timestamp < ob2.timestamp) { 
        return 1;
    } else if (ob1.timestamp > ob2.timestamp) {
        return -1
    } else { // nothing to split them
        return 0;
    }
}