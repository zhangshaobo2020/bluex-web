import LocalDateTimeInput from "@/components/controls/LocalDateTimeInput.vue"
import {Control} from "@/core/Types"

class LocalDateTimeControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}, id = undefined) {
        super({editor, area, value, onChange, nodeId, inputId}, id);
    }
}

export {LocalDateTimeControl, LocalDateTimeInput};