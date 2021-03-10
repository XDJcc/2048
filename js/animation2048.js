//定义格子生成动画的函数
function showNumberWithAnimation(i, j, randomNumber) {
  var numberCell = $('#number-cell-' + i + '-' + j)
  numberCell.css('background-color', getNumberBackgroundColor(randomNumber))
  numberCell.css('color', getNumberColor(randomNumber))
  numberCell.text(getTextByNumber(randomNumber))
  numberCell.animate({
    width: '100px',
    height: '100px',
    top: getPosTop(i, j),
    left: getPosLeft(i, j)
  })
}

//定义格子移动动画函数
function showMoveAnimation(fromx, fromy, tox, toy) {
  var numberCell = $('number-cell-' + fromx + '-' + fromy)
  numberCell.animate({
    left: getPosLeft(tox, toy),
    top: getPosTop(tox, toy)
  }, 300)
}

//更新得分函数
function updateScore(score) {
  $('#score').text(score)
  if (score <= 4 && score > 0) {
    $('#score').css('color', '#eee4da')
  } else if (score <= 64 && score > 4) {
    $('#score').css('color', '#ede0c8')
  } else if (score <= 256 && score > 64) {
    $('#score').css('color', '#f65e3b')
  } else if (score <= 2048 && score > 256) {
    $('#score').css('color', '#09c')
  }

}