import FloatInput from "@/components/controls/FloatInput.vue"
import {Control} from "@/core/Types"

class FloatControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}) {
        super({editor, area, value, onChange, nodeId, inputId});
    }
}

export {FloatControl, FloatInput};