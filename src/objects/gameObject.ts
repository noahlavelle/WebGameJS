import EngineObject from './engineObject';

export default class GameObject extends EngineObject {
    atttachedComponents: EngineObject[] = [];

    constructor() {
        super();
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