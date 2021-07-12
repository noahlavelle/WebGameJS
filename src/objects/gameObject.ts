import EngineObject from './engineObject';
import UpdateManager from '../logic/updateManager';

export default class GameObject extends EngineObject {
    atttachedComponents: EngineObject[] = [];

    constructor() {
        super();

        UpdateManager.updateEvent.on('tick', this.Update);
    }

    // Instances a component and attaches it as a child to a GameObject. The component must be an EngineObject
    AttachComponent(ctor: { new(): any }): any {
        let component = new ctor();
        if (component instanceof EngineObject) {
            this.atttachedComponents.push(component);
            return component;
        }
    }

    Update() {
        console.log("Hello");
    }
}