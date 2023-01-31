export class commandHandler
{
    constructor(){
        
        this.commands = [];
        this.currentCommandInd;        
    }
    
    PlayExercisePattern(builtPattern){
        
        this._LoadCommands(builtPattern);
        
        this.currentCommandInd = 0;
        
        this._PlayCommand();
    }
    
    _LoadCommands(builtPattern){
        
        this.commands = builtPattern;
    }
    
    _PlayCommand(){
        
        console.log(this.commands);
        
        this.commands[this.currentCommandInd].Command();
        
    }
    
    GotoNextCommand(){
        
        this.currentCommandInd++;
        
        this._PlayCommand();
        
    }
    
    
}