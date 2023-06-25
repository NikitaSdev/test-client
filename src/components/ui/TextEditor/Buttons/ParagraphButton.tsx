import img from '../../../../../assets/images/textEditorToolBarIcons/Paragraph.svg';
import { EditorState, Modifier } from 'draft-js';

const ParagraphButton = ({ editorState, onChange }) => {
	const insertNewline = e => {
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
				<img src={img} alt={'Параграф'}></img>
			</div>
		</div>
	);
};

export default ParagraphButton;
