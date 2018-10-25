window.onload = () => {
  const logoFrame = document.getElementById('logo-animation-frame'),
        logoEye = document.getElementById('logo-animation-eye'),
        frameWidth = logoFrame.clientWidth,
        eyeWidth = logoEye.clientWidth,
        // values of 'left' in %
        eyeInitialLeft = logoEye.offsetLeft * 100 / frameWidth,
        eyeFinishLeft = ((frameWidth - eyeWidth) / 2) * 100 / frameWidth,
        // time of eye's moving to the center in ms
        moveTime = 2000,
        eyeSpeed = (((frameWidth - eyeWidth) / 2) * 100 / frameWidth - eyeInitialLeft) / moveTime;
    let animationInProgress = false;

  animate((timePassed) => {
      const turns = 2,
            angle = 2 * 3.14 * turns / moveTime * timePassed,
            newCoord = eyeInitialLeft + eyeSpeed * (Math.cos(angle) / 24 + 1) * timePassed;
      logoEye.style.transform = `rotate(${ angle }rad)`;
      // ternar condition compensates mathematical error after using delying fucntion
      logoEye.style.left = (newCoord < eyeFinishLeft ? newCoord : eyeFinishLeft) + '%';
    }, moveTime);

  function animate(draw, duration) {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timePassed = time - start;
      if (timePassed > duration) timePassed = duration;
      draw(timePassed);
      if (timePassed < duration) {
        requestAnimationFrame(animate);
      } else {
        // after finishing of move, eye starts to blink and scare children
        makeMovement('rotateX(-88deg)', 'rotateX(0)', 200, 200);
        setMoveInterval(5000, 'rotateX(-88deg)', 'rotateX(0)', 200, 200);
        setMoveInterval(13000, 'skew(15deg, 15deg)', 'skew(0)', 700, 700);
        setMoveInterval(7000, 'translateX(20px) rotate(45deg)', 'translateX(0) rotate(0)', 1000, 500);
      }
    });
  }

  function makeMovement(move1, move2, time1, time2) {
    if (animationInProgress) return;
    animationInProgress = true;
    logoEye.style.transition = `transform ${ time1 }ms`;
    logoEye.style.transform = move1;
    setTimeout(() => {
      logoEye.style.transition = `transform ${ time2 }ms`;
      logoEye.style.transform = move2;
      animationInProgress = false;
    }, time1+50 );
  }

  function setMoveInterval(interval, move1, move2, time1, time2) {
    setInterval(() => {
      makeMovement(move1, move2, time1, time2);
    }, interval);
  }


}
