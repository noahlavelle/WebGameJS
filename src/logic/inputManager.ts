import { normal, Vector2 } from '@graph-ts/vector2';
import EngineObject from '../objects/engineObject';
import InputAction from './inputAction';

export default class InputManager extends EngineObject {
    activeInputs: Object = {};
    pressedKeys: Object = {};
    actions: InputAction[] = [];

    constructor() {
        super();
        window.onkeyup = (e: KeyboardEvent) => { this.pressedKeys[e.key] = false; };
        window.onkeydown = (e: KeyboardEvent) => { this.pressedKeys[e.key] = true; };
    }

    SetActions(actionsFilePath: string): InputManager {
        fetch(actionsFilePath)
            .then((response) => response.json())
            .then((data: Object) => {
                // eslint-disable-next-line guard-for-in
                for (const i in data) {
                    this.actions.push(
                        new InputAction(data[i].keys, data[i].methodName, data[i].valueType),
                    );
                }
            });
        
        return this;
    }

    Update() {
        for (const action of this.actions) {
            switch (action.valueType) {
            case 'vector':
                const actionStrengths: number[] = [
                    this.pressedKeys[action.keys[0]] ? 1 : 0,
                    this.pressedKeys[action.keys[1]] ? 1 : 0,
                    this.pressedKeys[action.keys[2]] ? 1 : 0,
                    this.pressedKeys[action.keys[3]] ? 1 : 0,
                ];
        
                const currentInputVector: Vector2 = this.activeInputs[action.methodName]
                        || { x: 0, y: 0 };
                const inputVector: Vector2 = {
                    x: actionStrengths[3] - actionStrengths[2],
                    y: actionStrengths[1] - actionStrengths[0],
                };
        
                if (!(currentInputVector.x === inputVector.x
                        && currentInputVector.y === inputVector.y)) {
                    this.activeInputs[action.methodName] = inputVector;
                    this.rootObject[action.methodName](normal(inputVector));
                }
                break;
            case 'scalar':
                let actionStrength = 0;
                for (const key of action.keys) {
                    const keyStrength = this.pressedKeys[key] ? 1 : 0;
                    actionStrength = keyStrength > actionStrength
                        ? keyStrength : actionStrength;
                }
                
                if (actionStrength !== this.activeInputs[action.methodName]) {
                    this.activeInputs[action.methodName] = actionStrength;
                    this.rootObject[action.methodName](actionStrength);
                }
                break;
            default:
                break;
            }
        }
    }
}