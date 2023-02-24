import {gameHandler} from "./scripts/gameHandler.js";
import {charData} from "./scripts/data/charData.js";
import {GenerateCombinations} from "../../utils/mathAndLogicUtils/miscUtils.js";
import {DanceOfRiddlesPrep, BuildDanceOfRiddlesScenario} from "./scripts/scenario/danceOfRiddles.js";
import {UpdateCardForUser} from "./scripts/gag101Firebase/updateFirebase.js";
import {LoadLocalCollectionCards} from "./scripts/gag101Firebase/gag101Login.js";



export function onload(){
    
    window.gameHandler = new gameHandler();
        
    const gh = window.gameHandler;
    
    LoadLocalCollectionCards();
        
    BuildDanceOfRiddlesScenario();
    
    GotoHomeMenu();
}

export function GotoHomeMenu(){
    
    const gh = window.gameHandler;
    
    gh.narrOutputArtist.ClearAllChildren();
    
    console.warn("clear card choice grid with domuiartist Destroy()");
    
    _ClearCardChoiceTray();
    
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
}

function _ClearCardChoiceTray(){
    
    const tray = document.getElementById("cardChoiceTrayGrid");
    
    for(const child of tray.children){
        
        console.log(child);
        
        if(child.id.includes("CardSlot") || child.id.includes("CardNameSlot")) child.remove();
    }
}