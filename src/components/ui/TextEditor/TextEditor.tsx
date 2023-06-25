import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { FC, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './TextEditor.module.scss';
import { BoldButton } from './Buttons/BoldButton';
import { LinkButton } from './Buttons/LinkButton';
import { OrderedButton } from './Buttons/OrderedButton';
import { UnderLineButton } from './Buttons/UnderLineButton';
import { ItalicButton } from './Buttons/ItalicButton';
import ParagraphButton from './Buttons/ParagraphButton';
import {randomUUID} from "crypto";

export interface ITextEditor {
	onChange: (...event: any[]) => void;
	value: string;
	label: string;
	placeholder: string;
}
const TextEditor: FC<ITextEditor> = ({
	onChange,
	value,
	placeholder,
	label
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [isUpdated, setIsUpdated] = useState(false);
	useEffect(() => {
		if (isUpdated) return;
		const defaultValue = value || '';
		const blocksFromHtml = htmlToDraft(defaultValue);
		const contentState = ContentState.createFromBlockArray(
			blocksFromHtml.contentBlocks,
			blocksFromHtml.entityMap
		);
		const newEditorState = EditorState.createWithContent(contentState);
		setEditorState(newEditorState);
	}, [value, isUpdated]);

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true);
		setEditorState(editorState);
		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};

	return (
		<div className={styles.editorWrapper}>
			<label>
				<span>{label}</span>
				<div>
					<Editor
						toolbarClassName={styles.toolbar}
						editorClassName={styles.editor}
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						spellCheck
						placeholder={placeholder}
						toolbarCustomButtons={[
							<ParagraphButton onChange={onChange} editorState={editorState} key={randomUUID()}/>
						]}
						toolbar={{
							options: ['blockType', 'inline', 'list', 'link'],
							inline: {
								inDropdown: false,
								className: undefined,
								component: undefined,
								dropdownClassName: undefined,
								options: ['bold', 'italic', 'underline'],
								bold: {
									icon: BoldButton
								},
								italic: {
									icon: ItalicButton
								},
								underline: {
									icon: UnderLineButton
								}
							},
							blockType: {
								inDropdown: false,
								options: []
							},
							link: {
								inDropdown: false,
								options: ['link'],
								link: {
									icon: LinkButton
								}
							},
							list: {
								inDropdown: false,
								options: ['ordered'],
								ordered: {
									icon: OrderedButton
								}
							}
						}}
					/>
				</div>
			</label>
		</div>
	);
};

export default TextEditor;
