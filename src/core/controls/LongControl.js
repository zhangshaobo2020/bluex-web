import LongInput from "@/components/controls/LongInput.vue"
import {Control} from "@/core/Types"

class LongControl extends Control {
    constructor({editor, area, value, onChange, nodeId, inputId}, id = undefined) {
        super({editor, area, value, onChange, nodeId, inputId}, id);
    }
}

export {LongControl, LongInput};