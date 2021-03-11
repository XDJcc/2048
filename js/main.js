//游戏数据
var board = new Array()
var score = 0
$('#newgamebtn').click(function () {
  newgame()
})

window.onload = function () {
  newgame()
}

function newgame() {
  // 初始成绩：
  updateScore(0)
  //初始化棋盘格
  init()
  //在随机两个格子生成数字
  generateOneNumber()
  generateOneNumber()
}
//初始化棋盘格函数
function init() {
  //生成棋盘
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var gridcell = $("#grid-cell-" + i + "-" + j)
      // 定义每一个小方块的坐标值
      gridcell.css('top', getPosTop(i, j))
      gridcell.css('left', getPosLeft(i, j))
    }
  }
  // 初始化游戏数据  生成 board 数组对游戏数据进行存储 /现为空数组
  for (var i = 0; i < 4; i++) {
    board[i] = []
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0
    }
  }
  updateBoardView()
}

//定义 更新游戏界面函数（根据board里保存的数据）
function updateBoardView() {
  $('.number-cell').remove()

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
      var theNumberCell = $('#number-cell-' + i + '-' + j)

      if (board[i][j] === 0) {
        theNumberCell.css('width', '0px')
        theNumberCell.css('height', '0px')
        theNumberCell.css('top', getPosTop(i, j) + 50)
        theNumberCell.css('left', getPosLeft(i, j) + 50)
      } else {
        theNumberCell.css('width', '100px')
        theNumberCell.css('height', '100px')
        theNumberCell.css('top', getPosTop(i, j))
        theNumberCell.css('left', getPosLeft(i, j))
        theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
        theNumberCell.css('color', getNumberColor(board[i][j]))
        theNumberCell.text(getTextByNumber(board[i][j]))
      }
    }
  }
}

//定义随机在空位生成一个数字的函数
function generateOneNumber() {
  //如果没有空位，则返回false
  if (nospace(board)) {
    return false
  }
  //随机一个位置并判断位置是否可用
  var randomX = parseInt(Math.floor(Math.random() * 4))
  var randomY = parseInt(Math.floor(Math.random() * 4))
  while (true) {
    if (board[randomX][randomY] === 0) {
      break
    } else {
      randomX = parseInt(Math.floor(Math.random() * 4))
      randomY = parseInt(Math.floor(Math.random() * 4))
    }
  }
  //随机一个数字
  var randomNumber = Math.random() < 0.5 ? 2 : 4

  //在随机位置上显示这个随机生成的数字
  board[randomX][randomY] = randomNumber
  showNumberWithAnimation(randomX, randomY, randomNumber)
  return true
}

// 绑定按钮事件 游戏
$("#play button").click(function (e) {
  var elemClass = $(e.target).attr('class');
  switch (elemClass) {
    case 'left': 
      if (moveLeft()) {
        generateOneNumber()
        isgameover()
      }
      break;
    case 'top':
      if (moveUp()) {
        generateOneNumber()
        isgameover()
      }
      break;
    case 'right': 
      if (moveRight()) {
        generateOneNumber()
        isgameover()
      }
      break;
    case 'bottom': 
      if (moveDown()) {
        generateOneNumber()
        isgameover()
      }
      break;
    default:
      break;
  }
});

//绑定键盘事件
document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37: //left
      if (moveLeft()) {
        generateOneNumber()
        isgameover()
      }
      break;
    case 38: //up
      if (moveUp()) {
        generateOneNumber()
        isgameover()
      }
      break;
    case 39: //right
      if (moveRight()) {
        generateOneNumber()
        isgameover()
      }
      break;
    case 40: //down
      if (moveDown()) {
        generateOneNumber()
        isgameover()
      }
      break;
    default:
      break;
  }
}

//定义向左移动的函数
function moveLeft() {
  //如果不能向左移动，则返回false
  if (!canMoveLeft(board)) {
    return false
  }
  //moveLeft
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < j; k++) {
          //对每个数字的左侧位置进行判断 判断条件 ： 落脚位置是否为空 && 落脚位置是否与带判定位置数值相等 && 数值之间是否有障碍物
          if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) { //i,k位置为空并且i.j与i，k之间没有障碍物
            //move
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            continue
          } else
          if (board[i][j] === board[i][k] && noBlockHorizontal(i, k, j, board)) {
            //move
            showMoveAnimation(i, j, i, k)
            //两数相加
            board[i][k] += board[i][j]
            board[i][j] = 0

            score += board[i][k]
            updateScore(score)
            continue
          }
        }
      }
    }
  }
  updateBoardView()
  return true
}

//定义向上移动的函数
function moveUp() {
  //如果不能向左移动，则返回false
  if (!canMoveUp(board)) {
    return false
  }
  //moveUp
  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < i; k++) {
          //对每个数字的左侧位置进行判断 判断条件 ： 落脚位置是否为空 && 落脚位置是否与带判定位置数值相等 && 数值之间是否有障碍物
          if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) { //i,k位置为空并且i.j与i，k之间没有障碍物
            //move
            showMoveAnimation(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            continue
          } else if (board[i][j] === board[k][j] && noBlockVertical(j, k, i, board)) {
            //move
            showMoveAnimation(i, j, k, j)
            //两数相加
            board[k][j] += board[i][j]
            board[i][j] = 0

            score += board[k][j]
            updateScore(score)
            continue
          }
        }
      }
    }
  }
  setTimeout(updateBoardView(), 200);
  return true
}

//定义向右移动的函数
function moveRight() {
  //如果不能向左移动，则返回false
  if (!canMoveRight(board)) {
    return false
  }
  //moveRight
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > j; k--) {
          //对每个数字的右侧位置进行判断 判断条件 ： 落脚位置是否为空 && 落脚位置是否与带判定位置数值相等 && 数值之间是否有障碍物
          if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) { //i,k位置为空并且i.j与i，k之间没有障碍物
            //move
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            continue
          } else if (board[i][k] === board[i][j] && noBlockVertical(j, k, i, board)) {
            //move
            showMoveAnimation(i, j, i, k)
            //两数相加
            board[i][k] += board[i][j]
            board[i][j] = 0

            //更新分数
            score += board[i][k]
            updateScore(score)
            continue
          }
        }
      }
    }
  }
  setTimeout(updateBoardView(), 200);
  return true
}

//定义向下移动的函数
function moveDown() {
  //如果不能向左移动，则返回false
  if (!canMoveDown(board)) {
    return false
  }
  //moveDown
  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > i; k--) {
          //对每个数字的下侧位置进行判断 判断条件 ： 落脚位置是否为空 && 落脚位置是否与带判定位置数值相等 && 数值之间是否有障碍物
          if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) { //k,j位置为空并且i.j与k，j之间没有障碍物
            //move
            showMoveAnimation(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            continue
          } else if (board[i][j] === board[k][j] && noBlockVertical(j, i, k, board)) {
            //move
            showMoveAnimation(i, j, k, j)
            //两数相加
            board[k][j] += board[i][j]
            board[i][j] = 0

            score += board[k][j]
            updateScore(score)
            continue
          }
        }
      }
    }
  }
  setTimeout(updateBoardView(), 200);
  return true
}

// 判断游戏结束
function isgameover() {
  if (nospace(board) && nomove(board)) {
    gameover()
  }
}

function gameover() {
  // 提示游戏结合素
  alert('game over')
}