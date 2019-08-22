function  makeCodeName(inItemID,inLengthID){
  // htmlの要素IDを取得
  const makeCode = new classMakeCodeName(inItemID);
  // 花言葉リストを定義ファイルから取得
  const choiceFlowerList = new classChoiceList(FLOWER_LIST);
  // 花言葉リストから要素をランダムに選択
  const choicedFlower = choiceFlowerList.randomChoice();
  // 選択された花と花言葉からストリングを生成
  const codeNameInfo = new classMakeStrings(choicedFlower);
  const codeNameLength = document.getElementById(inLengthID);
  const outputText = codeNameInfo.makeCodeNameWithText(codeNameLength.value);

  if(makeCode.viewUpdate(outputText) == inItemID){
    console.log("指定のID('"+inItemID+"')の要素を更新してやったぜ!!!!");
    console.log(outputText);
  }
  else{
    console.log("指定のID('"+inItemID+"')の要素を更新に失敗したぜ...");
  }
}

class classMakeStrings{
  constructor(inChoicedListItem){
    this.itemText = inChoicedListItem;
  }

  makeCodeNameWithText(inNumber){
    const textCodeName = this.itemText.enName.toUpperCase().substr(0,inNumber);
    const CodeNameWithText = textCodeName+"<br>"+this.itemText.jpName+"("+this.itemText.enName+"):"+this.itemText.flowerLanguage;
    return CodeNameWithText;
  }
}

class classChoiceList{
  constructor(list){
    this.choiceList = FLOWER_LIST;
  }

  randomChoice(){
    const randomNumber = Math.floor( Math.random() * this.choiceList.length );
    return this.choiceList[randomNumber];
  }
}

class classMakeCodeName{
  constructor(inItemID){
    this.itemID = document.getElementById(inItemID);
    // 画面表示をリフレッシュ
    this.itemID.innerHTML = "";
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