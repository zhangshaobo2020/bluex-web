<template>
  <div ref="editorContainer" class="editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
  name: 'MonacoEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
    }
  },
  computed: {
    code() {
      return this.value;
    }
  },
  created() {
    const unwatch = this.$watch(
        function () {
          return this.code
        },
        function (newValue) {
          if (newValue) {
            if (this.editor) {
              const model = this.editor.getModel();
              if (model && model.getValue() !== this.code) {
                model.setValue(this.code);
              }
            }
            unwatch()
          }
        },
        {immediate: true}
    )
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.editor = monaco.editor.create(this.$refs.editorContainer, {
        value: this.code,
        language: 'java',
        tabSize: 2,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        readOnly: false
      });

      // 编辑器内容变化
      this.editor.onDidChangeModelContent(() => {
        this.$emit("input", this.editor.getValue());
      });

      // 失去焦点自动格式化
      this.editor.onDidBlurEditorText(() => {
        this.format();
      });
    },
    format() {
      this.editor.trigger('anything', 'editor.action.formatDocument');
    }
  }
}
</script>

<style scoped>
.editor {
  width: 100%;
  height: 550px;
}
</style>
