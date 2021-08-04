type ValueType = 'vector' | 'scalar';

// Stores the data in the JSON "input actions" file that has been loaded
export default class InputAction {
    keys: string[];
    methodName: string;
    valueType: ValueType;

    constructor(keys: string[], methodName: string, valueType: ValueType) {
        this.keys = keys;
        this.methodName = methodName;
        this.valueType = valueType;
    }
}