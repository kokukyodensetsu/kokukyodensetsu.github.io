// ここで利用しているキーコードは下記のブラウザ標準です。現在非推奨になってしまっているため、今後変更の可能性があります
// https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent/keyCode

const right = 39;
const left = 37;
const up = 38;
const down = 40;
const enter = 13;
const cancel = 27;
const shift = 16;
const ctrl = 17;
// const alt = 18;

const dirKeys = [right, left, up, down];

let downKeyCodes = [];
const dirarea = document.getElementById("canvas");

function dispatchKeyCode(upOrDown, keyCode){
  const canvasEl = document.getElementById("canvas");
  if(document.activeElement !== canvasEl){
    canvasEl.focus();
  }

  let keyEvent= new KeyboardEvent(upOrDown, {keyCode: keyCode, key:keyCode, code:keyCode});
  if(upOrDown == 'keydown'){
    downKeyCodes.push(keyCode);
    Module.canvas.dispatchEvent(keyEvent);
  }else if (upOrDown == 'keyup'){
    downKeyCodes = downKeyCodes.filter((k) => k != keyCode);
    Module.canvas.dispatchEvent(keyEvent);
  }
}
function cancelAllDirKeyCodes(){
  const downDirKeyCodes = [];
  downKeyCodes.forEach((keyCode) => { 
    if(dirKeys.includes(keyCode)){
      downDirKeyCodes.push(keyCode);
    }
  });
  downDirKeyCodes.forEach((keyCode) => {
    dispatchKeyCode('keyup', keyCode);
  });
}

function dispatchDirKeyWithDelta(dx, dy){
  let angleUnit = 360.0 / 16.0;
  const vectorX = dx || 0.0;
  const vectorY = dy || 0.0;
  const degree = (-180.0 * (Math.atan2(vectorY, vectorX) / Math.PI) + 360.0) % 360;
  const force = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
  const threshold = 10;
  let nanameScale = 1.0;

  const downDirKeyCodes = downKeyCodes.filter((keyCode) => dirKeys.includes(keyCode));
  if(downDirKeyCodes.length > 0){
    nanameScale = 0.5;
  }

  if(13 * angleUnit < degree || degree < 3 * angleUnit){
    if(!downKeyCodes.includes(right) && force > threshold * nanameScale){
      if(downKeyCodes.includes(left)){
        dispatchKeyCode('keyup', left); 
      }
      dispatchKeyCode('keydown', right);                 
    }
  }
  if(1 * angleUnit < degree && degree < 7 * angleUnit){
    if(!downKeyCodes.includes(up) && force > threshold * nanameScale){
      if(downKeyCodes.includes(down)){
        dispatchKeyCode('keyup', down); 
      }
      dispatchKeyCode('keydown', up);                 
    }
  }
  if(5 * angleUnit < degree && degree < 11 * angleUnit){
    if(!downKeyCodes.includes(left) && force > threshold * nanameScale){
      if(downKeyCodes.includes(right)){
        dispatchKeyCode('keyup', right); 
      }
      dispatchKeyCode('keydown', left);                 
    }
  }
  if(9 * angleUnit < degree && degree < 15 * angleUnit){
    if(!downKeyCodes.includes(down) && force > threshold * nanameScale){
      if(downKeyCodes.includes(up)){
        dispatchKeyCode('keyup', up); 
      }
      dispatchKeyCode('keydown', down);                 
    }
  }
  if(downKeyCodes.includes(right) && Math.abs(vectorX) < threshold * nanameScale){
    dispatchKeyCode('keyup', right);                 
  }
  if(downKeyCodes.includes(up) && Math.abs(vectorY) < threshold * nanameScale){
    dispatchKeyCode('keyup', up);                 
  }
  if(downKeyCodes.includes(left) && Math.abs(vectorX) < threshold * nanameScale){
    dispatchKeyCode('keyup', left);                 
  }
  if(downKeyCodes.includes(down) && Math.abs(vectorY) < threshold * nanameScale){
    dispatchKeyCode('keyup', down);                 
  }
  if(force < threshold){
    cancelAllDirKeyCodes();
  }
}

const noSystemTouch = () => {
  const result = document.getElementById("no-system-touch").checked;
  return result;
}
let mouseRightButtonFlag = false;

function enableMouseRightButton(){
  mouseRightButtonFlag = true;
}
function disableMouseRightButton(){
  mouseRightButtonFlag = false;
}

const canvasEl = document.getElementById("canvas");
let touches = {};
canvasEl.addEventListener('touchstart', handleTouchStart, false);
canvasEl.addEventListener('touchmove', handleTouchMove, false);
canvasEl.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(e) {
  if(noSystemTouch()){
    e.preventDefault();
    const newTouches = e.changedTouches;
    for (let i = 0; i < newTouches.length; i++) {
        const touch = newTouches[i];
        touches[touch.identifier] = {
            x: touch.pageX - canvas.offsetLeft,
            y: touch.pageY - canvas.offsetTop
        };
    }
    dispatchTouchMouseEvent(e);
  }
}

function handleTouchMove(e) {
  if(noSystemTouch()){
    e.preventDefault();
    const movedTouches = e.changedTouches;
    for (let i = 0; i < movedTouches.length; i++) {
        const touch = movedTouches[i];
        if (touches[touch.identifier]) {
            touches[touch.identifier] = {
                x: touch.pageX - canvas.offsetLeft,
                y: touch.pageY - canvas.offsetTop
            };
        }
    }
    dispatchTouchMouseEvent(e);
  }
}

function handleTouchEnd(e) {
  if(noSystemTouch()){
    e.preventDefault();
    const endedTouches = e.changedTouches;
    for (let i = 0; i < endedTouches.length; i++) {
        const touch = endedTouches[i];
        delete touches[touch.identifier];
    }
    dispatchTouchMouseEvent(e);
  }
}

function dispatchTouchMouseEvent(evt) {
  let type = null;
  let touch = null;
  let buttonType = mouseRightButtonFlag ? 1 : 0; 
  let buttonState = buttonType + 1;
  let touchIndex = 0;

  switch (evt.type) {
    case "touchstart":
      type = "mousedown";
      touch = evt.changedTouches[touchIndex];
      break;
    case "touchmove":
      type = "mousemove";
      touch = evt.changedTouches[touchIndex];
      break;
    case "touchend":
      type = "mouseup";
      buttonState = 0;
      touch = evt.changedTouches[touchIndex];
      break;
  }
  const newEvt = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window,
    detail: 1,
    button: buttonType,
    buttons: buttonState,
    view: window,
    clientX: touch.clientX,
    clientY: touch.clientY,
    screenX: touch.screenX,
    screenY: touch.screenY,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    relatedTarget: null
  });

  canvasEl.dispatchEvent(newEvt);
}

const dirMC = new Hammer.Manager(dirarea);
const pan = new Hammer.Pan({ event: 'pan'});
dirMC.add([pan]);
dirMC.on('pan', function(e){
  if(!noSystemTouch()){
    e.preventDefault();
    dispatchDirKeyWithDelta(e.deltaX, e.deltaY)
  }
});
dirMC.on('panend', function(e){
  if(!noSystemTouch()){
    e.preventDefault();
    cancelAllDirKeyCodes();
  }
});

function dispatchClick(keyCode){
  dispatchKeyCode('keydown', keyCode);
  setTimeout(function(){ dispatchKeyCode('keyup', keyCode); }, 100);
}