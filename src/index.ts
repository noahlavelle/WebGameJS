import EngineObject from './objects/engineObject';
import GameObject from './objects/gameObject';
import UpdateManager from './logic/updateManager';

new GameObject();
UpdateManager.StartGame();

export {
    EngineObject,
    GameObject,
}
