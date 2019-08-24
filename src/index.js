function  showCodeName(inItemID,inLengthID){
  // htmlで表示する箇所の要素ID、指定文字数を取得
  const ItemID = document.getElementById(inItemID);
  const CodeNameLength = document.getElementById(inLengthID).value;
  
  // コードネーム生成クラスでリストと合あわせて作成
  const Generator = new classGenerateCodeName(FLOWER_LIST,CodeNameLength);
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