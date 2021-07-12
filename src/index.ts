import EngineObject from './objects/engineObject';
import GameObject from './objects/gameObject';
import GameManager from './logic/gameManager';
import SvgShape from './objects/svgShape';
import Transform from './objects/transform';

const Canvas = require('canvas');

global.Image = Canvas.Image;

export {
    EngineObject,
    GameObject,
    GameManager,
    SvgShape,
    Transform,
};