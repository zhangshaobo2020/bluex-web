import IntegerInput from "@/components/controls/IntegerInput.vue"
import {Control} from "@/core/Types"

class IntegerControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}, id = undefined) {
        super({editor, area, value, onChange, nodeId, inputId}, id);
    }
}

export {IntegerControl, IntegerInput};