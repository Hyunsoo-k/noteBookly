import type { JSX } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import CreateOrEditPageHeader from "@/components/header/create-or-edit-page-heder";
import useToastPanel from "@/hooks/toast-panel/use-toast-panel";
import ToastPanel from "@/components/toast-panel";
import extendedTextAlign from "@/editor/extensions/extendedTextAlign";
import resizeAbleImageNode from "@/editor/nodes/resize-able-image-node";
import type { RequestPost } from "@/types/query";
import useCreatePostQuery from "@/hooks/query/post/use-create-post-query";
import uploadBase64Image from "@/supabase/upload-base64-to-supabase";
import EditorHeader from "@/components/editor/editor-header/editor-header";
import ContentEditorBox from "@/components/editor/content-editor/content-editor-box";

import styles from "./index.module.scss";

const CreatePostPage = (): JSX.Element => {
  const { toggleToastPanelActive } = useToastPanel();

  /**
   * wysiwyg 에디터 생성
   */
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "내용을 입력하세요",
      }),
      extendedTextAlign.configure({
        types: ["heading", "paragraph", "resizeAbleImageNode"],
      }),
      resizeAbleImageNode,
    ],
    content: "",
  });

  /**
   * react-hook-form 도구 생성
   */
  const formTools = useForm({
    mode: "onChange",
    defaultValues: {
      subTitle: null,
      thumbnailUrl: null,
      headerAlign: "left",
    }
  });

  /**
   * submit 핸들러 객체
   */
  const useCreatePostMutation = useCreatePostQuery();
  const submitHandler = {
    handleSubmit: async (watch: RequestPost): Promise<void> => {
      if (watch.thumbnailUrl) {
        watch.thumbnailUrl = await uploadBase64Image(watch.thumbnailUrl);
      }

      const $content = editor?.view.dom;
      if (!$content?.innerHTML) return toggleToastPanelActive("내용을 입력해 주세요.");
      if ($content) {
        const images = Array.from($content.querySelectorAll("img"));
        await Promise.all(images.map(async (img) => {
          const imageSrc = img.src;
          if (imageSrc.startsWith("data:image/")) {
            const imageUrl = await uploadBase64Image(imageSrc);
            img.src = imageUrl;
          }
        }));
      }
      const content = $content?.innerHTML;
      const requestBody = {
        writer: watch.writer,
        password: watch.password,
        thumbnailUrl: watch.thumbnailUrl,
        title: watch.title,
        subTitle: watch.subTitle,
        headerAlign: watch.headerAlign,
        content
      };
      useCreatePostMutation.mutate(requestBody);
    },

    handleSubmitError: (error: any): void => {
      const [, errorValue] = Object.entries(error)[0] as [string, Record<string, string>];
      toggleToastPanelActive(errorValue?.message);
    }
  }

  return (
    <FormProvider {...formTools}>
      <form
        onSubmit={formTools.handleSubmit(submitHandler.handleSubmit, submitHandler.handleSubmitError)}
        className={styles["create-post-page-component"]}
      >
        <CreateOrEditPageHeader />
        <ToastPanel />
        <EditorHeader />
        <ContentEditorBox editor={editor} />
      </form>
    </FormProvider>
  );
};

export default CreatePostPage;
