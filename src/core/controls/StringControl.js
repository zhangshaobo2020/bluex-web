import StringInput from "@/components/controls/StringInput.vue"
import {Control} from "@/core/Types"

class StringControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}) {
        super({editor, area, value, onChange, nodeId, inputId});
    }
}

export {StringControl, StringInput};