import { Vector2 } from '@graph-ts/vector2';
import EngineObject from './engineObject';

export default class GameObject extends EngineObject {
    atttachedComponents: EngineObject[] = [];

    constructor() {
        super();
        this.Update();
    }

    /**
     * Instances a component and attaches it as a child to a GameObject
     * @param component The component to attach
     */
    AttachComponent(component: EngineObject): EngineObject {
        component.rootObject = this;
        this.atttachedComponents.push(component);
        return component;
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