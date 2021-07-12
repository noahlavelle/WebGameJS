import EngineObject from './engineObject';
import GameManager from '../logic/gameManager';

export default class GameObject extends EngineObject {
    atttachedComponents: EngineObject[] = [];

    constructor() {
        super();

        GameManager.updateEvent.on('tick', () => this.Update);
        this.Update();
    }

    // Instances a component and attaches it as a child to a GameObject
    // The component must be an EngineObject
    AttachComponent(Ctor: { new(): any }): any {
        const component = new Ctor();
        if (component instanceof EngineObject) {
            this.atttachedComponents.push(component);
            return component;
        }

        return null;
    }

    Update() {
        for (const component of this.atttachedComponents) {
            component.transform = this.transform;
        }
    }
}