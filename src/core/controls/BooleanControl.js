import BooleanInput from "@/components/controls/BooleanInput.vue"
import {Control} from "@/core/Types"

class BooleanControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}) {
        super({editor, area, value, onChange, nodeId, inputId});
    }
}

export {BooleanControl, BooleanInput};