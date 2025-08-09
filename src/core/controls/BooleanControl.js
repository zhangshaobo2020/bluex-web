import BooleanInput from "@/components/controls/BooleanInput.vue"
import {Control} from "@/core/Types"

class BooleanControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}, id = undefined) {
        super({editor, area, value, onChange, nodeId, inputId}, id);
    }
}

export {BooleanControl, BooleanInput};