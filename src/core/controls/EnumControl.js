import EnumInput from "@/components/controls/EnumInput.vue"
import {Control} from "@/core/Types"

class EnumControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId, properties}, id = undefined) {
        super({editor, area, value, onChange, nodeId, inputId, properties}, id);
    }
}

export {EnumControl, EnumInput};