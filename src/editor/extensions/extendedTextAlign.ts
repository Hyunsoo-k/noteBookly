import TextAlign from '@tiptap/extension-text-align'

const extendedTextAlign = TextAlign.extend({
  addCommands() {
    return {
      toggleTextAlign:
        (alignment) =>
        ({ editor, commands, state }) => {
          const isInBlockquote = state.selection.$from.path.some((node: any | number) => {
            if (typeof node !== "number") {
              return node.type.name === 'blockquote';
            }
          });

          if (isInBlockquote) {
            return true;
          }

          const nodeType = state.selection.$from.parent.type.name;

          if (!editor.isActive({ textAlign: alignment })) {
            return commands.updateAttributes(nodeType, { textAlign: alignment });
          } else {
            return commands.resetAttributes(nodeType, ['textAlign']);
          }
        }
    }
  },
});

export default extendedTextAlign;