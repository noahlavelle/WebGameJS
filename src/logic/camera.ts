import { Vector2 } from '@graph-ts/vector2';
import Transform from '../objects/transform';
import EngineObject from '../objects/engineObject';
import GameManager from './gameManager';
import Lerp from '../utils/lerp';

export default class Camera extends EngineObject {
    /*
    The position of the camera will be subtracted from the position of engine objects
    This will give the effect of a moving camera
    Engine objects can also have a z value to create a parallax effect
    */
    public static transform: Transform = new Transform();
    public static followTarget: Transform = new Transform();
    public static cameraInstance: Camera;
    public static lerpTime = 0.05;

    public static StartTracking() {
        this.cameraInstance = new Camera();
    }

    Update() {
        const halfScreen: Vector2 = {
            x: GameManager.ctx.canvas.width / (2 / Camera.lerpTime),
            y: GameManager.ctx.canvas.height / (2 / Camera.lerpTime),
        };

        const newPosition: Vector2 = {
            x: Lerp(this.transform.position.x,
                Camera.followTarget.position.x, Camera.lerpTime) - halfScreen.x,
            y: Lerp(this.transform.position.y,
                Camera.followTarget.position.y, Camera.lerpTime) - halfScreen.y,
        };

        this.transform.position = Camera.transform.position = newPosition;
    }
} 