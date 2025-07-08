import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import ResizeAbleImageNodeView from "../../components/editor/node-views/resize-able-image-node-view";

const resizeAbleImageNode = Node.create({
  name: "resizeAbleImageNode",

  group: "block",

  draggable: true,

  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: "300px" },
      height: { default: "auto" },
    };
  },

  parseHTML() {
    return [{ tag: 'img[data-type="resizable-image"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(HTMLAttributes, {
        "data-type": "resizable-image",
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizeAbleImageNodeView);
  },
});

export default resizeAbleImageNode;
