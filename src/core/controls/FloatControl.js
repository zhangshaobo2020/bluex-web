import FloatInput from "@/components/controls/FloatInput.vue"
import {Control} from "@/core/Types"

class FloatControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}, id = undefined) {
        super({editor, area, value, onChange, nodeId, inputId}, id);
    }
}

export {FloatControl, FloatInput};