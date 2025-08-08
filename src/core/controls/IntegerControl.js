import IntegerInput from "@/components/controls/IntegerInput.vue"
import {Control} from "@/core/Types"

class IntegerControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}) {
        super({editor, area, value, onChange, nodeId, inputId});
    }
}

export {IntegerControl, IntegerInput};