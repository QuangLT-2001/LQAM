import React, { useRef, useState } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { TextareaEditorWrapper } from './style';
const TextareaEditor = (props) => {
     const { editorRef, textValue, onChange } = props;
     return (
          <TextareaEditorWrapper>
               <Editor
                    // onChange={onChange}
                    apiKey='rmtrvfmkabln5duveoh3j5yhdn32dcekqsahx1dfnwxwfuot'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={textValue}
                    init={{
                         height: 300,
                         menubar: true,
                         width: "100%",
                         plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "charmap",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "preview",
                              "image",
                              "wordcount",
                              "help",
                              "powerpaste",
                              "casechange",
                              "importcss",
                              "tinydrive",
                              "mediaembed",
                              "template",
                              "codesample",
                              "quickbars",
                              "emoticons"
                         ],
                         tinydrive_token_provider: 'URL_TO_YOUR_TOKEN_PROVIDER',
                         tinydrive_dropbox_app_key: 'YOUR_DROPBOX_APP_KEY',
                         tinydrive_google_drive_key: 'YOUR_GOOGLE_DRIVE_KEY',
                         tinydrive_google_drive_client_id: 'YOUR_GOOGLE_DRIVE_CLIENT_ID',
                         toolbar: `undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment`,
                         content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
               />
          </TextareaEditorWrapper>
     );
}
export default TextareaEditor