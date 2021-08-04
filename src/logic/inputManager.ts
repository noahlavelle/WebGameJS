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
        // Loops through action of the loaded json file
        for (const action of this.actions) {
            // Handles the action based on the value type
            switch (action.valueType) {
            // The four keys in the action are mapped onto a Vector2
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
        
                // If this vector is different to last frame, the actions method is invoked
                if (!(currentInputVector.x === inputVector.x
                        && currentInputVector.y === inputVector.y)) {
                    this.activeInputs[action.methodName] = inputVector;
                    this.rootObject[action.methodName](normal(inputVector));
                }
                break;
            case 'scalar':
                let actionStrength = 0;
                // Sets the action strength to the highest out of all the set keybinds
                for (const key of action.keys) {
                    const keyStrength = this.pressedKeys[key] ? 1 : 0;
                    actionStrength = keyStrength > actionStrength
                        ? keyStrength : actionStrength;
                }
                
                // If this value is different to last frame, the actions method is invoked
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