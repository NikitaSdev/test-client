import img from '@/src/assets/images/textEditorToolBarIcons/Paragraph.svg';
import { EditorState, Modifier } from 'draft-js';
import { FC, MouseEventHandler} from "react";
import Image from "next/image";

interface ParagraphButtonProps {
	editorState: EditorState;
	onChange: (editorState: EditorState) => void;
}

const ParagraphButton: FC<ParagraphButtonProps> = ({ editorState, onChange }) => {
	const insertNewline: MouseEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		const contentState = Modifier.insertText(
			editorState.getCurrentContent(),
			editorState.getSelection(),
			'\n'
		);
		onChange(EditorState.push(editorState, contentState, 'insert-characters'));
	};

	return (
		<div onClick={insertNewline} className={'rdw-link-wrapper'}>
			<div className={'rdw-option-wrapper'}>
				<Image src={img} alt={'Параграф'} draggable={false} ></Image>
			</div>
		</div>
	);
};


export default ParagraphButton;
