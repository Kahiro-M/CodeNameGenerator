function  showCodeName(inLengthID,inNameList,inRemoveVowels,inDisplayCodeName){
  // htmlで表示する箇所の要素ID、指定文字数を取得
  const codeNameLength = document.getElementById(inLengthID).value;
  const displayItemID = document.getElementById(inDisplayCodeName);
  const removeVowels = document.getElementById(inRemoveVowels).checked;
  
  // コードネーム生成クラスでリストと合あわせて作成
  const selectedList = selectList(inNameList);
  const generator = new classGenerateCodeName(selectedList,codeNameLength,removeVowels);
  const codeNameWithList = generator.makeCodeName();
  
  // 表示クラスでテキストを表示
  const display = new classDisplayText(displayItemID);
  const outputText = display.makeTextFromChoicedListItem(codeNameWithList);
  display.viewUpdate(outputText);
}


function selectList(inSelectList){
  const inSelectedList = document.getElementById(inSelectList).value;
  var retSelectedList;
  switch(inSelectedList){
    case 'Flower':
      retSelectedList = FLOWER_LIST;
      break;
    case 'Star':
      retSelectedList = CONSTELLATION_LIST;
      break;
    default:
      retSelectedList = FLOWER_LIST;
      break;
  }
  return retSelectedList;
}

class classGenerateCodeName{
  constructor(list,length,inRemoveVowels){
    this.choicedList = list;
    this.codeNameLength = length;
    this.ngList = NG_LIST;
    this.removeVowels = inRemoveVowels;
  }

  makeCodeName(){
    var endFlag = false;
    var tmpCodeName;
    while(!endFlag){
      var choicedListItem = this.randomChoice();
      if(this.choicedList==CONSTELLATION_LIST){
        if(this.removeVowels){
          tmpCodeName = choicedListItem.enName.toUpperCase();
          choicedListItem.codeName = tmpCodeName.replace(/[a i u e o A I U E O]/g,'').substr(0,this.codeNameLength);;
        }
         else{
          switch(this.codeNameLength){
            case '3':
              choicedListItem.codeName = choicedListItem.threeCodeName.toUpperCase();
              break;
            case '4':
              choicedListItem.codeName = choicedListItem.fourCodeName.toUpperCase();
              break;
            default:
              choicedListItem.codeName = choicedListItem.enName.toUpperCase().substr(0,this.codeNameLength);
              break;
          }  
        }

      }
      else{
        if(this.removeVowels){
          tmpCodeName = choicedListItem.enName.toUpperCase();
          choicedListItem.codeName = tmpCodeName.replace(/[a i u e o A I U E O]/g,'').substr(0,this.codeNameLength);;
        }
        else{
          choicedListItem.codeName = choicedListItem.enName.toUpperCase().substr(0,this.codeNameLength);
        }
      }

      if(this.isNotMatchNG(choicedListItem.codeName)){
        endFlag = true;
        return choicedListItem;
      }
      else{
        console.log(choicedListItem.codeName+" is NG.");
      }
    }
    return choicedListItem;
  }

  deleteVowels(){

  }

  randomChoice(){
    const randomNumber = Math.floor( Math.random() * this.choicedList.length );
    return this.choicedList[randomNumber];
  }
  
  isNotMatchNG(inCodeName){
    for(var i=0,checkLength=this.ngList.length;i<checkLength;i++){
      if(inCodeName == this.ngList[i]){
        return false;
      }
    }
    return true;
  }

}


class classDisplayText{
  constructor(inItemID){
    this.itemID = inItemID;
  }

  makeTextFromChoicedListItem(inChoicedListItem){
    const codeNameWithText = inChoicedListItem.codeName+"<br>"+inChoicedListItem.jpName+"("+inChoicedListItem.enName+"):"+inChoicedListItem.description;
    return codeNameWithText;
  }

  displayText(inString){
    this.viewUpdate(inString);
  }

  viewAdd(inString){
    this.itemID.innerHTML += inString;
    return this.itemID.id;
  }

  viewUpdate(inString){
    this.itemID.innerHTML = "";
    this.itemID.innerHTML += inString;
    return this.itemID.id;
  }
}