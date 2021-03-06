import { Page, LineWidget, TextElementBox } from './page';
import { BaselineAlignment, Underline } from '../../index';
import { DocumentHelper } from './viewer';
import { Point } from '../editor/editor-helper';
import { SpellChecker } from '../spell-check/spell-checker';
/**
 * @private
 */
export declare class Renderer {
    isPrinting: boolean;
    private pageLeft;
    private pageTop;
    private documentHelper;
    private pageIndex;
    private pageCanvasIn;
    private isFieldCode;
    private leftPosition;
    private topPosition;
    private height;
    readonly pageCanvas: HTMLCanvasElement;
    readonly spellChecker: SpellChecker;
    private readonly selectionCanvas;
    private readonly pageContext;
    private readonly selectionContext;
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    renderWidgets(page: Page, left: number, top: number, width: number, height: number): void;
    private setPageSize;
    private renderHFWidgets;
    private renderHeaderSeparator;
    private getHeaderFooterType;
    renderDashLine(context: CanvasRenderingContext2D, x: number, y: number, width: number, fillStyle: string, isSmallDash: boolean): void;
    renderSolidLine(context: CanvasRenderingContext2D, x: number, y: number, width: number, fillStyle: string): void;
    private renderHeaderFooterMark;
    private renderHeaderFooterMarkText;
    private render;
    private renderFloatingItems;
    private renderShapeElementBox;
    private renderWidget;
    private renderLockRegionBorder;
    private renderHeader;
    private renderParagraphWidget;
    private renderfootNoteWidget;
    private renderTableWidget;
    private renderTableRowWidget;
    private renderTableCellWidget;
    private renderLine;
    private toSkipFieldCode;
    getUnderlineYPosition(lineWidget: LineWidget): number;
    private renderListTextElementBox;
    private getDefaultFontColor;
    private renderTextElementBox;
    private handleChangeDetectedElements;
    handleUnorderedElements(currentText: string, elementBox: TextElementBox, underlineY: number, iteration: number, markIndex: number, isLastItem?: boolean, beforeIndex?: number): void;
    renderWavyLine(elementBox: TextElementBox, left: number, top: number, underlineY: number, color: string, underline: Underline, baselineAlignment: BaselineAlignment, backgroundColor?: string): void;
    drawWavy(from: Point, to: Point, frequency: number, amplitude: number, step: number, color: string, height: number, backColor: string, negative?: number): void;
    private getTabLeader;
    private getTabLeaderString;
    private clipRect;
    private renderUnderline;
    private renderStrikeThrough;
    private renderImageElementBox;
    private renderTableOutline;
    private renderTableCellOutline;
    private renderCellBackground;
    private renderSingleBorder;
    getScaledValue(value: number, type?: number): number;
    private checkRevisionType;
    private getRevisionColor;
    private getRevisionType;
    /**
     * Destroys the internal objects which is maintained.
     *
     * @returns {void}
     */
    destroy(): void;
}
