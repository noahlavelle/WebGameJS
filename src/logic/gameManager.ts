import { EventEmitter } from 'events';

// This is the central game loop
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
        // Schedules the next frame. Doing it like this keeps animation smooth
        this.SetNextTick(() => this.Tick());

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();

        /* 
        Every EngineObject is subscribed to the tick event.
        This results in the Update & Render methods being called on everything each frame
        */
        this.updateEvent.emit('tick');
    }

    private static SetNextTick(f: CallableFunction) {
        setTimeout(() => f(Date.now()));
    }
}