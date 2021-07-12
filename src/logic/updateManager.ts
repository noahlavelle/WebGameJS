import { EventEmitter } from 'events';

export default abstract class UpdateManager {
    public static updateEvent = new EventEmitter();

    public static StartGame() {
        this.Tick();
    }

    private static Tick() {
        this.SetNextTick(() => this.Tick());
        this.updateEvent.emit('tick');
    }

    private static SetNextTick(f: CallableFunction){
        setImmediate(()=>f(Date.now()))
      }
}