import { ListLevelPattern, FootEndNoteNumberFormat } from '../../base/types';
import { FootNoteWidgetsInfo, WrapPosition } from '../editor/editor-helper';
import { WBorder, WBorders, WListFormat } from '../format/index';
import { WList } from '../list/list';
import { WListLevel } from '../list/list-level';
import { BlockContainer, BlockWidget, BodyWidget, CommentElementBox, ElementBox, FieldElementBox, HeaderFooterWidget, LineWidget, Page, ParagraphWidget, Rect, TableCellWidget, TableRowWidget, TableWidget, Widget, FootnoteElementBox, FootNoteWidget } from './page';
import { DocumentHelper, LayoutViewer, PageLayoutViewer } from './viewer';
/**
 * @private
 */
export declare class Layout {
    private documentHelper;
    private value;
    private islayoutFootnote;
    /**
     * @private
     */
    allowLayout: boolean;
    /**
     * @private
     */
    footHeight: number;
    /**
     * @private
     */
    footnoteHeight: number;
    /**
     * @private
     */
    isTableFootNote: boolean;
    /**
     * @private
     */
    isRelayout: boolean;
    isInitialLoad: boolean;
    private fieldBegin;
    private maxTextHeight;
    private maxBaseline;
    private maxTextBaseline;
    private isFieldCode;
    private isRtlFieldCode;
    private isRTLLayout;
    currentCell: TableCellWidget;
    isFootnoteContentChanged: boolean;
    isEndnoteContentChanged: boolean;
    private keepWithNext;
    /**
     * @private
     */
    startat: number;
    isLayoutWhole: boolean;
    /**
     * @private
     */
    isBidiReLayout: boolean;
    /**
     * @private
     */
    defaultTabWidthPixel: number;
    /**
     * @private
     */
    isRelayoutFootnote: boolean;
    private isRelayoutOverlap;
    private startOverlapWidget;
    private endOverlapWidget;
    private isWrapText;
    private isYPositionUpdated;
    private isXPositionUpdated;
    private hasFloatingElement;
    private isFootNoteLayoutStart;
    wrapPosition: WrapPosition[];
    private isSameStyle;
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    layout(): void;
    /**
     * Releases un-managed and - optionally - managed resources.
     *
     * @returns {void}
     */
    destroy(): void;
    layoutItems(sections: BodyWidget[], isReLayout: boolean): void;
    /**
     * @private
     */
    layoutComments(comments: CommentElementBox[]): void;
    private layoutSection;
    layoutHeaderFooter(section: BodyWidget, viewer: PageLayoutViewer, page: Page): void;
    updateHeaderFooterToParent(node: HeaderFooterWidget): HeaderFooterWidget;
    private updateRevisionsToHeaderFooter;
    private updateRevisionRange;
    private linkFieldInHeaderFooter;
    private linkFieldInParagraph;
    linkFieldInTable(widget: TableWidget): void;
    layoutHeaderFooterItems(viewer: LayoutViewer, widget: HeaderFooterWidget): HeaderFooterWidget;
    private shiftChildLocation;
    private shiftChildLocationForTableWidget;
    private shiftChildLocationForTableRowWidget;
    private shiftChildLocationForTableCellWidget;
    private layoutBlock;
    private updateTableYPositionBasedonTextWrap;
    private checkAndRelayoutPreviousOverlappingBlock;
    private addParagraphWidget;
    private addLineWidget;
    isFirstElementWithPageBreak(paragraphWidget: ParagraphWidget): boolean;
    /**
     * Layouts specified paragraph.
     *
     * @private
     * @param footnote
     */
    layoutfootNote(footnote: FootNoteWidget): BlockContainer;
    private layoutParagraph;
    private clearLineMeasures;
    private layoutFloatElements;
    private layoutShape;
    private moveElementFromNextLine;
    private layoutLine;
    private layoutElement;
    /**
    * @private
    */
    adjustPosition(element: ElementBox, bodyWidget: BlockContainer): void;
    private updateWrapPosition;
    private isFirstitemInPage;
    private isTextFitBelow;
    private isNeedToWrapForSquareTightAndThrough;
    private isNeedToWrapForSquareTightAndThroughForTable;
    private isNeedToWrapLeafWidget;
    private getMinWidth;
    private getNextTextRangeWidth;
    private isLeafWidgetNextSiblingIsTextRange;
    private isNextSibligSizeNeedToBeMeasure;
    private isNeedDoIntermediateWrapping;
    private isFloatingItemOnLeft;
    private getNextSibling;
    private adjustClientAreaBasedOnTextWrap;
    private adjustClientAreaBasedOnTextWrapForTable;
    private startAt;
    private layoutFootEndNoteElement;
    private layoutEndNoteElement;
    hasValidElement(paragraph: ParagraphWidget): boolean;
    private updateFieldText;
    private checkLineWidgetWithClientArea;
    private checkAndSplitTabOrLineBreakCharacter;
    private splitTextByConsecutiveLtrAndRtl;
    private isNumberNonReversingCharacter;
    private updateSplittedText;
    private moveFromNextPage;
    private cutClientWidth;
    private layoutFieldCharacters;
    private checkAndUpdateFieldData;
    private layoutEmptyLineWidget;
    private layoutListItems;
    private layoutList;
    private addBodyWidget;
    private addListLevels;
    private addSplittedLineWidget;
    private addElementToLine;
    private splitElementForClientArea;
    private splitByWord;
    private splitErrorCollection;
    private splitByCharacter;
    private updateRevisionForSpittedElement;
    private splitTextElementWordByWord;
    private splitTextForClientArea;
    private splitByLineBreakOrTab;
    private moveToNextLine;
    private checkInbetweenShapeOverlap;
    private getLineY;
    private updateLineWidget;
    private moveToNextPage;
    /**
     * Align block based on keep with next and keep lines together property.
     */
    private alignBlockElement;
    private getPreviousBlock;
    private splitRow;
    private splitParagraph;
    private updateClientPositionForBlock;
    private updateClientAreaForNextBlock;
    private layoutStartEndBlocks;
    private alignLineElements;
    private updateWidgetToPage;
    private shiftFooterChildLocation;
    private shiftFootnoteChildLocation;
    private checkPreviousElement;
    clearListElementBox(paragraph: ParagraphWidget): void;
    getListNumber(listFormat: WListFormat, isAutoList?: boolean): string;
    getListStartValue(listLevelNumber: number, list: WList): number;
    private updateListValues;
    private getListText;
    getAsLetter(number: number): string;
    getListTextListLevel(listLevel: WListLevel, listValue: number): string;
    getFootEndNote(numberFormat: FootEndNoteNumberFormat, value: number): string;
    private generateNumber;
    private getAsLeadingZero;
    getAsRoman(number: number): string;
    getListLevel(list: WList, listLevelNumber: number): WListLevel;
    private getTabWidth;
    private getRightTabWidth;
    private getSplitIndexByWord;
    private getTextSplitIndexByCharacter;
    private getSubWidth;
    private getSubWidthBasedOnTextWrap;
    private getSubWidthInfo;
    getBeforeSpacing(paragraph: ParagraphWidget): number;
    getAfterSpacing(paragraph: ParagraphWidget): number;
    getLineSpacing(paragraph: ParagraphWidget, maxHeight: number): number;
    private isParagraphFirstLine;
    private isParagraphLastLine;
    private getTextIndexAfterSpace;
    moveNextWidgetsToTable(tableWidget: TableWidget[], currentRow: TableRowWidget, moveFromNext: boolean): void;
    private addTableCellWidget;
    private addWidgetToTable;
    updateRowHeightBySpannedCell(tableWidget: TableWidget, row: TableRowWidget, insertIndex: number): void;
    private updateRowHeight;
    private updateSpannedRowCollection;
    private updateRowHeightByCellSpacing;
    private isRowSpanEnd;
    isVerticalMergedCellContinue(row: TableRowWidget): boolean;
    private splitWidgets;
    private getSplittedWidgetForRow;
    updateWidgetsToTable(tableWidgets: TableWidget[], rowWidgets: TableRowWidget[], row: TableRowWidget): void;
    getHeader(table: TableWidget): TableRowWidget;
    private getHeaderHeight;
    private updateWidgetToRow;
    private updateHeightForRowWidget;
    private updateHeightForCellWidget;
    getRowHeight(row: TableRowWidget, rowCollection: TableRowWidget[]): number;
    private splitSpannedCellWidget;
    private insertSplittedCellWidgets;
    private insertRowSpannedWidget;
    private insertEmptySplittedCellWidget;
    private getSplittedWidget;
    getListLevelPattern(value: number): ListLevelPattern;
    private createCellWidget;
    private createTableWidget;
    private getSplittedWidgetForPara;
    getSplittedWidgetForTable(bottom: number, tableCollection: TableWidget[], tableWidget: TableWidget): TableWidget;
    private isFirstLineFitForPara;
    isFirstLineFitForTable(bottom: number, tableWidget: TableWidget): boolean;
    private isFirstLineFitForRow;
    private isFirstLineFitForCell;
    private updateWidgetLocation;
    updateChildLocationForTable(top: number, tableWidget: TableWidget): void;
    updateChildLocationForRow(top: number, rowWidget: TableRowWidget): void;
    private updateChildLocationForCellOrShape;
    updateCellVerticalPosition(cellWidget: TableCellWidget, isUpdateToTop: boolean, isInsideTable: boolean): void;
    private updateCellContentVerticalPosition;
    private updateShapeInsideCell;
    private updateTableWidgetLocation;
    private getDisplacement;
    private getCellContentHeight;
    getTableLeftBorder(borders: WBorders): WBorder;
    getTableRightBorder(borders: WBorders): WBorder;
    getTableTopBorder(borders: WBorders): WBorder;
    getTableBottomBorder(borders: WBorders): WBorder;
    getCellDiagonalUpBorder(tableCell: TableCellWidget): WBorder;
    getCellDiagonalDownBorder(tableCell: TableCellWidget): WBorder;
    getTableWidth(table: TableWidget): number;
    layoutNextItemsBlock(blockAdv: BlockWidget, viewer: LayoutViewer, isFootnoteReLayout?: boolean): void;
    /**
     * Update the client area for the line widget.
     *
     * @param {LineWidget} startLineWidget LineWidget instance.
     * @private
     */
    updateClientAreaForLine(startLineWidget: LineWidget): void;
    getParentTable(block: BlockWidget): TableWidget;
    reLayoutParagraph(paragraphWidget: ParagraphWidget, lineIndex: number, elementBoxIndex: number, isBidi?: boolean, isSkip?: boolean): void;
    private getParentRow;
    private reLayoutRow;
    reLayoutTable(block: BlockWidget, isFootnoteReLayout?: boolean): void;
    private getYPosition;
    clearTableWidget(table: TableWidget, clearPosition: boolean, clearHeight: boolean, clearGrid?: boolean): void;
    clearRowWidget(row: TableRowWidget, clearPosition: boolean, clearHeight: boolean, clearGrid: boolean): void;
    clearCellWidget(cell: TableCellWidget, clearPosition: boolean, clearHeight: boolean, clearGrid: boolean): void;
    layoutBodyWidgetCollection(blockIndex: number, bodyWidget: Widget, block: BlockWidget, shiftNextWidget: boolean, isSkipShifting?: boolean): void;
    private checkAndGetBlock;
    layoutTable(table: TableWidget, startIndex: number): BlockWidget;
    addTableWidget(area: Rect, table: TableWidget[], create?: boolean): TableWidget;
    updateWidgetsToPage(tables: TableWidget[], rows: TableRowWidget[], table: TableWidget, endRowWidget?: TableRowWidget): void;
    updateHeightForTableWidget(tables: TableWidget[], rows: TableRowWidget[], tableWidget: TableWidget, endRowWidget?: TableRowWidget): void;
    layoutRow(tableWidget: TableWidget[], row: TableRowWidget, isRowLayout?: boolean): TableRowWidget;
    private getAdjacentRowCell;
    private addTableRowWidget;
    private getMaxTopCellMargin;
    private getMaxBottomCellMargin;
    private layoutCell;
    private updateTopBorders;
    shiftLayoutedItems(reLayout: boolean): void;
    updateFieldElements(): void;
    private reLayoutOrShiftWidgets;
    private isNeedToRelayout;
    private shiftWidgetsBlock;
    private shiftWidgetsForPara;
    /**
     * @private
     * Get the footnote of the block widget.
     *
     * @param {BlockWidget} widget BlockWidget instance.
     * @returns
     */
    getFootNotesOfBlock(widget: BlockWidget): FootnoteElementBox[];
    private getFootNotesWidgetsInLine;
    private getFootNoteWidgetsBy;
    /**
     * @param widget
     * @private
     */
    getFootNoteWidgetsOf(widget: BlockWidget): BlockWidget[];
    getFootNodeWidgetsToShiftToPage(paragraph: ParagraphWidget): FootNoteWidgetsInfo;
    shiftTableWidget(table: TableWidget, viewer: LayoutViewer, isClearHeight?: boolean): TableWidget;
    shiftRowWidget(tables: TableWidget[], row: TableRowWidget, isClearHeight?: boolean): TableRowWidget;
    shiftCellWidget(cell: TableCellWidget, maxCellMarginTop: number, maxCellMarginBottom: number, isClearHeight: boolean): void;
    shiftParagraphWidget(paragraph: ParagraphWidget): void;
    private shiftWidgetsForTable;
    private updateVerticalPositionToTop;
    private splitWidget;
    /**
     * @private
     * @param footnoteWidgets
     * @param fromBodyWidget
     * @param toBodyWidget
     */
    moveFootNotesToPage(footnoteWidgets: BlockWidget[], fromBodyWidget: BodyWidget, toBodyWidget: BodyWidget): void;
    private addEmptyFootNoteToBody;
    private getMaxElementHeight;
    private createOrGetNextBodyWidget;
    private isFitInClientArea;
    private isLineInFootNote;
    private shiftToPreviousWidget;
    private updateParagraphWidgetInternal;
    private shiftNextWidgets;
    updateContainerWidget(widget: Widget, bodyWidget: BodyWidget, index: number, destroyAndScroll: boolean): void;
    private getBodyWidgetOfPreviousBlock;
    moveBlocksToNextPage(block: BlockWidget): BodyWidget;
    private createSplitBody;
    reLayoutLine(paragraph: ParagraphWidget, lineIndex: number, isBidi: boolean, isSkip?: boolean): void;
    isContainsRtl(lineWidget: LineWidget): boolean;
    reArrangeElementsForRtl(line: LineWidget, isParaBidi: boolean): void;
    private shiftLayoutFloatingItems;
    private getFloatingItemPoints;
    private getLeftMarginHorizPosition;
    private getRightMarginHorizPosition;
    private getVerticalPosition;
    private getHorizontalPosition;
    private updateTableFloatPoints;
    private cropPosition;
    isTocField(element: FieldElementBox): boolean;
    private getTotalColumnSpan;
}
