import { Vector2 } from '@graph-ts/vector2';
import EngineObject from './engineObject';
import Lerp from '../utils/lerp';

export default class GameObject extends EngineObject {
    atttachedComponents: EngineObject[] = [];

    constructor() {
        super();
        this.Update();
    }

    // Instances a component and attaches it as a child to a GameObject
    // The component must be an EngineObject
    AttachComponent(component: any): any {
        if (component instanceof EngineObject) {
            component.rootObject = this;
            this.atttachedComponents.push(component);
            return component;
        }

        return null;
    }

    Move(moveVector: Vector2, speed: number) {
        this.transform.position.x += (moveVector.x * speed);
        this.transform.position.y += (moveVector.y * speed);
    }

    Update() {
        for (const component of this.atttachedComponents) {
            component.transform = this.transform;
        }
    }
}