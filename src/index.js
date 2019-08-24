function  showCodeName(inLengthID){
  // htmlで表示する箇所の要素ID、指定文字数を取得
  const ItemID = document.getElementById("NameList");
  const CodeNameLength = document.getElementById(inLengthID).value;
  
  // コードネーム生成クラスでリストと合あわせて作成
  const InSelectedList = document.getElementById("ListType").value;
  var SelectedList = FLOWER_LIST;
  switch(InSelectedList){
    case 'Flower':
      SelectedList = FLOWER_LIST;
      break;
    case 'Star':
      SelectedList = CONSTELLATION_LIST;
      break;
    default:
      SelectedList = FLOWER_LIST;
      break;
    }
  const Generator = new classGenerateCodeName(SelectedList,CodeNameLength);
  const CodeNameWithList = Generator.makeCodeName();
  
  // 表示クラスでテキストを表示
  const Display = new classDisplayText(ItemID);
  const OutputText = Display.makeTextFromChoicedListItem(CodeNameWithList);
  Display.viewUpdate(OutputText);
}

class classGenerateCodeName{
  constructor(list,length){
    this.ChoicedList = list;
    this.CodeNameLength = length;
    this.NGList = NG_LIST;
  }

  makeCodeName(){
    var endFlag = false;
    while(!endFlag){
      var ChoicedListItem = this.randomChoice();
      ChoicedListItem.CodeName = ChoicedListItem.EnName.toUpperCase().substr(0,this.CodeNameLength);
      if(this.isNotMatchNG(ChoicedListItem.CodeName)){
        endFlag = true;
        return ChoicedListItem;
      }
      else{
        console.log(ChoicedListItem.CodeName+" is NG.");
      }
    }
        return ChoicedListItem;
  }

  randomChoice(){
    const RandomNumber = Math.floor( Math.random() * this.ChoicedList.length );
    return this.ChoicedList[RandomNumber];
  }
  
  isNotMatchNG(inCodeName){
    for(var i=0,checkLength=this.NGList.length;i<checkLength;i++){
      if(inCodeName == this.NGList[i]){
        return false;
      }
    }
    return true;
  }

}


class classDisplayText{
  constructor(inItemID){
    this.ItemID = inItemID;
  }

  makeTextFromChoicedListItem(inChoicedListItem){
    const CodeNameWithText = inChoicedListItem.CodeName+"<br>"+inChoicedListItem.JpName+"("+inChoicedListItem.EnName+"):"+inChoicedListItem.Description;
    return CodeNameWithText;
  }

  displayText(inString){
    this.viewUpdate(inString);
  }

  viewAdd(inString){
    this.ItemID.innerHTML += inString;
    return this.ItemID.id;
  }

  viewUpdate(inString){
    this.ItemID.innerHTML = "";
    this.ItemID.innerHTML += inString;
    return this.ItemID.id;
  }
}