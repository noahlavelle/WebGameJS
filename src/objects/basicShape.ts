import GameManager from '../logic/gameManager';
import { BasicShapeType } from '../properties/BasicShapeProperties';
import EngineObject from './engineObject';
import { LightenDarkenColor } from '../utils/colorManipulation';

interface ShapeDimentions {
    width: number;
    height: number;
    x: number;
    y: number;
}

export default class BasicShape extends EngineObject {
    private color: string = '#000000';
    private strokeColor: string = '#000000'
    shapeType: BasicShapeType;
    shapeDimentions: ShapeDimentions;

    constructor(shapeType: BasicShapeType, color: string,
        shapeDimentions: ShapeDimentions) {
        super();

        this.transform.position.x = shapeDimentions.x;
        this.transform.position.y = shapeDimentions.y;
        this.color = color;
        this.strokeColor = LightenDarkenColor(this.color, -60);
        this.shapeType = shapeType;
        this.shapeDimentions = shapeDimentions;
    }

    Update() {
        const { ctx } = GameManager;
        switch (this.shapeType) {
        case BasicShapeType.Circle:
            this.RenderCircle(ctx);
            break;
        case BasicShapeType.Square:
            this.RenderSquare(ctx);
            break;
        default:
            this.RenderCircle(ctx);
            break;
        }
    }

    RenderCircle(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.transform.position.x, this.transform.position.y,
            this.shapeDimentions.width / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
    }

    RenderSquare(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.fillRect(this.transform.position.x, this.transform.position.y,
            this.shapeDimentions.width, this.shapeDimentions.height);
    }

    SetColor(color: string): BasicShape {
        this.color = color;
        this.strokeColor = LightenDarkenColor(this.color, -60);
        return this;
    }
}
