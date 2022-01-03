import { WCharacterFormat } from '../index';
import { TextElementBox, ListTextElementBox, ParagraphWidget } from './page';
import { DocumentHelper } from './viewer';
import { RtlInfo } from '../editor/editor-helper';
import { BiDirectionalOverride } from '../../index';
/**
 * @private
 */
export interface TextSizeInfo {
    Height?: number;
    BaselineOffset?: number;
    Width?: number;
}
/**
 * @private
 */
export interface TextHeightInfo {
    [key: string]: TextSizeInfo;
}
/**
 * @private
 */
export declare class TextHelper {
    private documentHelper;
    private context;
    private paragraphMarkInfo;
    private readonly paragraphMark;
    private readonly lineBreakMark;
    getEnSpaceCharacter(): string;
    repeatChar(char: string, count: number): string;
    constructor(documentHelper: DocumentHelper);
    getParagraphMarkWidth(characterFormat: WCharacterFormat): number;
    getParagraphMarkSize(characterFormat: WCharacterFormat): TextSizeInfo;
    getTextSize(elementBox: TextElementBox, characterFormat: WCharacterFormat): number;
    getHeight(characterFormat: WCharacterFormat): TextSizeInfo;
    getFormatText(characterFormat: WCharacterFormat): string;
    getHeightInternal(characterFormat: WCharacterFormat): TextSizeInfo;
    measureTextExcludingSpaceAtEnd(text: string, characterFormat: WCharacterFormat): number;
    getWidth(text: string, characterFormat: WCharacterFormat): number;
    setText(textToRender: string, isBidi: boolean, bdo: BiDirectionalOverride, isRender?: boolean): string;
    applyStyle(spanElement: HTMLSpanElement, characterFormat: WCharacterFormat): void;
    measureText(text: string, characterFormat: WCharacterFormat): TextSizeInfo;
    updateTextSize(elementBox: ListTextElementBox, paragraph: ParagraphWidget): void;
    containsSpecialCharAlone(text: string): boolean;
    containsNumberAlone(text: string): boolean;
    inverseCharacter(ch: string): string;
    containsSpecialChar(text: string): boolean;
    /**
     * @private
     * @param {string} text - Specifies the text
     * @returns {boolean} - Returns true if given text it right to left.
     */
    isRTLText(text: string): boolean;
    /**
     * @private
     * @param {string} text - Specifies the text
     * @returns {RtlInfo} - Returns the text info.
     */
    getRtlLanguage(text: string): RtlInfo;
    destroy(): void;
}
