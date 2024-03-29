import {ShuffleArray} from "../../../utils/mathAndLogicUtils/miscUtils.js";

class action
{
    constructor(actionName,durationInSecs){
        
        this.actionName = actionName;
        this.durationInSecs = durationInSecs;
    }
}

export class routineHandler
{
    constructor(){
        
        this.currentAction = null;
        this.currentActionInd = 0;
        this.voiceProfilePath;
        this.currentActionTimeElapsedSecs = 0;
        this.actions = [];
        this.playedReminderPaths = [];
        this.reminderTimer;
    }
    
    AddAction(actionName,durationInSecs){
        
        const a = new action(actionName,durationInSecs);
        
        this.actions.push(a);
        
        if(this.actions.length == 1){
            
            this.currentAction = a;
        }
    }
    
    BeginRoutine(){
                
        const routineIntro = new Audio(this.voiceProfilePath + "intro.mp3");
        
        routineIntro.play();
        
        const rh = this;
        
        setTimeout(function(){rh.BeginAction()},8000);
        
        //this.BeginAction();

    }
    
    BeginAction(){
        
        const div = document.getElementById("remainingTime");

        div.innerText = this.currentAction.durationInSecs;
        
        const nameDiv = document.getElementById("routineDisplay")
        
        nameDiv.innerText = this.currentAction.actionName;
        
        this._SetTimer();
        
        const actionPath = this.currentAction.actionName.replace(/\s/gm,"");
        
        const intro = new Audio(this.voiceProfilePath + actionPath + "/intro.mp3");
        
        intro.play();
        
        console.log(`playing ${this.currentAction.actionName}`);
        
        this._ChangeBackgroundColor();
    }
    
    _ChangeBackgroundColor(){
       
        const colorOrder = ShuffleArray([`aliceblue`,
    `darkcyan`,
    `pink`,
    `tomato`,
    `honeydew`,
    `palegoldenrod`,
    `papayawhip`,
    `cadetblue`,
    `chartreuse`]);
        
        const bg = document.getElementById("background");
        
        document.   body.style.backgroundColor = colorOrder[0];
        
    }
    
    GotoNextAction(){
        
        this.currentActionTimeElapsedSecs = 0;
        
        this.currentActionInd++;
        
        this.currentAction = this.actions[this.currentActionInd];
        
        if(this.currentAction == null) this._EndRoutine();
        
        console.log(this.currentAction.actionName);
        
        this.BeginAction();
    }
    
    PlayReminder(){
        
        const reminderOrderArr = ShuffleArray([0,1,2,3]);
        
        let reminderArr = []; 
        
        const actionPath = this.currentAction.actionName.replace(/\s/gm,"");
        
        for(const ind of reminderOrderArr){
            
            const path = this.voiceProfilePath + actionPath + "/reminder" + ind + ".mp3";
            
            reminderArr.push(path);
        }
        
        for(const ind of reminderOrderArr){
            
            const path = this.voiceProfilePath + "reminder" + ind + ".mp3";
            
            reminderArr.push(path)
        }
        
//        while(!searchComplete){
//            
//            for(const ind of reminderOrderArr){
//                
//                const actionPath = this.currentAction.actionName.replace(/\s/gm,"");
//                
//                path = this.voiceProfilePath + actionPath + "/reminder" + ind + ".mp3";
//                
//                reminder = new Audio(path);
//                
//                //console.log(reminder.preload());
//                
//                if(reminder == null || this.playedReminderPaths.includes(path)){
//                    
//                    path = "";
//                    continue
//                }
//                else {
//                    console.log(`found ${path}`);
//                    searchComplete = true
//                }
//                
//            }
//            
//            for(const ind of reminderOrderArr){
//                
//                path = this.voiceProfilePath + "/reminder" + ind + ".mp3";
//        
//                reminder = new Audio(path);
//                
//                //console.log(reminder.preload());
//                
//                if(reminder == null || this.playedReminderPaths.includes(path)){
//                    
//                    path = "";
//                    continue
//                }
//                else{
//                    console.log(`found ${path}`);
//                    searchComplete = true
//                }
//            }
//            
//            searchComplete = true;
//        }
        //console.log(path);
        
        reminderArr = ShuffleArray(reminderArr);
        
        const reminderPath = reminderArr[0];
        
        const reminderAudio = new Audio(reminderPath);
        
        reminderAudio.play();
    }
    
    _EndRoutine(){
        
        const div = document.getElementById("remainingTime");

        div.innerText = "Done!";
        
        const routineOutro = new Audio(this.voiceProfilePath + "outro.mp3");
        
        routineOutro.play();
    }
    
    _SetTimer(){
        
        setTimeout(this._TimerTick,1000);
    }
    
    _TimerTick(){
    
        const div = document.getElementById("remainingTime");
        
        const rh = window.routineHandler;
        
        rh.currentActionTimeElapsedSecs++;
        
        const remainingTimeInSecs = rh.currentAction.durationInSecs - rh.currentActionTimeElapsedSecs

        div.innerText = remainingTimeInSecs;
        
        if(remainingTimeInSecs > 0){
            
            rh._SetTimer();
        
                if(rh.currentActionTimeElapsedSecs % 13 == 0 && Math.random() > 0){

                rh.PlayReminder();
                }
        }
        else{
            
            rh.GotoNextAction();
        }
    }
    
    // update display and timer
}