import DateInput from "@/components/controls/DateInput.vue"
import {Control} from "@/core/Types"

class DateControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}, id = undefined) {
        super({editor, area, value, onChange, nodeId, inputId}, id);
    }
}

export {DateControl, DateInput};