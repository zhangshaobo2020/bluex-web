function evaluateInputParamDefaultValue(paramName, savedJson) {
    if (savedJson) {
        return Object.values(savedJson.paramInputs)
            .find(item => item.name === paramName)?.value;
    }
}

function evaluateParamInputId(paramName, savedJson) {
    if (savedJson) {
        return Object.values(savedJson.paramInputs)
            .find(item => item.name === paramName)?.id;
    }
}

function evaluateExecInputId(paramName, savedJson) {
    if (savedJson) {
        return Object.values(savedJson.execInputs)
            .find(item => item.name === paramName)?.id;
    }
}

function evaluateInputControlId(paramName, savedJson) {
    if (savedJson) {
        return Object.values(savedJson.paramInputs)
            .find(item => item.name === paramName)?.controlId;
    }
}

function evaluateParamOutputId(paramName, savedJson) {
    if (savedJson) {
        return Object.values(savedJson?.paramOutputs)
            .find(item => item.name === paramName)?.id;
    }
}

function evaluateExecOutputId(paramName, savedJson) {
    if (savedJson) {
        return Object.values(savedJson?.execOutputs)
            .find(item => item.name === paramName)?.id;
    }
}

export {
    evaluateInputParamDefaultValue,
    evaluateParamInputId,
    evaluateExecInputId,
    evaluateInputControlId,
    evaluateParamOutputId,
    evaluateExecOutputId,
}