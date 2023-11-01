/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

window.onload = function () {
  welcome();
  walls = 10; // any number can be input
  createAll();
  setup();
  startGame(); //0: maze, 1: sol
  amsrGoal();
  present();
};
function amsrGoal(){
  // alert(' goal: ' + goal)
  Swal.fire({
    icon: 'info',
    title: ' goal: ' + goal,
    showConfirmButton: false,
    timer: 4500
  })
}
function welcome() {

amsrMMsg();
amsrMsg2();
amsrMsg3();
  // alert(
  //   "At the top of screen is your" +
  //     " position and direction, which may" +
  //     " help you find your way."
  // );
  // alert("Now, enjoy yourself!o(｡>ω<｡)o");
}
function amsrMMsg(){
    
  Swal.fire({
    title:'Welcome to my Maze Game!',
    showConfirmButton: false,
    // timer: 2000
  })
}
function amsrMsg2(){
  
  Swal.fire({
    title: "At the top of screen is your" +
    " position and direction, which may" +
    " help you find your way.",
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown'
    }
  })
}
function amsrMsg3(){
  Swal.fire({
    title: "Now, enjoy yourself!o(｡>ω<｡)o",
    showClass: {
      popup: 'animate__animated animate__fadeInUp'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}
function test() {
  for (var testN = walls; testN > 0; testN--) {
    closeWall("left", testN);
    openWall("left", testN);
    closeWall("right", testN);
    openWall("right", testN);
    closeDoor(testN);
    openDoor(testN);
  }
  setHidden("tleft", true);
  setHidden("tright", true);
}

////////////////////////////////////////
///////////setup before start///////////
////////////////////////////////////////

function createAll() {
  // modify invalid number
  if (typeof walls != "number" || walls < 3) walls = 3;
  walls = Math.floor(walls);
  sides = Math.ceil(walls / 2);

  document.getElementById("ceil").style.height =
    180 * (1 - 2 / (2 * walls + 1)) + "px";
  document.getElementById("floor").style.height =
    270 * (1 - 2 / (2 * walls + 1)) + "px";
  createWalls();
  createBtns();
}

function createWalls() {
  for (var p = walls; p > 0; p--) {
    createWall(p);
  }
  wallsModify();
}

function createBtns() {
  var bg = document.getElementById("bg");
  var btns = [
    "back",
    "left",
    "right",
    "lfront",
    "rfront",
    "front",
    "ffront",
    "fleft",
    "fright",
    "tleft",
    "tright",
  ];
  for (var p = 0; p < 11; p++) {
    var el = document.createElement("div");
    el.id = btns[p];
    els = el.style;
    els.width = "0";
    els.height = "0";
    els.background = "transparent";
    els.position = "absolute";
    bg.appendChild(el);
  }
}

function createWall(n) {
  var bg = document.getElementById("bg");

  for (var s = sides; s > 1; s--) {
    var lf = document.createElement("div");
    lf.id = "left" + s + n;
    lf.style.background = "transparent";
    lf.style.position = "absolute";

    var rf = document.createElement("div");
    rf.id = "right" + s + n;
    rf.style.background = "transparent";
    rf.style.position = "absolute";

    var ls = document.createElement("div");
    ls.id = "lefts" + s + n;
    ls.style.background = "transparent";
    ls.style.position = "absolute";

    var rs = document.createElement("div");
    rs.id = "rights" + s + n;
    rs.style.background = "transparent";
    rs.style.position = "absolute";

    bg.appendChild(ls);
    bg.appendChild(rs);
    bg.appendChild(lf);
    bg.appendChild(rf);
  }

  var w = document.createElement("div");
  w.id = "wall" + n;
  w.style.background = "transparent";
  w.style.position = "absolute";
  w.style.borderLeft = "1px black solid";
  w.style.borderRight = "1px black solid";

  var l = document.createElement("div");
  l.id = "left" + n;
  l.style.background = "grey";
  l.style.position = "absolute";

  var r = document.createElement("div");
  r.id = "right" + n;
  r.style.background = "grey";
  r.style.position = "absolute";

  var lf = document.createElement("div");
  lf.id = "leftf" + n;
  lf.style.background = "transparent";
  lf.style.position = "absolute";

  var rf = document.createElement("div");
  rf.id = "rightf" + n;
  rf.style.background = "transparent";
  rf.style.position = "absolute";

  var ls = document.createElement("div");
  ls.id = "lefts" + n;
  ls.style.background = "transparent";
  ls.style.position = "absolute";

  var rs = document.createElement("div");
  rs.id = "rights" + n;
  rs.style.background = "transparent";
  rs.style.position = "absolute";

  bg.appendChild(ls);
  bg.appendChild(rs);
  bg.appendChild(lf);
  bg.appendChild(rf);
  bg.appendChild(l);
  bg.appendChild(r);
  bg.appendChild(w);

  // marking walls
  var fm = document.createElement("div");
  fm.id = "fm";
  fm.style.background = "transparent";
  fm.style.position = "absolute";
  fm.style.width = "230px";
  fm.style.height = "300px";
  fm.style.left = "56.5px";
  fm.style.bottom = "90px";
  fm.addEventListener("click", markFront);

  var lm = document.createElement("div");
  lm.id = "lm";
  lm.style.background = "transparent";
  lm.style.position = "absolute";
  lm.style.width = "57.5px";
  lm.style.height = "360px";
  lm.style.left = "0";
  lm.style.bottom = "90px";
  lm.addEventListener("click", markLeft);

  var rm = document.createElement("div");
  rm.id = "rm";
  rm.style.background = "transparent";
  rm.style.position = "absolute";
  rm.style.width = "57.5px";
  rm.style.height = "360px";
  rm.style.right = "0";
  rm.style.bottom = "90px";
  rm.addEventListener("click", markRight);

  bg.appendChild(lm);
  bg.appendChild(rm);
  bg.appendChild(fm);
}

function wallsModify() {
  for (var p = 2; p <= walls; p++) {
    var k = 2 / (2 * p + 1);

    var wNs = document.getElementById("wall" + p).style;
    wNs.width = 345 * k + "px";
    wNs.height = 450 * k + "px";
    wNs.bottom = 0.6 * 450 * (1 - k) + "px";
    wNs.left = 0.5 * 345 * (1 - k) - 1 + "px";

    var lNs = document.getElementById("left" + p).style;
    lNs.width = (345 * k) / (2 * p - 1) + "px";
    lNs.height = 450 * k + "px";
    lNs.bottom = 0.6 * 450 * (1 - k) + "px";
    lNs.left = 345 * (0.5 * (1 - k) - k / (2 * p - 1)) + "px";

    var rNs = document.getElementById("right" + p).style;
    rNs.width = (345 * k) / (2 * p - 1) + "px";
    rNs.height = 450 * k + "px";
    rNs.bottom = 0.6 * 450 * (1 - k) + "px";
    rNs.right = 345 * (0.5 * (1 - k) - k / (2 * p - 1)) + "px";

    for (var S = 1; S <= sides; S++) {
      var wll = 0.5 * 345 * (1 - k - 2 * S * k) - 1;
      var x = S == 1 ? "f" : S;
      var y = S == 1 ? "" : S;

      var lfNs = document.getElementById("left" + x + p).style;
      lfNs.height = 450 * k + "px";
      lfNs.bottom = 0.6 * 450 * (1 - k) + "px";
      if (345 * k + wll > 0) lfNs.borderRight = "1px solid black";
      if (wll > 0) {
        lfNs.width = 345 * k - 1 + "px";
        lfNs.left = wll + "px";
        lfNs.borderLeft = "1px solid black";
      } else {
        lfNs.width = 345 * k + wll + "px";
        lfNs.left = "0";
      }

      var rfNs = document.getElementById("right" + x + p).style;
      rfNs.height = 450 * k + "px";
      rfNs.bottom = 0.6 * 450 * (1 - k) + "px";
      if (345 * k + wll > 0) rfNs.borderLeft = "1px solid black";
      if (wll > 0) {
        rfNs.width = 345 * k - 1 + "px";
        rfNs.right = wll + "px";
        rfNs.borderRight = "1px solid black";
      } else {
        rfNs.width = 345 * k + wll + "px";
        rfNs.right = "0";
      }

      var side = 345 * (0.5 - (2 * S + 1) / (2 * p - 1));
      var width = (690 / (4 * p * p - 1)) * (2 * S + 1);
      var mod = side < 0 ? 1 + side / width : 1;
      var bbt = (1080 / (4 * p * p - 1)) * mod;

      var lsNs = document.getElementById("lefts" + y + p).style;
      lsNs.height = 450 * k + "px";
      lsNs.borderLeft = width * mod + "px grey solid";
      lsNs.left = (side > 0 ? side : 0) + "px";
      lsNs.bottom = 270 * (1 - k) - bbt + "px";
      lsNs.borderBottom = bbt + "px transparent solid";
      lsNs.borderTop = (bbt * 2) / 3 + "px transparent solid";

      var rsNs = document.getElementById("rights" + y + p).style;
      rsNs.height = 450 * k + "px";
      rsNs.borderRight = width * mod + "px grey solid";
      rsNs.right = (side > 0 ? side : 0) + "px";
      rsNs.bottom = 270 * (1 - k) - bbt + "px";
      rsNs.borderBottom = bbt + "px transparent solid";
      rsNs.borderTop = (bbt * 2) / 3 + "px transparent solid";
    }
  }
}

function setup() {
  pos = [0, 0]; //start grid
  direc = 0; //0S↓, 1E→, 2N↑, 3W←
  d = ["S↓", "E→", "N↑", "W←"];
  colors = [
    "grey",
    "red",
    "orange",
    "green",
    "skyblue",
    "purple",
    "orchid",
    "white",
    "black",
  ];
  goal = [0, 1];
  sides = 1;
  searchSpeed = 500;
  leadSpeed = 200;
  //var maze;
  solvingStop = true;

  document.getElementById("ffront").addEventListener("click", ffront);
  document.getElementById("front").addEventListener("click", front);
  document.getElementById("lfront").addEventListener("click", lfront);
  document.getElementById("rfront").addEventListener("click", rfront);
  document.getElementById("back").addEventListener("click", back);
  document.getElementById("fleft").addEventListener("click", fleft);
  document.getElementById("left").addEventListener("click", left);
  document.getElementById("tleft").addEventListener("click", tleft);
  document.getElementById("fright").addEventListener("click", fright);
  document.getElementById("right").addEventListener("click", right);
  document.getElementById("tright").addEventListener("click", tright);
  document.getElementById("new").addEventListener("click", newGame);
}

function secSetUp() {
  document.getElementById("sol").addEventListener("click", answer);
  document.getElementById("lm").addEventListener("click", markLeft);
  document.getElementById("rm").addEventListener("click", markRight);
  document.getElementById("fm").addEventListener("click", markFront);
}

function show() {
  p = document.getElementById("position");
  p.innerHTML = "goal:(" + goal + ") pos:(" + pos + ") " + d[direc];
}

function winGame() {
  stopSolve();
  delete maze;
  delete memo;
  msg4();
  //alert("Congratulations!");
  if (window.confirm("Play one more game?")) {
    startGame();
    present();
  } else {
    closeWall("left", 1, true);
    closeWall("right", 1, true);
    closeDoor(1, true);
    setHidden("tleft", false);
    setHidden("tright", false);
    msg5();
   // alert("Thank you for " + "playing my game (ﾉ>ω<)ﾉ♡");
  }
}
function msg4(){
  Swal.fire({
    icon: 'success',
    title:"Congratulations!",
    showConfirmButton: false,
    timer: 5500
  })
}
function msg5(){
  
  Swal.fire({
    title:"Thank you for " + "playing my game (ﾉ>ω<)ﾉ♡",
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}
/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
////////////////////////////////////////
/////these are for walls open/close/////
////////////////////////////////////////

function getC(grid, dir) {
  return colors[memo[grid[0]][grid[1]][dir]];
}

function closeWall(side, number, goal = false) {
  if (number == 1) {
    if (side == "left") {
      setHidden("lm", true);
    } else {
      setHidden("rm", true);
    }
  }

  var wall = document.getElementById(side + number);
  var W = getComputedStyle(wall);
  if (W.width != "0px") {
    // do nothing if already closed
    var front = document.getElementById("wall" + (number - 1));
    var b = parseInt(W.bottom.slice(0, -2));
    var fb = parseInt(getComputedStyle(front).bottom.slice(0, -2));
    var w = parseInt(W.width.slice(0, -2));
    wall.style.background = "transparent";
    wall.style.width = "0";
    if (side == "left")
      wall.style.borderLeft =
        w +
        "px solid " +
        (goal
          ? "magenta"
          : getC(getGrid(pos, direc, number - 1), (direc + 1) % 4));
    else
      wall.style.borderRight =
        w +
        "px solid " +
        (goal
          ? "magenta"
          : getC(getGrid(pos, direc, number - 1), (direc + 3) % 4));
    wall.style.borderTop = ((b - fb) * 2) / 3 + "px transparent solid";
    wall.style.borderBottom = b - fb + "px transparent solid";
    wall.style.bottom = fb + "px";
  } else if (side == "left")
    wall.style.borderLeftColor = goal
      ? "magenta"
      : getC(getGrid(pos, direc, number - 1), (direc + 1) % 4);
  else
    wall.style.borderRightColor = goal
      ? "magenta"
      : getC(getGrid(pos, direc, number - 1), (direc + 3) % 4);
}

function openWall(side, number, goal = false, next = false) {
  if (number == 1) {
    if (side == "left") {
      setHidden("lm", false);
    } else {
      setHidden("rm", false);
    }
  }

  var wall = document.getElementById(side + number);
  if (getComputedStyle(wall).width == "0px") {
    //do nothing if already open
    var b = parseInt(getComputedStyle(wall).bottom.slice(0, -2));
    var bbw = parseInt(getComputedStyle(wall).borderBottomWidth.slice(0, -2));
    wall.style.borderTop = "";
    wall.style.borderBottom = "0";
    wall.style.bottom = b + bbw + "px";
    if (side == "left") {
      var blw = getComputedStyle(wall).borderLeftWidth.slice(0, -2);
      wall.style.width = blw + "px";
      wall.style.borderLeft = "";
    } else {
      var brw = getComputedStyle(wall).borderRightWidth.slice(0, -2);
      wall.style.width = brw + "px";
      wall.style.borderRight = "";
    }
  }
  wall.style.background = next
    ? "transparent"
    : goal
    ? "magenta"
    : getC(
        getGrid(
          getGrid(pos, direc, number - 1),
          (direc + (side == "left" ? 1 : 3)) % 4
        ),
        direc
      );
}

function closeDoor(number, goal = false) {
  var wall = document.getElementById("wall" + number);
  wall.style.background = goal
    ? "magenta"
    : getC(getGrid(pos, direc, number - 1), direc);
  if (number == 1) {
    setHidden("fm", true);
  }
}

function openDoor(number) {
  var wall = document.getElementById("wall" + number);
  wall.style.background = "transparent";
  if (number == 1) {
    setHidden("fm", false);
  }
}

/////////////////////////////////////////
////button events (mainly directions)////
/////////////////////////////////////////

function move(posi, n) {
  switch (n) {
    case 0:
      posi[0]++;
      break;
    case 1:
      posi[1]++;
      break;
    case 2:
      posi[0]--;
      break;
    case 3:
      posi[1]--;
      break;
  }
}

function getGrid(pos, dir = -1, num = 1) {
  switch (dir) {
    case -1:
      return [pos[0], pos[1]];
    case 0:
      return [pos[0] + num, pos[1]];
    case 1:
      return [pos[0], pos[1] + num];
    case 2:
      return [pos[0] - num, pos[1]];
    case 3:
      return [pos[0], pos[1] - num];
  }
}

function avail(grid, dir) {
  if (isGoal(grid) && dir == 2) return false;
  else
    switch (dir) {
      case 0:
      case 1:
        return maze[0][grid[0]][grid[1]][dir] == 0;
      case 2:
        return grid[0] > 0 && maze[0][grid[0] - 1][grid[1]][0] == 0;
      case 3:
        return grid[1] > 0 && maze[0][grid[0]][grid[1] - 1][1] == 0;
    }
}

function same(grid1, grid2) {
  return grid1[0] == grid2[0] && grid1[1] == grid2[1];
}

function isGoal(grid, dir = -1) {
  var t = [grid[0], grid[1]];
  if (dir > -1) t = getGrid(t, dir);
  return same(goal, t);
}

function setHidden(item, val) {
  document.getElementById(item).style.display = val ? "block" : "none";
}

function setAllHidden() {
  setHidden("back", false);
  setHidden("left", false);
  setHidden("right", false);
  setHidden("fleft", false);
  setHidden("fright", false);
  setHidden("ffront", false);
  setHidden("front", false);
  setHidden("lfront", false);
  setHidden("rfront", false);
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

function checkSide(grid, side, number, dir) {
  var secdir = (dir + (side == "left" ? 1 : 3)) % 4;
  if (avail(grid, secdir)) {
    var sidegrid = getGrid(grid, secdir);
    var sfAvail = avail(sidegrid, dir);
    openWall(side, number, isGoal(sidegrid), sfAvail);
    if (number == 1) setHidden(side, true);
    else if (number == 2) setHidden("f" + side, true);

    var wallN = number + 1;
    while (sfAvail && wallN <= walls) {
      var sf = getGrid(sidegrid, dir);
      var sfs = document.getElementById(side + "f" + wallN).style;
      sfs.background = isGoal(sf)
        ? "magenta"
        : avail(sf, dir)
        ? "transparent"
        : getC(sf, dir);

      var sss = document.getElementById(side + "s" + wallN).style;
      if (side == "left")
        sss.borderLeftColor = isGoal(sf)
          ? "magenta"
          : avail(sf, secdir)
          ? "transparent"
          : getC(sf, secdir);
      else
        sss.borderRightColor = isGoal(sf)
          ? "magenta"
          : avail(sf, secdir)
          ? "transparent"
          : getC(sf, secdir);

      if (avail(sf, secdir)) {
        checkSSide(getGrid(sf, secdir), side, 2, wallN, dir);
      }

      sidegrid = sf;
      sfAvail = avail(sidegrid, dir);
      wallN++;
    }
  } else {
    closeWall(side, number, isGoal(grid));
  }
}

function checkSSide(grid, side, sideN, wallN, dir) {
  var secdir = (dir + (side == "left" ? 1 : 3)) % 4;
  var ssf = document.getElementById(side + sideN + wallN);
  if (avail(grid, dir)) {
    ssf.style.background = "transparent";
    var sWallN = wallN;
    var sGrid = grid;
    while (avail(sGrid, dir) && sWallN < walls) {
      sWallN++;
      sGrid = getGrid(grid, dir);
      document.getElementById(side + sideN + wallN).style.background = isGoal(
        sGrid
      )
        ? "magenta"
        : getC(sGrid, dir);

      var ss = document.getElementById(side + "s" + sideN + wallN).style;
      if (side == "left")
        ss.borderLeftColor = isGoal(sGrid)
          ? "magenta"
          : avail(sGrid, secdir)
          ? "transparent"
          : getC(sGrid, secdir);
      else
        ss.borderRightColor = isGoal(sGrid)
          ? "magenta"
          : avail(sGrid, secdir)
          ? "transparent"
          : getC(sGrid, secdir);

      if (avail(sGrid, secdir) && sideN < sides) {
        checkSSide(getGrid(sGrid, secdir), side, sideN + 1, sWallN, dir);
      }

      grid = sGrid;
    }
  } else {
    ssf.style.background = isGoal(grid) ? "magenta" : getC(grid, dir);
  }
}

function clearSides() {
  for (var p = 2; p <= walls; p++) {
    for (var s = 1; s <= sides; s++) {
      var x = s == 1 ? "f" : s;
      var y = s == 1 ? "" : s;
      document.getElementById("lefts" + y + p).style.borderLeftColor =
        "transparent";
      document.getElementById("rights" + y + p).style.borderrightColor =
        "transparent";
      document.getElementById("left" + x + p).style.background = "transparent";
      document.getElementById("right" + x + p).style.background = "transparent";
    }
  }
}

function checkMain(grid, N) {
  //leftN
  checkSide(grid, "left", N, direc);
  //rightN
  checkSide(grid, "right", N, direc);
  //doorN
  if (avail(grid, direc)) {
    openDoor(N);
    if (N++ < walls) checkMain(getGrid(grid, direc), N);
  } else closeDoor(N, isGoal(grid));
}
/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

function present() {
  setAllHidden();
  clearSides();
  show();
  if (isGoal(pos)) winGame();
  else {
    //back
    if (avail(pos, (direc + 2) % 4)) setHidden("back", true);

    //left1     // turn left+1, right+3
    checkSide(pos, "left", 1, direc);
    if (
      avail(pos, (direc + 1) % 4) &&
      avail(getGrid(pos, (direc + 1) % 4), direc)
    ) {
      setHidden("lfront", true);
    }
    //right1
    checkSide(pos, "right", 1, direc);
    if (
      avail(pos, (direc + 3) % 4) &&
      avail(getGrid(pos, (direc + 3) % 4), direc)
    ) {
      setHidden("rfront", true);
    }
    //door1
    if (avail(pos, direc)) {
      openDoor(1);
      setHidden("front", true);
      temp = getGrid(pos, direc);
      //left2
      checkSide(temp, "left", 2, direc);
      //right2
      checkSide(temp, "right", 2, direc);
      //door2
      if (avail(temp, direc)) {
        openDoor(2);
        setHidden("ffront", true);
        checkMain(getGrid(temp, direc), 3);
      } else {
        closeDoor(2, isGoal(temp));
      }
    } else closeDoor(1);
  }
}

function ffront() {
  move(pos, direc);
  move(pos, direc);
  present();
}

function front() {
  move(pos, direc);
  present();
}

function lfront() {
  move(pos, (direc + 1) % 4);
  move(pos, direc);
  present();
}

function rfront() {
  move(pos, (direc + 3) % 4);
  move(pos, direc);
  present();
}

function back() {
  direc = (direc + 2) % 4;
  move(pos, direc);
  present();
}

function fleft() {
  move(pos, direc);
  direc = (direc + 1) % 4;
  move(pos, direc);
  present();
}

function left() {
  direc = (direc + 1) % 4;
  move(pos, direc);
  present();
}

function tleft() {
  direc = (direc + 1) % 4;
  present();
}

function fright() {
  move(pos, direc);
  direc = (direc + 3) % 4;
  move(pos, direc);
  present();
}

function right() {
  direc = (direc + 3) % 4;
  move(pos, direc);
  present();
}

function tright() {
  direc = (direc + 3) % 4;
  present();
}

function newGame() {
  if (window.confirm("Are you sure " + "to start a new game?")) {
   // alert("Game Reset");
   msg6();
    startGame();
    present();
  }
}
function msg6(){
  Swal.fire({
    icon: 'success',
    title: "Game Reset",
    showConfirmButton: false,
    timer: 3500
  })
}
function answer() {
  if (solvingStop)
    if (window.confirm("Are you sure " + "to give up challenging?")) {
      //alert("You're going to be " + "lead to the exit.");
  msg7();
      solvingStop = false;
      solveMode();
      if (!ins(maze[1], pos)) searchWay();
      else alongSol();
    }
}
function msg7(){
  Swal.fire({
    icon: 'warn',
    title: "Are you sure " + "to give up challenging?",
    timer: 3500
  })
}
function solveMode() {
  s = document.getElementById("sol");
  s.innerHTML = "solving...";
  s.style.background = "magenta";
  s.removeEventListener("click", answer);
  s.addEventListener("click", stopSolve);
}

function stopSolve() {
  solvingStop = true;
  s = document.getElementById("sol");
  s.innerHTML = "Solution";
  s.style.background = "skyblue";
  s.removeEventListener("click", stopSolve);
  s.addEventListener("click", answer);
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

function searchWay() {
  var tempdir = (direc + 3) % 4;
  while (!avail(pos, tempdir)) tempdir = (tempdir + 1) % 4;
  direc = tempdir;
  move(pos, direc);
  present();
  if (!solvingStop && !ins(maze[1], pos)) setTimeout(searchWay, searchSpeed);
  else alongSol();
}

function alongSol() {
  document.getElementById("sol").innerHTML = "Find Way!!!";
  index = 0;
  while (!same(maze[1][index], pos)) index++;
  if (pos[1] < n) goHome();
}

function goHome() {
  now = maze[1][index++];
  next = maze[1][index];
  if (next[0] > now[0]) direc = 0;
  else if (next[1] > now[1]) direc = 1;
  else if (next[0] < now[0]) direc = 2;
  else direc = 3;
  pos = [next[0], next[1]];
  present();
  if (!solvingStop && pos[1] < n) setTimeout(goHome, leadSpeed);
}
//////////////////////////////////////////
////Below is the part of creating maze////
//////////////////////////////////////////
// from my python code

//main
function startGame() {
  //test();
  stopSolve();
  secSetUp();
  pos = [0, 0];
  direc = 0;
  try {
    input = prompt("Please enter " + "the size of the map, ex. 7*6").split("*");
  } catch (e) {
    input = ["20", "20"];
  }
  try {
    m = parseInt(input[0]);
    if (isNaN(m)) throw "e";
  } catch (e) {
    m = 20;
  }
  try {
    n = parseInt(input[1]);
    if (isNaN(n)) throw "e";
  } catch (e) {
    n = m;
  }
  if (m < 1 || n < 1) {
   // alert("The maze size " + "can't be that strange >~<");
   msg8();
    maze = startGame();
  } else if (m < 4 || n < 4) {
    // alert("That is too small!!");
    msg9();
    maze = startGame();
  } else {
    //alert("Maze size is " + m + "*" + n);
    msg10();
    map = CreateMap(m, n);
    //alert (map[5][7]);
    sol = CreatePuzzle(map, m, n);
    soll = sol.length - 1;
    end = [m - 1, n - 1];
    while (!same(sol[soll--], end)) sol.pop();

    map[m - 1][n] = [1, 1];
    goal = [m - 1, n];
    sol[soll + 1] = goal;
    show();
    maze = [map, sol];
    memo = createMemoMap(m, n);
    return maze;
  }
  function msg8(){
    Swal.fire({
      icon: 'info',
      title: "The maze size " + "can't be that strange >~<",
      timer: 4500
    })
  }
  function msg9(){
    Swal.fire({
      icon: 'warn',
      title:"That is too small!!",
      timer: 4500
    })
  }
  function msg10(){
    Swal.fire({
      icon: 'info',
      title:"Maze size is " + m + "*" + n,
      timer: 4500
    })
  }
}
// create the size
function CreateMap(m, n) {
  gamemap = [];
  for (var p = 0; p < m; p++) {
    var line = [];
    for (var q = 0; q < n; q++) line.push([1, 1]);
    gamemap.push(line);
  }
  return gamemap;
}

function ins(arr1, arr2) {
  arl = arr1.length;
  for (var p = 0; p < arl; p++) if (same(arr1[p], arr2)) return true;
  return false;
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

// create random maze
function CreatePuzzle(gamemap, m, n) {
  path = [[0, 0]];
  sol = [[0, 0]];
  //number = 1; // associated places
  area = m * n; // total grids
  i = 0; // index for path

  while (path.length < area) {
    sl = sol.length - 1;
    x = sol[sl][0];
    y = sol[sl][1]; // current grid
    //alert (x+","+y);
    // go back if there's no more way

    while (
      (x == m - 1 || ins(path, [x + 1, y])) &&
      (y == n - 1 || ins(path, [x, y + 1])) &&
      (x == 0 || ins(path, [x - 1, y])) &&
      (y == 0 || ins(path, [x, y - 1]))
    ) {
      //sl = sol.length-1;
      if (!same(sol[sol.length - 1], [m - 1, n - 1])) sol.pop();
      sl--;

      x = sol[sl][0];
      y = sol[sl][1];
    }

    i = path.length - 1;
    while (!same(path[i], sol[sl])) i--;

    dir = Math.floor(Math.random() * 3);
    // direction

    findWay = false;
    while (!findWay) {
      switch (dir) {
        case 0: // down
          if (x + 1 == m) {
            //out of the map
            dir = 1;
          } else if (ins(path, [x + 1, y])) {
            dir = 1;
          }
          // associated grid
          else {
            gamemap[x][y][0] = 0;
            sol.push([x + 1, y]);
            path.push([x + 1, y]);
            i = path.length - 1;
            findWay = true;
            break;
          }
        case 1: // right
          if (y + 1 == n) {
            dir = 2;
          } else if (ins(path, [x, y + 1])) {
            dir = 2;
          } else {
            gamemap[x][y][1] = 0;
            sol.push([x, y + 1]);
            path.push([x, y + 1]);
            i = path.length - 1;
            findWay = true;
            break;
          }
        case 2: // up
          if (x == 0) dir = 3;
          else if (ins(path, [x - 1, y])) dir = 3;
          else {
            gamemap[x - 1][y][0] = 0;
            sol.push([x - 1, y]);
            path.push([x - 1, y]);
            i = path.length - 1;
            findWay = true;
            break;
          }
        case 3: // left
          if (y == 0) dir = 0;
          else if (ins(path, [x, y - 1])) dir = 0;
          else {
            gamemap[x][y - 1][1] = 0;
            sol.push([x, y - 1]);
            path.push([x, y - 1]);
            i = path.length - 1;
            findWay = true;
            break;
          }
      }
      if (findWay) break;
    }
    //alert (dir);
  }
  map[m - 1][n - 1][1] = 0; // open the exit
  return sol;
}

////////////////////////////////
////////for making marks////////
////////////////////////////////

function markFront() {
  if (!isGoal(pos)) {
    memo[pos[0]][pos[1]][direc] =
      (memo[pos[0]][pos[1]][direc] + 1) % colors.length;
    //alert("front touched");
    present();
  }
}
function markLeft() {
  if (!isGoal(pos)) {
    memo[pos[0]][pos[1]][(direc + 1) % 4] =
      (memo[pos[0]][pos[1]][(direc + 1) % 4] + 1) % colors.length;
    present();
  }
}
function markRight() {
  if (!isGoal(pos)) {
    memo[pos[0]][pos[1]][(direc + 3) % 4] =
      (memo[pos[0]][pos[1]][(direc + 3) % 4] + 1) % colors.length;
    present();
  }
}

function createMemoMap(m, n) {
  memomap = [];
  for (var p = 0; p < m; p++) {
    var line = [];
    for (var q = 0; q < n; q++) line.push([0, 0, 0, 0]);
    memomap.push(line);
  }
  return memomap;
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
