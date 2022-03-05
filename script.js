'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//getCSV(); //最初に実行される
//initTable();

var h = document.getElementById("table");
//let h00 = h0.firstElementChild;
console.log(h.rows[h.rows.length - 1].children[0]);

h.rows[h.rows.length - 1].children[0].style.backgroundColor = "black";

const table = document.getElementById("table");
const row = table.rows;
const cells = table.rows[0].children;

/**
 * 
 * @param {number} waitMsec [msec]だけ処理を停止させる
 */
function sleep(waitMsec) {
  var startMsec = new Date();
  //waitMsecより大きくなるまでループ
  while (new Date() - startMsec < waitMsec);
}

//バグ対策（setintervalのタイミングによってはブロック数がずれる）
/**
 * 
 * @param {number} height 何段目の処理か
 * @param {number} blockNum 想定されるブロックの長さ
 */
function checkBlocks(height, blockNum) {
  const checkCells = row[row.length - 1 - height].children;
  let count = 0;
  for (const cell of checkCells) {
    if (cell.style.backgroundColor === "black") {
      console.log("cell_black" + cell);
      count++;
    }
  }
  if (count !== blockNum) {
    clearColor();
    updateColor(height, i, blockNum);
  }

}

let level0;
let level1;
let level2;
let level3;
let level4;
let level5;

/**
 * 
 * @param {number} level 何段目の処理をストップするか
 */
function stopInterval(level) {
  switch (level) {
    case 0:
      clearInterval(level0);
      break;
    case 1:
      clearInterval(level1);
      break;
    case 2:
      clearInterval(level2);
      break;
    case 3:
      clearInterval(level3);
      break;
    case 4:
      clearInterval(level4);
      break;
    case 5:
      clearInterval(level5);
      break;

  }
}

//ゲームスピードの配列格納[[レベル１],[レベル２],[鬼]]
const speedArray = [[600,500,400,300,250,200],[500,400,300,200,100,50],[200,150,100,50,500,25]]; 

/**
 * 
 * @param {number} level 何段目のintervalを開始するか 
 */
function startInterval(level) {
  switch (level) {
    case 0:
      level0 = setInterval(setColors, speedArray[chosenLevel][level]);
      break;
    case 1:
      //checkBlocks(height - 1, 3);
      level1 = setInterval(setColors, speedArray[chosenLevel][level]);
      break;
    case 2:
      //checkBlocks(height - 1, 3);
      level2 = setInterval(setColors, speedArray[chosenLevel][level]);
      break;
    case 3:
      //checkBlocks(height - 1, 3);
      level3 = setInterval(setColors, speedArray[chosenLevel][level]);
      break;
    case 4:
      //checkBlocks(height - 1, 3);
      level4 = setInterval(setColors, speedArray[chosenLevel][level]);
      break;
    case 5:
      //checkBlocks(height - 1, 3);
      level5 = setInterval(setColors, speedArray[chosenLevel][level]);
      break;
    case 6:
      const finishString = document.getElementById("finish");
      finishString.style.fontSize = "250%";
      if (finish()) {
        finishString.style.color = "red";
        finishString.textContent = "Mt.FUJI Complete!!!";
      } else {
        finishString.textContent = "Oh.., Bad Mountain..";
      }

  }
}

/**
 * 
 * @returns {boolean} 山が完成ならtrue
 */
function finish() {
  let finishIndex;
  const finishCells = row[0].children;
  for (let j = 0; j < row.length; j++) {
    for (let k = 0; k < finishCells.length; k++) {
      if (finishCells[k].style.backgroundColor === "black") {
        finishIndex = k;
      }
    }
    if (row[j].children[finishIndex].style.backgroundColor !== "black") {
      return false;
    }else{
      row[j].children[finishIndex].style.backgroundColor = "red";
    }
  }
  return true;
}

//クリックイベント内
document.getElementById("button").onclick = function () {
  console.log("click!");
  //遅延実行防止フラグ
  continueFlag = false;
  //ブロック停止
  stopInterval(height);
  sleep(1000);

  //黒ブロック確定
  clearColor();
  updateColor(height, i, length);

  //タイミング問題による不整合のチェック
  checkBlocks(height, 6 - height);
  //一段アップ
  height++;
  //遅延防止解除
  continueFlag = true;

  //次のタイマー開始
  if (height <= row.length) {
    startInterval(height);
  }

};

/**
 * 
 * @param {number} height 何段目の処理なのか 
 * @param {number} startIndex 左から何番目のセルをスタートのインデックスとするか
 * @param {number} length 黒ブロックの長さ
 */
function updateColor(height, startIndex, length) {
  if(height < row.length){

    const table_l = document.getElementById("table");
    const row_l = table_l.rows[table.rows.length - 1 - height];
    const cells_l = row_l.children;
    for (let i = 0; i < cells_l.length; i++) {
      if (startIndex <= i && i <= startIndex + length - 1) {
        cells_l[i].style.backgroundColor = "black";
      }
    }
  }
}

function clearColor() {
  for (let i = 0; i < row.length - height; i++) {
    for (let j = 0; j < cells.length; j++) {
      row[i].cells[j].style.backgroundColor = "white";
    }
  }
}

//ゲーム用変数
let i = 0;
let length = 3;
let height = 0;
let continueFlag = true;

function setColors() {
  //遅延防止フラグ確認
  if (continueFlag) {
    //開始位置ループ処理
    if (i === cells.length - length + 2) {
      i = 0;
    }
    //setTimeout用の関数変数定義
    const func = updateColor.bind(null, height, i, length);
    clearColor();
    //setTimeout(func, 100);
    updateColor(height, i, 6 - height);
    i++;
  }
}

let chosenLevel;

const chosenLevelStr = window.prompt("富士山ゲームを始めるよ！レベルを選んでね。レベル:1, 2, 鬼","1")
if(chosenLevelStr === "1"){
  chosenLevel = 0;
}else if(chosenLevelStr === "2"){
  chosenLevel = 1;
}else if(chosenLevelStr === "鬼"){
  chosenLevel = 2;
}else{
  window.alert("間違っているから鬼コースで始めるね笑")
  chosenLevel = 2;
}

let angle = 0
function rotateImg(x){
  var elemImg = document.getElementById("img");
  angle += x;
  elemImg.style.transform = "rotate(" + angle + "deg)";
}

//富士山写真回転
const rotateImgFunc = rotateImg.bind(null, (chosenLevel + 1)*10);
setInterval(rotateImgFunc,100);

//ゲーム開始
startInterval(height);

