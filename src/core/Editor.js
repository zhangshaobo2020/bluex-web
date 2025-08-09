import Vue from "vue";

import {NodeEditor} from "rete";
import {AreaExtensions, AreaPlugin} from "rete-area-plugin";
import {ConnectionPlugin, Presets as ConnectionPresets,} from "rete-connection-plugin";
import {Presets, VuePlugin} from "rete-vue-plugin/vue2";

import {ContextMenuPlugin, Presets as ContextMenuPresets} from "rete-context-menu-plugin";

import {BooleanControl, BooleanInput} from "./controls/BooleanControl"
import {DoubleControl, DoubleInput} from "./controls/DoubleControl"
import {FloatControl, FloatInput} from "./controls/FloatControl"
import {IntegerControl, IntegerInput} from "./controls/IntegerControl"
import {LongControl, LongInput} from "./controls/LongControl"
import {StringControl, StringInput} from "./controls/StringControl"

import CustomNode from "@/components/graph/CustomNode.vue"
import SocketExec from "@/components/graph/SocketExec.vue";
import SocketParam from "@/components/graph/SocketParam.vue";
import ConnectionPath from "@/components/graph/ConnectionPath.vue";

import store from '@/store'
import {Input, Node, Output, Socket} from "@/core/Types"

import "@/assets/background.css";

const socket_exec = new Socket("SocketExec", "#ffffff");
// const socket_param = new Socket("SocketParam", "#ffffff");
// const socket_param_byte = new Socket("SocketParam", "#E67E22");
// const socket_param_short = new Socket("SocketParam", "#D35400");
const socket_param_integer = new Socket("SocketParam", "#F1C40F");
const socket_param_long = new Socket("SocketParam", "#B7950B");

const socket_param_float = new Socket("SocketParam", "#1ABC9C");
const socket_param_double = new Socket("SocketParam", "#16A085");
const socket_param_boolean = new Socket("SocketParam", "#E74C3C");
// const socket_param_character = new Socket("SocketParam", "#9B59B6");

const socket_param_string = new Socket("SocketParam", "#8E44AD");
// const socket_param_bigdecimal = new Socket("SocketParam", "#0E6655");
// const socket_param_date = new Socket("SocketParam", "#3498DB");
// const socket_param_localdatetime = new Socket("SocketParam", "#154360");

const socket_param_list = new Socket("SocketParam", "#0040ff");
const socket_param_map = new Socket("SocketParam", "#bb00ff");

const socket_param_object = new Socket("SocketParam", "#000000");

/**
 * 构造默认Editor
 */
function setupEditor(container) {
    const editor = new NodeEditor();
    const area = new AreaPlugin(container);
    const connection = new ConnectionPlugin();
    // const render = new VuePlugin();
    // 将store注入到VuePlugin中
    const render = new VuePlugin({
        setup(context) {
            return new Vue({...context, store});
        },
    });

    const initializeDefinitionContextMenu = initializeDefinition(editor, area);
    const contextMenu = new ContextMenuPlugin({
        items: ContextMenuPresets.classic.setup(initializeDefinitionContextMenu)
    });

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    render.addPreset(Presets.contextMenu.setup({delay: 50}));
    render.addPreset(
        Presets.classic.setup({
            customize: {
                node() {
                    return CustomNode;
                },
                connection() {
                    return ConnectionPath;
                },
                socket(context) {
                    if (context.payload.name === "SocketExec") {
                        return SocketExec;
                    }
                    if (context.payload.name === "SocketParam") {
                        return SocketParam;
                    }
                    return Presets.classic.Socket;
                },
                control(context) {
                    if (context.payload instanceof BooleanControl) {
                        return BooleanInput;
                    }
                    if (context.payload instanceof DoubleControl) {
                        return DoubleInput;
                    }
                    if (context.payload instanceof FloatControl) {
                        return FloatInput;
                    }
                    if (context.payload instanceof IntegerControl) {
                        return IntegerInput;
                    }
                    if (context.payload instanceof LongControl) {
                        return LongInput;
                    }
                    if (context.payload instanceof StringControl) {
                        return StringInput;
                    }
                }
            }
        })
    );

    connection.addPreset(ConnectionPresets.classic.setup());
    // 拦截连接事件
    connection.addPipe(context => {
        if (context.type === "connectioncreate") {
            const {source, sourceOutput, target, targetInput} = context.data
            const source_node = editor.getNode(source);
            const source_output = source_node.outputs[sourceOutput];
            const target_node = editor.getNode(target);
            const target_input = target_node.inputs[targetInput];
            // 判断引脚类型是否一致
            if (source_output.socket.name !== target_input.socket.name) return
            // 判断参数类型是否一致
            if (source_output.socket.name === "SocketParam"
                && target_input.socket.name === "SocketParam") {
                if (!checkIsSuperClass(
                    source_output.meta.typeDef.qualifiedName,
                    target_input.meta.typeDef.qualifiedName)
                ) return
                if (source_output.meta.typeDef.list
                    && target_input.meta.typeDef.list) {
                    if (!checkIsSuperClass(
                        source_output.meta.typeDef.generics[0].qualifiedName,
                        target_input.meta.typeDef.generics[0].qualifiedName)
                    ) return
                }
                if (source_output.meta.typeDef.map
                    && target_input.meta.typeDef.map) {
                    if (!checkIsSuperClass(
                            source_output.meta.typeDef.generics[0].qualifiedName,
                            target_input.meta.typeDef.generics[0].qualifiedName) ||
                        !checkIsSuperClass(
                            source_output.meta.typeDef.generics[1].qualifiedName,
                            target_input.meta.typeDef.generics[1].qualifiedName)
                    ) return
                }
            }
        }
        return context
    })

    editor.use(area);
    area.use(connection);
    area.use(render);
    area.use(contextMenu);

    const background = document.createElement("div");

    background.classList.add("background");
    background.classList.add("fill-area");

    area.area.content.add(background);

    AreaExtensions.simpleNodesOrder(area);
    // 阻止area进行默认缩放
    area.addPipe(context => {
        if (context.type === 'zoom' && context.data.source === 'dblclick') return
        return context
    })
    return {editor, area}
}

function checkIsSuperClass(sourceOutput, targetInput) {
    if (sourceOutput === targetInput) return true;
    return targetInput === "java.lang.Object";
}

function buildDefsTree(editor, area, arr) {
    const root = [];

    // 在 children 中查找节点，如果没有则创建
    function findOrCreateNode(children, name) {
        let node = children.find(([n]) => n === name);
        if (!node) {
            node = [name, []];
            children.push(node);
        }
        return node;
    }

    arr.forEach(def => {
        const parts = def.category.split("|");
        let current = root;

        parts.forEach((part, index) => {
            const isLeaf = index === parts.length - 1;
            if (isLeaf) {
                // 叶子节点绑定 customNode("完整路径")
                current.push([part, () => customNode(editor, area, def.qualifiedName)]);
            } else {
                const node = findOrCreateNode(current, part);
                current = node[1]; // 下钻到子数组
            }
        });
    });
    return root;
}

/**
 * TODO: 初始化control和function
 */
function initializeDefinition(editor, area) {
    const controlDefs = buildDefsTree(
        editor,
        area,
        Object.values(store.getters.controlDef).map(k => k)
    );
    const functionDefs = buildDefsTree(
        editor,
        area,
        Object.values(store.getters.functionDef).map(k => k)
    );
    return [...controlDefs, ...functionDefs];
}

// 构造输入参数控制
function buildInputParamControl(editor, area, node, param, id = undefined) {
    // TODO: 根据已有的id还原信息
    switch (param.typeDef.qualifiedName) {
        case "java.lang.Boolean": {
            const param_input = new Input(socket_param_boolean, param.name, param);
            node.addInput(param_input.id, param_input);
            const control_param_input = new BooleanControl({
                editor,
                area,
                value: false,
                onChange: function (value) {
                    this.value = value;
                },
                nodeId: node.id,
                inputId: param_input.id
            }, id);
            param_input.addControl(control_param_input);
            break;
        }
        case "java.lang.Double": {
            const param_input = new Input(socket_param_double, param.name, param);
            node.addInput(param_input.id, param_input);
            const control_param_input = new DoubleControl({
                editor,
                area,
                value: 0,
                onChange: function (value) {
                    this.value = value;
                },
                nodeId: node.id,
                inputId: param_input.id
            }, id);
            param_input.addControl(control_param_input);
            break;
        }
        case "java.lang.Float": {
            const param_input = new Input(socket_param_float, param.name, param);
            node.addInput(param_input.id, param_input);
            const control_param_input = new FloatControl({
                editor,
                area,
                value: 0,
                onChange: function (value) {
                    this.value = value;
                },
                nodeId: node.id,
                inputId: param_input.id
            }, id);
            param_input.addControl(control_param_input);
            break;
        }
        case "java.lang.Integer": {
            const param_input = new Input(socket_param_integer, param.name, param);
            node.addInput(param_input.id, param_input);
            const control_param_input = new IntegerControl({
                editor,
                area,
                value: 0,
                onChange: function (value) {
                    this.value = value;
                },
                nodeId: node.id,
                inputId: param_input.id
            }, id);
            param_input.addControl(control_param_input);
            break;
        }
        case "java.lang.Long": {
            const param_input = new Input(socket_param_long, param.name, param);
            node.addInput(param_input.id, param_input);
            const control_param_input = new LongControl({
                editor,
                area,
                value: 0,
                onChange: function (value) {
                    this.value = value;
                },
                nodeId: node.id,
                inputId: param_input.id
            }, id);
            param_input.addControl(control_param_input);
            break;
        }
        case "java.lang.String": {
            const param_input = new Input(socket_param_string, param.name, param);
            node.addInput(param_input.id, param_input);
            const control_param_input = new StringControl({
                editor,
                area,
                value: "",
                onChange: function (value) {
                    this.value = value;
                },
                nodeId: node.id,
                inputId: param_input.id
            }, id);
            param_input.addControl(control_param_input);
            break;
        }
        case "java.util.List": {
            const param_input = new Input(socket_param_list, param.name, param);
            node.addInput(param_input.id, param_input);
            // TODO: 需要实现List的输入控制
            break;
        }
        case "java.util.Map": {
            const param_input = new Input(socket_param_map, param.name, param);
            node.addInput(param_input.id, param_input);
            // TODO: 需要实现Map的输入控制
            break;
        }
        default: {
            // 走到这里就是自定义类型
            const param_input = new Input(socket_param_object, param.name, param);
            node.addInput(param_input.id, param_input);
            break;
        }
    }
}

// 构造输出参数控制
function buildOutputParamControl(editor, area, node, param) {
    switch (param.typeDef.qualifiedName) {
        case "java.lang.Boolean": {
            const data_output = new Output(socket_param_boolean, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
        case "java.lang.Double": {
            const data_output = new Output(socket_param_double, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
        case "java.lang.Float": {
            const data_output = new Output(socket_param_float, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
        case "java.lang.Integer": {
            const data_output = new Output(socket_param_integer, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
        case "java.lang.Long": {
            const data_output = new Output(socket_param_long, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
        case "java.lang.String": {
            const data_output = new Output(socket_param_string, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
        case "java.util.List": {
            const data_output = new Output(socket_param_list, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
        case "java.util.Map": {
            const data_output = new Output(socket_param_map, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
        default: {
            // 走到这里就是自定义类型
            const data_output = new Output(socket_param_object, param.name, param);
            node.addOutput(data_output.id, data_output);
            break;
        }
    }
}

/**
 * 根据FunctionDefinition构造节点
 */
function customNode(editor, area, qualifiedName) {
    if (qualifiedName.startsWith("CONTROL.")) {
        return createControlNode(editor, area, qualifiedName)
    } else {
        return createFunctionNode(editor, area, qualifiedName)
    }
}

function createControlNode(editor, area, qualifiedName) {
    // TODO: 根据已有的graphNode还原信息
    const def = store.getters.findControlDef(qualifiedName);
    // 创建节点
    const node = new Node(editor, area, qualifiedName, {...def, params: []});
    // Control节点的执行引脚
    for (let i = 0; i < def.inputExecDefs.length; i++) {
        const param = def.inputExecDefs[i];
        // 创建输入引脚
        const exec_input = new Input(socket_exec, param.name, param);
        node.addInput(exec_input.id, exec_input);
    }
    for (let i = 0; i < def.outputExecDefs.length; i++) {
        const param = def.outputExecDefs[i];
        // 创建输出引脚
        const exec_output = new Output(socket_exec, param.name, param);
        node.addOutput(exec_output.id, exec_output);
    }

    // Control节点的数据引脚
    for (let i = 0; i < def.inputParamDefs.length; i++) {
        buildInputParamControl(editor, area, node, def.inputParamDefs[i])
    }
    for (let i = 0; i < def.outputParamDefs.length; i++) {
        buildOutputParamControl(editor, area, node, def.outputParamDefs[i])
    }
    return node;
}

function createFunctionNode(editor, area, qualifiedName) {
    const def = store.getters.findFunctionDef(qualifiedName);
    // 创建节点
    const node = new Node(editor, area, qualifiedName, {...def});
    // Function节点的执行引脚：动态显示或隐藏
    if (def.executable) {
        const exec_input = new Input(socket_exec, "Exec", {});
        node.addInput(exec_input.id, exec_input);
        const exec_output = new Output(socket_exec, "Exec", {});
        node.addOutput(exec_output.id, exec_output);
    }

    // Function节点的数据引脚
    for (let i = 0; i < def.inputParamDefs.length; i++) {
        buildInputParamControl(editor, area, node, def.inputParamDefs[i])
    }
    for (let i = 0; i < def.outputParamDefs.length; i++) {
        buildOutputParamControl(editor, area, node, def.outputParamDefs[i])
    }
    return node;
}

function graphViewConverted(editor, area) {
    const rawNodes = editor.getNodes();
    const rawConnections = editor.getConnections();

    const nodes = rawNodes.map(node => {
        const position = area.nodeViews.get(node.id).position;
        const execInputs = {};
        const execOutputs = {};
        const paramInputs = {};
        const paramOutputs = {};
        for (const [pinId, input] of Object.entries(node.inputs)) {
            if (input.socket.name === "SocketExec") {
                execInputs[pinId] = {
                    id: input.id,
                    name: input.label
                };
            } else if (input.socket.name === "SocketParam") {
                paramInputs[pinId] = {
                    id: input.id,
                    name: input.label,
                    value: input.control?.value,
                };
            }
        }
        for (const [pinId, output] of Object.entries(node.outputs)) {
            if (output.socket.name === "SocketExec") {
                execOutputs[pinId] = {
                    id: output.id,
                    name: output.label
                };
            } else if (output.socket.name === "SocketParam") {
                paramOutputs[pinId] = {
                    id: output.id,
                    name: output.label
                };
            }
        }
        return {
            id: node.id,
            x: position.x,
            y: position.y,
            qualifiedName: node.meta.qualifiedName,
            signature: node.meta.signature,
            executable: node.meta.executable,
            execInputs: execInputs,
            execOutputs: execOutputs,
            paramInputs: paramInputs,
            paramOutputs: paramOutputs
        }
    })
    const connections = rawConnections.map(connection => {
        return {
            id: connection.id,
            source: connection.source,
            sourceOutput: connection.sourceOutput,
            target: connection.target,
            targetInput: connection.targetInput,
        }
    })
    return {nodes, connections};
}

export {
    setupEditor,
    graphViewConverted,
    customNode
}