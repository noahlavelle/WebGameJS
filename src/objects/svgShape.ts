import EngineObject from './engineObject';
import GameManager from '../logic/gameManager';

export default class SvgShape extends EngineObject {
    image = new Image();

    constructor() {
        super();

        GameManager.updateEvent.on('tick', this.Render);
    }

    Render() {
        GameManager.ctx?.drawImage(this.image, this.transform.position.x,
            this.transform.position.y);
    }
}
