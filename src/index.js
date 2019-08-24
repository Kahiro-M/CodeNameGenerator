function  showCodeName(inLengthID){
  // htmlで表示する箇所の要素ID、指定文字数を取得
  const itemID = document.getElementById("NameList");
  const codeNameLength = document.getElementById(inLengthID).value;
  
  // コードネーム生成クラスでリストと合あわせて作成
  const inSelectedList = document.getElementById("ListType").value;
  var selectedList = FLOWER_LIST;
  switch(inSelectedList){
    case 'Flower':
      selectedList = FLOWER_LIST;
      break;
    case 'Star':
      selectedList = CONSTELLATION_LIST;
      break;
    default:
      selectedList = FLOWER_LIST;
      break;
    }
  const generator = new classGenerateCodeName(selectedList,codeNameLength);
  const codeNameWithList = generator.makeCodeName();
  
  // 表示クラスでテキストを表示
  const display = new classDisplayText(itemID);
  const outputText = display.makeTextFromChoicedListItem(codeNameWithList);
  display.viewUpdate(outputText);
}

class classGenerateCodeName{
  constructor(list,length){
    this.choicedList = list;
    this.codeNameLength = length;
    this.ngList = NG_LIST;
  }

  makeCodeName(){
    var endFlag = false;
    while(!endFlag){
      var choicedListItem = this.randomChoice();
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