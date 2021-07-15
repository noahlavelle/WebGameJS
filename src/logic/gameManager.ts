import { EventEmitter } from 'events';

export default abstract class GameManager {
    public static updateEvent = new EventEmitter();
    private static canvas: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D;

    public static StartGame() {
        this.Tick();
    }

    public static SetRenderingCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = <CanvasRenderingContext2D>canvas?.getContext('2d');
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }

    private static Tick() {
        this.SetNextTick(() => this.Tick());
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();
        this.updateEvent.emit('tick');
    }

    private static SetNextTick(f: CallableFunction) {
        setTimeout(() => f(Date.now()));
    }
}