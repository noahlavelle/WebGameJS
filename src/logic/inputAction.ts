type ValueType = 'vector' | 'scalar';

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