import DoubleInput from "@/components/controls/DoubleInput.vue"
import {Control} from "@/core/Types"

class DoubleControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}) {
        super({editor, area, value, onChange, nodeId, inputId});
    }
}

export {DoubleControl, DoubleInput};