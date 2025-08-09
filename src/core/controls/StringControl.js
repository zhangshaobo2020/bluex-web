import StringInput from "@/components/controls/StringInput.vue"
import {Control} from "@/core/Types"

class StringControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}, id = undefined) {
        super({editor, area, value, onChange, nodeId, inputId}, id);
    }
}

export {StringControl, StringInput};