import {gameHandler} from "./scripts/gameHandler.js";
import {charData, GetCharDataByName} from "./scripts/data/charData.js";
import {GenerateCombinations} from "../../utils/mathAndLogicUtils/miscUtils.js";
import {DanceOfRiddlesPrep, BuildDanceOfRiddlesScenario} from "./scripts/scenario/scenarios/danceOfRiddles.js";
import {WatchOfSilencePrep, BuildWatchOfSilenceScenario} from "./scripts/scenario/scenarios/watchOfSilence.js";
import {UpdateCardForUser} from "./scripts/gag101Firebase/updateFirebase.js";
import {LoadLocalCollectionCards,UnlockLocalUnlockedScenarios} from "./scripts/gag101Firebase/gag101Login.js";



export function onload(){
    
    window.gameHandler = new gameHandler();
        
    const gh = window.gameHandler;
    
    LoadLocalCollectionCards();
    
    UnlockLocalUnlockedScenarios();
        
    BuildDanceOfRiddlesScenario();
    
    BuildWatchOfSilenceScenario();
    
    GotoHomeMenu();
    
    const cainPool = [GetCharDataByName("Doran"),GetCharDataByName("Pigimus"),GetCharDataByName("Sinch"),GetCharDataByName("Jane"),GetCharDataByName("Robspierre"),GetCharDataByName("Eevin"),GetCharDataByName("Apple Helm")];
    
    gh.tournamentHandler.RunAllLegalPermutations("Dance of Riddles","pvp",cainPool,cainPool);
}

export function GotoHomeMenu(){
    
    const gh = window.gameHandler;
    
    gh.narrOutputArtist.ClearAllChildren();
    
    gh.loginWrapperArtist.SetDOMDisplayTo("none");
    
    console.warn("Might want to add an id of some kind to OutputDivWithNounImages... so that it can be manipulated later like the highlight function of Clone Crisis.");
    
    //_ClearPreviousRunDOMs();
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("none");
    
    const dorButton = document.createElement("button");
    
    dorButton.innerText = "Dance of Riddles (Story Mode)";
    
    dorButton.onclick = function(){DanceOfRiddlesPrep("story")};
    
    gh.narrOutputArtist.AppendElementWithinDOM(dorButton);
    
    gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
       
    const dorPButton = document.createElement("button");

    dorPButton.innerText = "Dance of Riddles (Competitive Mode)";

    dorPButton.onclick = function(){DanceOfRiddlesPrep("pvp")};

    gh.narrOutputArtist.AppendElementWithinDOM(dorPButton);
    
     gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    const wosButton = document.createElement("button");
    
    wosButton.innerText = "Watch of Silence (Story Mode)";
    
    wosButton.onclick = function(){WatchOfSilencePrep("story")};
    
    gh.narrOutputArtist.AppendElementWithinDOM(wosButton);
    
    gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
       
    const wosPButton = document.createElement("button");

    wosPButton.innerText = "Watch of Silence (Competitive Mode)";

    wosPButton.onclick = function(){WatchOfSilencePrep("pvp")};

    gh.narrOutputArtist.AppendElementWithinDOM(wosPButton);
}

