import TextAlign from '@tiptap/extension-text-align';

const extendedTextAlign = TextAlign.extend({
  addCommands() {
    return {
      toggleTextAlign:
        (alignment) =>
        ({ editor, commands }) => {
          if (editor.isActive('blockquote')) return true;

          const nodeType = editor.state.selection.$from.parent.type.name;

          return !editor.isActive({ textAlign: alignment })
            ? commands.updateAttributes(nodeType, { textAlign: alignment })
            : commands.resetAttributes(nodeType, ['textAlign']);
        }
    };
  },
});

export default extendedTextAlign;
