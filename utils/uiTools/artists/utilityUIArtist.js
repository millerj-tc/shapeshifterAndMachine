export class utilityUIArtist
{
    constructor(uiToolsHandler){
        
        this.uiToolsHandler = uiToolsHandler;
    }
    
    CapitalizeLettersAfterAppropriatePunctuation(text){
    
        return text.replace(/(?<=\. \W*|\! \W*|\? \W*|\: \W*)\w/mg,function(match){return match.toUpperCase()})

    }
    
    ReplaceNReturnWithBr(text){
    
        return text.replace(/\n/gm,"<br>");
    }
    
    GetSpanWithImageTagsReplacedWithImagesFromText(text){
        
        //split around IMAGE$$, then replace, then rejoin
        
        let textSplitArr = text.split("IMAGE$$");
        
        const span = document.createElement("span");
        
        for(const t of textSplitArr){
            
            const imgLink = t.match(/(?<=\$\$IMAGE:)(.*)/gm);
            
            const img = document.createElement("img");

            if(imgLink != null) img.src = imgLink;
            
            console.log(t);
            
            const plainText = t.replace(/\$\$IMAGE:(.*)/gm,"");
            
            console.log(plainText);
            
            span.append(plainText);
            
            span.append(img);
            
            
        }
                
        return span
    }
    
    ReplacePronouns(obj,string){
    
        let $returnString = string;
        
        // you could improve this by letting the coder type [1-they] / [2-they] for two different characters who might use different pronoun sets

        $returnString = $returnString.replaceAll("[they]",obj.GetPronouns().they);

        $returnString = $returnString.replaceAll("[them]",obj.GetPronouns().them);

        $returnString = $returnString.replaceAll("[their]",obj.GetPronouns().their);

        $returnString = $returnString.replaceAll("[theirs]",obj.GetPronouns().theirs);

        $returnString = $returnString.replaceAll("[themself]",obj.GetPronouns().themself);

        if(obj.GetPronouns().they != "they"){

            $returnString = $returnString.replaceAll("[are]","is");
        }

        return $returnString
    }
    
    ReplaceWordsBasedOnPluralSubjects(arrayOfSubjects,string){ 
        //arrayOfSubjects could be any array that represents the subjects in the sentence (objects, strings, etc.), all this cares about is counting the number to determine if there's more than 1 
        //string ex: " [[manages/manage]] to capture "
    
        let $returnString = string;

        if($returnString.match(/\[\[(.*?)\]\]/) == null) return $returnString

        if(arrayOfSubjects.length < 1) console.warn("ReplaceWordsBasedOnPluralSubjects passed 0 length array!")

        let $modifiedGroup;

        let $matches;

        const $matchCount = $returnString.match(/\[\[(.*?)\]\]/g).length;

        for(let i = 0; i < $matchCount; i ++){

             $modifiedGroup = $returnString.match(/\[\[(.*?)\]\]/)[1];

            // below used to be "if(array.length == 1 || array.hasOwnProperty("dataType"))"
            if(arrayOfSubjects.length == 1) $modifiedGroup = $modifiedGroup.split("/")[0]
            else if(arrayOfSubjects.length > 1) $modifiedGroup = $modifiedGroup.split("/")[1]

            $returnString = $returnString.replace(/\[\[(.*?)\]\]/,$modifiedGroup);
        }

        return $returnString
    }

}