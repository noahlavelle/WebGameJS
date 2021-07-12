import { Vector2 } from "@graph-ts/vector2";

export default class Transform {
    position: Vector2 = { x: 0, y: 0 };
    rotation = 0;

    // Smoothly shifts a transform to a given finishing value
    Translate(startingTransform: Vector2, endingTransform: Vector2) {

    }
}