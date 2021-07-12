import Transform from './transform';

// The base class used for all objects that have a location on the canvas. These can be children of other EngineObjects
export default class EngineObject {
    transform: Transform = new Transform();
    // The EngineObject that signals are passed too (like when a collider detects a collision)
    rootObject: EngineObject = this;

    // These functions are called on the root object and get overriden in the GameObject where custom logic can be aplied
    OnCollision() { } // Called when a collider detects a collision.
    OnMouseOver() { } // Called when a collider is hovered
}