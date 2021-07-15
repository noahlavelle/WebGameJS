import Transform from '../objects/transform';
import EngineObject from '../objects/engineObject';
import GameManager from './gameManager';

export default class Camera extends EngineObject {
    /*
    The position of the camera will be subtracted from the position of engine objects
    This will give the effect of a moving camera
    Engine objects can also have a z value to create a parallax effect
    */
    public static transform: Transform = new Transform();
    public static followTarget: Transform = new Transform();
    public static cameraInstance: Camera;

    public static StartTracking() {
        this.cameraInstance = new Camera();
    }

    Update() {
        this.transform.position = {
            x: Camera.followTarget.position.x - GameManager.ctx.canvas.width / 2,
            y: Camera.followTarget.position.y - GameManager.ctx.canvas.height / 2,
        };
        Camera.transform = this.transform;
    }
} 