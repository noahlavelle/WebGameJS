import GameManager from '../logic/gameManager';
import EngineObject from './engineObject';
import { LightenDarkenColor } from '../utils/colorManipulation';

interface ShapeDimentions {
    width: number;
    height: number;
    x: number;
    y: number;
}

type BasicShapeType = 'circle' | 'square';
type BasicShapeEffect = 'outline';

export default class BasicShape extends EngineObject {
    private color: string = '#000000';
    private strokeColor: string = '#000000';
    shapeType!: BasicShapeType;
    shapeEffects: BasicShapeEffect[] = [];
    shapeDimentions!: ShapeDimentions;
    outlineWidth: number = 5;

    constructor() {
        super();

        this.strokeColor = LightenDarkenColor(this.color, -60);
    }

    Update() {
        const { ctx } = GameManager;
        switch (this.shapeType) {
        case 'circle':
            this.RenderCircle(ctx);
            break;
        case 'square':
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
        this.Stroke();
    }

    RenderSquare(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.rect(this.transform.position.x - (this.shapeDimentions.width / 2),
            this.transform.position.y - (this.shapeDimentions.height / 2),
            this.shapeDimentions.width, this.shapeDimentions.height);
        ctx.fill();
        this.Stroke();
    }

    Stroke() {
        const { ctx } = GameManager;
        if (this.shapeEffects.includes('outline')) {
            ctx.lineWidth = this.outlineWidth;
            ctx.strokeStyle = this.strokeColor;
            ctx.stroke();
        }
    }

    SetColor(color: string): BasicShape {
        this.color = color;
        this.strokeColor = LightenDarkenColor(this.color, -70);
        return this;
    }

    SetShape(shapeType: BasicShapeType): BasicShape {
        this.shapeType = shapeType;
        return this;
    }

    SetEffects(effects: BasicShapeEffect[]): BasicShape {
        this.shapeEffects = effects;
        return this;
    }

    AddEfect(effect: BasicShapeEffect): BasicShape {
        this.shapeEffects.push(effect);
        return this;
    }

    SetOutlineWidth(outlineWidth: number): BasicShape {
        this.outlineWidth = outlineWidth;
        return this;
    }

    SetDimentions(dimentions: ShapeDimentions): BasicShape {
        this.transform.position.x = dimentions.x;
        this.transform.position.y = dimentions.y;
        this.shapeDimentions = dimentions;
        return this;
    }
}
