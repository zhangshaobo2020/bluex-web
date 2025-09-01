import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        primitiveDef: {},
        classDef: {},
        enumDef: {},
        controlDef: {},
        delegateDef: {},
        functionDef: {},
        generatedDef: {},
        entityDef: {}
    },
    getters: {
        primitiveDef(state) {
            return state.primitiveDef
        },
        findPrimitiveDef: (state) => (qualifiedName) => {
            return state.primitiveDef[qualifiedName]
        },

        classDef(state) {
            return state.classDef
        },
        findClassDef: (state) => (qualifiedName) => {
            return state.classDef[qualifiedName]
        },

        enumDef(state) {
            return state.enumDef
        },
        findEnumDef: (state) => (qualifiedName) => {
            return state.enumDef[qualifiedName]
        },

        controlDef(state) {
            return state.controlDef
        },
        findControlDef: (state) => (qualifiedName) => {
            return state.controlDef[qualifiedName]
        },

        delegateDef(state) {
            return state.delegateDef
        },
        findDelegateDef: (state) => (qualifiedName) => {
            return state.delegateDef[qualifiedName]
        },

        functionDef(state) {
            return state.functionDef
        },
        findFunctionDef: (state) => (qualifiedName) => {
            return state.functionDef[qualifiedName]
        },

        generatedDef(state) {
            return state.generatedDef
        },
        findGeneratedDef: (state) => (qualifiedName) => {
            return state.generatedDef[qualifiedName]
        },

        entityDef(state) {
            return state.entityDef
        },
        findEntityDef: (state) => (qualifiedName) => {
            return state.entityDef[qualifiedName]
        },

        // 匹配执行节点
        matchExecNodeDef: (state) => (qualifiedName) => {
            return state.generatedDef[qualifiedName]
        },
    },
    mutations: {
        overrideGraphDefs(state, defs) {
            state.primitiveDef = defs.primitiveDef;
            state.classDef = defs.classDef;
            state.enumDef = defs.enumDef;
            state.controlDef = defs.controlDef;
            state.delegateDef = defs.delegateDef;
            state.functionDef = defs.functionDef;
            state.generatedDef = defs.generatedDef;
            state.entityDef = defs.entityDef;
        }
    },
    actions: {},
    modules: {}
})
