import {ShuffleArray} from "/utils/mathAndLogicUtils/miscUtils.js";
import {UpdateCardSlotArtist,DisplayUnselectedCardsAsChoices} from "../scenarioPhases/uiPhaseUtils.js";
import {CollapseButtonOnClick} from "/utils/uiTools/artists/trayArtistTrayMovement.js";
import {RunPvPTournament} from "/projects/GAG101/scripts/pvp/pvpScenarioTournament.js";


//export function GenericScenarioPrepWithAI(){ //only run this once when the scenario starts, not as a phase
//    
//    const gh = window.gameHandler;
//
//    const cardHandler = gh.collectionCardHandler;
//
//    const scenario = gh.scenarioHandler.GetCurrentScenario();
//    
//    gh.narrOutputArtist.ClearAllChildren();
//    
//    gh.cardChoiceTrayArtist.SetDOMDisplayTo("block");
//    
//    CollapseButtonOnClick(gh.cardChoiceTrayArtist);
//            
//    CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(scenario.playerCardSlots,gh.playerId,2);
//
//    CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(scenario.otherPlayerCardSlots,"AI",3);
//
//    RandomizePlayerIdCardChoicesForScenario();
//
//    RandomizePlayerIdCardChoicesForScenario("AI");
//
//    CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(gh.playerId,1);
//
//    CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("AI",4);
//
//    AttachOnClickCardChoiceToDOMs();
//
//    AddScenarioRunButton();
//}

export function GenericScenarioPrep(scenarioName,mode,contender0CardSlots,contender1CardSlots){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;
    
    gh.scenarioHandler.SetCurrentScenarioByName(scenarioName)

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    scenario.SetMode(mode);
    
    gh.narrOutputArtist.ClearAllChildren();
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("block");
    
    CreateNCardSlotsForContenderNumber(contender0CardSlots,0,2,1);
    
    CreateNCardSlotsForContenderNumber(contender1CardSlots,1,3,4);
    
    RandomizePlayerIdChoicesForContenderNum(gh.playerId,0);
    
    if(mode != "story") RandomizePlayerIdChoicesForContenderNum("AI",1);
    
    AttachOnClickCardChoiceToDOMsForContenderNum(0);
    
    if(mode != "story") AttachOnClickCardChoiceToDOMsForContenderNum(1);
    
    AddScenarioRunButton();
    
    if(mode == "pvp") AddScenarioRunPvPButton();
    
    
}

export function CreateNCardSlotsForContenderNumber(n,contenderNum,imgGridColumnStart,nameSlotGridColumnStart){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    for(let i = 0; i < n; i++){

        const dom = document.createElement("div");

        dom.id = "contender" + contenderNum + "CardSlot" + i;

        const artist = scenario.uiToolsHandler.AddDOMUIArtist(dom);

        artist.SetStylePropToValue("grid-column-start",imgGridColumnStart);
        artist.SetStylePropToValue("grid-row-start",(i+1).toString());

        const cardChoiceTrayArtist = window.gameHandler.uiToolsHandler.GetArtistsByAuthorizedDOMId("cardChoiceTrayGrid");

        cardChoiceTrayArtist.AppendElementWithinDOM(dom);
        
        // then create nameslot div
        
        const nameSlot = document.createElement("div");

        nameSlot.id = "contender" + contenderNum + "CardNameSlot" + i;

        nameSlot.classList.add("nameSlot");

        const subArtist = scenario.uiToolsHandler.AddDOMUIArtist(nameSlot);

        subArtist.SetStylePropToValue("grid-column-start",nameSlotGridColumnStart);

        subArtist.SetStylePropToValue("grid-row-start",dom.style.gridRowStart);

        //subArtist.SetDOMInnerTextTo(artist.associatedCard.name);

        cardChoiceTrayArtist.AppendElementWithinDOM(nameSlot);
        
        artist.nameSlotArtist = subArtist;
    }

}

//export function CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(n,id,gridColumnStart){
//    
//    const gh = window.gameHandler;
//
//    const cardHandler = gh.collectionCardHandler;
//
//    const scenario = gh.scenarioHandler.GetCurrentScenario();
//        
//    for(let i = 0; i < n; i++){
//
//        const dom = document.createElement("div");
//
//        dom.id = id + "CardSlot" + i;
//
//        const artist = scenario.uiToolsHandler.AddDOMUIArtist(dom);
//
//        artist.SetStylePropToValue("grid-column-start",gridColumnStart);
//        artist.SetStylePropToValue("grid-row-start",(i+1).toString());
//
//        const cardChoiceTrayArtist = window.gameHandler.uiToolsHandler.GetArtistsByAuthorizedDOMId("cardChoiceTrayGrid");
//        
//        if(id != gh.playerId) artist.right = true;
//        else artist.right = false;
//
//        cardChoiceTrayArtist.AppendElementWithinDOM(dom);
//    }
//
//}
    
// export function CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(playerId,gridColumnStart){
//     
//    const gh = window.gameHandler;
//
//    const cardHandler = gh.collectionCardHandler;
//
//    const scenario = gh.scenarioHandler.GetCurrentScenario();
//        
//    const cardSlotArtists = scenario.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes(playerId + "CardSlot"));
//
//    for(const artist of cardSlotArtists){
//
//        const artistDOM = artist.GetAuthorizedDOMs();
//
//        const nameSlot = document.createElement("div");
//
//        nameSlot.id = playerId + "CardNameSlot" + artistDOM.style.gridRowStart;
//
//        nameSlot.classList.add("nameSlot");
//
//        const subArtist = scenario.uiToolsHandler.AddDOMUIArtist(nameSlot);
//
//        artist.SetCustomArtistPropToValue("servantArtist",subArtist);
//
//        subArtist.SetCustomArtistPropToValue("masterArtist",artist);
//
//        subArtist.SetStylePropToValue("grid-column-start",gridColumnStart);
//
//        subArtist.SetStylePropToValue("grid-row-start",artistDOM.style.gridRowStart);
//
//        subArtist.SetDOMInnerTextTo(artist.associatedCard.name);
//
//        const cardChoiceTrayArtist = window.gameHandler.uiToolsHandler.GetArtistsByAuthorizedDOMId("cardChoiceTrayGrid");
//
//        cardChoiceTrayArtist.AppendElementWithinDOM(nameSlot);
//
//    }
//}

export function RandomizePlayerIdChoicesForContenderNum(playerId,contenderNum){
        
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const contenderCards = cardHandler.GetCards().filter(c => (c.owner == playerId && c.unlockedForPlayer == true));
    
    const shuffledAvailableCards = ShuffleArray(contenderCards);

    const slotArtistsArr = scenario.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes("contender" + contenderNum + "CardSlot"));

    for(const artist of slotArtistsArr){

        const card = shuffledAvailableCards.shift();

        UpdateCardSlotArtist(artist,card);

        card.selectedForTeam = true;
    }
}

    
//export function RandomizeContenderNumPlayerIdCardChoicesForScenario(id=window.gameHandler.playerId){ //called in begin period
//        
//    const gh = window.gameHandler;
//
//    const cardHandler = gh.collectionCardHandler;
//
//    const scenario = gh.scenarioHandler.GetCurrentScenario();
//    
//    const playerCards = cardHandler.GetCards().filter(c => (c.owner == id && c.unlockedForPlayer == true));
//    
//    const shuffledAvailableCards = ShuffleArray(playerCards);
//
//    const playerSlotArtistsArr = scenario.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes(id + "CardSlot"));
//
//    for(const artist of playerSlotArtistsArr){
//
//        const card = shuffledAvailableCards.shift();
//
//        UpdateCardSlotArtist(artist,card);
//
//        card.selectedForTeam = true;
//    }
//}

export function SetCardForContenderSlot(card,owner,contenderNum,slotNum){
    
    const gh = window.gameHandler;
        
    card.owner = owner; 

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const artist = scenario.uiToolsHandler.GetArtistsByAuthorizedDOMId("contender" + contenderNum + "CardSlot" + slotNum);

    UpdateCardSlotArtist(artist,card);
    
    card.selectedForTeam = true;
}

//export function RenameCardSlotDOMsToSubmissionUserId(){
//    
//    const gh = window.gameHandler;
//
//    const scenario = gh.scenarioHandler.GetCurrentScenario();
//    
//    const runProcessor = scenario.GetCurrentRunProcessor();
//    
//    const player0Id = runProcessor.contenders[0].playerId;
//    
//    const player1Id = runProcessor.contenders[1].playerId;
//    
//    if(player0Id != gh.playerId){
//        
//        const artists = scenario.uiToolsHandler.tools.filter(t => t.right == false); //set in CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart 
//    
//        for(const artist of artists){
//
//            artist.GetAuthorizedDOMs().id = player0Id + "CardSlot" + artist.GetAuthorizedDOMs().id.slice(-1);
//        }
//    }
//    
//    if(player1Id == "AI") return
//    
//    const artists = scenario.uiToolsHandler.tools.filter(t => t.right); //set in CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart 
//    
//    for(const artist of artists){
//        
//        artist.GetAuthorizedDOMs().id = player1Id + "CardSlot" + artist.GetAuthorizedDOMs().id.slice(-1);
//    }
//}

    
export function AttachOnClickCardChoiceToDOMsForContenderNum(num){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    for(const tool of scenario.uiToolsHandler.tools){

        const dom = tool.GetAuthorizedDOMs();

        if(dom.id.includes("contender" + num + "CardSlot")){

            dom.onclick = function(){
                
                if(gh.cardChoiceGridArtist.GetStyleProp("display") == "grid") return //otherwise you can "click through" the dimmer layer and mess up the lastClickedCardSlotArtist part and it gets ALLL fucked up

                
                DisplayUnselectedCardsAsChoices(tool.associatedCard.owner); //UpdateCardSlotArtist sets "associatedCard"


                scenario.lastClickedCardSlotArtist = tool;
                            }
        }
    }  
}
    
export function AddScenarioRunButton(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    const but = document.createElement("button");

    but.innerText = "Run scenario";

    but.onclick = function(){

        scenario.QueueProcess();
        
        scenario.ProcessNextInQueue();
        
        CollapseButtonOnClick(gh.cardChoiceTrayArtist);

    }

    gh.cardChoiceTrayArtist.AppendElementWithinDOM(but);
    

}

export function AddScenarioRunPvPButton(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    const but = document.createElement("button");

    but.innerText = "Submit Team to PvP Tournament";

    but.onclick = function(){

        RunPvPTournament();
        
        CollapseButtonOnClick(gh.cardChoiceTrayArtist);

    }

    gh.cardChoiceTrayArtist.AppendElementWithinDOM(but);
    

}