import {ClassicPreset} from "rete";

class Node extends ClassicPreset.Node {
    constructor(editor, area, label, meta = {}, id = undefined) {
        super(label);
        id && (this.id = id);
        this.editor = editor;
        this.area = area;
        this.meta = meta;
    }
}

class Connection extends ClassicPreset.Connection {
    constructor(source, sourceOutput, target, targetInput, id = undefined) {
        super(source, sourceOutput, target, targetInput);
        id && (this.id = id);
    }
}

class Socket extends ClassicPreset.Socket {
    constructor(name, color = "#000000") {
        super(name);
        this.color = color;
    }
}

class Input extends ClassicPreset.Input {
    constructor(socket, name, meta = {}, id = undefined) {
        super(socket, name, true);
        id && (this.id = id);
        this.meta = meta;
    }
}

class Output extends ClassicPreset.Output {
    constructor(socket, name, meta = {}, id = undefined) {
        super(socket, name, true);
        id && (this.id = id);
        this.meta = meta;
    }
}

class Control extends ClassicPreset.Control {
    constructor({editor, area, value, onChange, nodeId, inputId, properties = {}}, id = undefined) {
        super();
        id && (this.id = id);
        this.editor = editor;
        this.area = area;
        this.value = value;
        this.onChange = onChange;
        this.nodeId = nodeId;
        this.inputId = inputId;
        this.properties = properties;
    }
}

export {
    Node,
    Connection,
    Socket,
    Input,
    Output,
    Control
}