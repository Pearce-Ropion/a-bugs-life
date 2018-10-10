window.requestAnimationFrame = (lastTime = 0, callback) => {
    const currTime = new DataCue().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);
    return id;
};

window.cancelAnimationFrame = id => clearTimeout(id);