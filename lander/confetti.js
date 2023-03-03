import {
  randomBool,
  randomBetween,
  simpleBallisticUpdate,
  progress,
} from "../helpers/helpers.js";

export const makeConfetti = (state, amount, position) => {
  const CTX = state.get("CTX");
  const canvasWidth = state.get("canvasWidth");
  const canvasHeight = state.get("canvasHeight");
  const audio = state.get("audioManager");
  let hasPlayedAudio = false;

  const _makeConfettiPiece = (position, velocity) => {
    const _size = randomBetween(1, 6);
    const _rotationDirection = randomBool();
    const _groundedHeight = canvasHeight - _size + _size / 2;
    const _color = `hsl(${randomBetween(0, 360)}, 100%, 50%)`;

    let _position = { ...position };
    let _velocity = {
      x: randomBetween(velocity.x / 4, velocity.x) + randomBetween(-0.1, 0.1),
      y: velocity.y + randomBetween(-0.1, 0.1),
    };
    let _rotationVelocity = 0.1;
    let _angle = Math.PI * 2;

    const draw = () => {
      [_position, _velocity, _rotationVelocity, _angle] = simpleBallisticUpdate(
        _position,
        _velocity,
        _angle,
        _groundedHeight,
        _rotationDirection,
        _rotationVelocity,
        canvasWidth
      );

      CTX.save();
      CTX.fillStyle = _color;
      CTX.translate(_position.x, _position.y);
      CTX.rotate(_angle);
      CTX.fillRect(-_size / 2, -_size / 2, _size, _size);
      CTX.restore();
    };

    return { draw };
  };

  const _makeTwirlPiece = (position, velocity) => {
    const _size = randomBetween(4, 8);
    const _groundedHeight = canvasHeight - _size + _size / 2;
    const _color = `hsl(${randomBetween(0, 360)}, 100%, 50%)`;

    let _position = { ...position };
    let _velocity = {
      x: randomBetween(velocity.x / 4, velocity.x) + randomBetween(-0.1, 0.1),
      y: velocity.y + randomBetween(-0.1, 0.1),
    };
    let _rotationVelocity = 0;

    const mirroredLoopingProgress = (start, end, current) => {
      const loopedProgress = progress(start, end, current) % 1;
      return Math.floor(current / end) % 2
        ? Math.abs(loopedProgress - 1)
        : loopedProgress;
    };

    const draw = () => {
      [_position, _velocity, _rotationVelocity] = simpleBallisticUpdate(
        _position,
        _velocity,
        0,
        _groundedHeight,
        true,
        _rotationVelocity,
        canvasWidth
      );

      const width = mirroredLoopingProgress(0, 0.1, _rotationVelocity) * _size;

      CTX.save();
      CTX.fillStyle = _color;
      CTX.translate(_position.x, _position.y);
      CTX.beginPath();
      CTX.moveTo(-width / 2, 0);
      CTX.lineTo(0, -_size / 2);
      CTX.lineTo(width / 2, 0);
      CTX.lineTo(0, _size / 2);
      CTX.closePath();
      CTX.fill();
      CTX.restore();
    };

    return { draw };
  };

  const confettiPieces = new Array(amount)
    .fill()
    .map((_, index) =>
      _makeConfettiPiece(
        position
          ? position
          : { x: canvasWidth / 2 + index - amount / 2, y: canvasHeight / 2 },
        { x: index < amount / 2 ? -0.5 : 0.5, y: -1 }
      )
    );

  const twirlPieces = new Array(amount / 2)
    .fill()
    .map((_, index) =>
      _makeTwirlPiece(
        position
          ? position
          : { x: canvasWidth / 2 + index - amount / 2, y: canvasHeight / 2 },
        { x: index < amount / 2 ? -0.5 : 0.5, y: -1 }
      )
    );

  const draw = () => {
    if (!hasPlayedAudio) {
      audio.playConfetti();
      hasPlayedAudio = true;
    }
    confettiPieces.forEach((e) => e.draw());
    twirlPieces.forEach((e) => e.draw());
  };

  return { draw };
};
