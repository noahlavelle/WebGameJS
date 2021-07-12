import { EventEmitter } from 'events';

export default abstract class GameManager {
    public static updateEvent = new EventEmitter();
    private static canvas: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D | null | undefined;

    public static StartGame() {
        this.Tick();
    }

    public static SetRenderingCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas?.getContext('2d');
    }

    private static Tick() {
        this.SetNextTick(() => this.Tick());
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateEvent.emit('tick');
    }

    private static SetNextTick(f: CallableFunction) {
        setTimeout(() => f(Date.now()));
    }
}