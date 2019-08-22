function getItemID(inItemID){
  const itemID = document.getElementById(inItemID);
  return itemID.id;
}
module.exports = getItemID;