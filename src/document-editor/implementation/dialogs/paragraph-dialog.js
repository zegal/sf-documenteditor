import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { createElement, L10n } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { WParagraphFormat } from '../index';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { Tab } from '@syncfusion/ej2-navigations';
/**
 * The Paragraph dialog is used to modify formatting of selected paragraphs.
 */
var ParagraphDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function ParagraphDialog(documentHelper) {
        var _this = this;
        //paragraph Format properties
        this.leftIndent = undefined;
        this.rightIndent = undefined;
        this.beforeSpacing = undefined;
        this.afterSpacing = undefined;
        this.textAlignment = undefined;
        this.firstLineIndent = undefined;
        this.lineSpacingIn = undefined;
        this.lineSpacingType = undefined;
        this.paragraphFormat = undefined;
        this.bidi = undefined;
        this.contextualSpacing = undefined;
        this.isStyleDialog = false;
        this.directionDiv = undefined;
        this.keepWithNextValue = undefined;
        this.keepLineTogetherValue = undefined;
        this.tabObj = undefined;
        /**
         * @private
         * @param {KeyboardEvent} event - Specifies the event args.
         * @returns {void}
         */
        this.keyUpParagraphSettings = function (event) {
            if (event.keyCode === 13) {
                _this.applyParagraphFormat();
            }
        };
        /**
         * @private
         * @param {KeyboardEvent} event - Specifies the event args.
         * @returns {void}
         */
        this.changeBeforeSpacing = function (event) {
            _this.beforeSpacing = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeAfterSpacing = function (event) {
            _this.afterSpacing = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeLeftIndent = function (event) {
            _this.leftIndent = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeRightIndent = function (event) {
            _this.rightIndent = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeLineSpacingValue = function (event) {
            _this.lineSpacingIn = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeFirstLineIndent = function (event) {
            _this.firstLineIndent = event.value;
            if (_this.special.index === 2) {
                _this.firstLineIndent = -(_this.firstLineIndent);
                _this.leftIndent = _this.leftIndentIn.value + event.value;
            }
        };
        /**
         * @private
         * @param {DropDownChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeByTextAlignment = function (args) {
            _this.textAlignment = args.value;
        };
        /**
         * @private
         * @param {ChangeArgs} event - Specifies change event args.
         * @returns {void}
         */
        this.changeBidirectional = function (event) {
            if (event.value === 'ltr') {
                _this.rtlButton.checked = !_this.ltrButton.checked;
                _this.bidi = false;
            }
            else {
                _this.ltrButton.checked = !_this.rtlButton.checked;
                _this.bidi = true;
            }
            _this.changeAlignmentByBidi();
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeContextualSpacing = function (args) {
            _this.contextualSpacing = args.checked;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeKeepWithNext = function (args) {
            _this.keepWithNextValue = args.checked;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeKeepLinesTogether = function (args) {
            _this.keepLineTogetherValue = args.checked;
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeByValue = function () {
            var paragraphFormat = _this.documentHelper.selection.paragraphFormat;
            switch (_this.special.index) {
                case 0:
                    if (paragraphFormat.firstLineIndent !== 0) {
                        _this.byIn.value = 0;
                        _this.leftIndent = _this.leftIndentIn.value;
                    }
                    break;
                case 1:
                    if (paragraphFormat.firstLineIndent === 0 || isNullOrUndefined(paragraphFormat.firstLineIndent)) {
                        _this.byIn.value = 0.1;
                    }
                    else if (paragraphFormat.firstLineIndent < 0) {
                        _this.byIn.value = -(paragraphFormat.firstLineIndent);
                        if (Math.abs(paragraphFormat.firstLineIndent) <= _this.leftIndent) {
                            _this.leftIndent = paragraphFormat.firstLineIndent + _this.leftIndent;
                        }
                    }
                    break;
                case 2:
                    if (paragraphFormat.firstLineIndent === 0 || isNullOrUndefined(paragraphFormat.firstLineIndent)) {
                        paragraphFormat.firstLineIndent = -0.1;
                    }
                    else if (paragraphFormat.firstLineIndent > 0) {
                        _this.byIn.value = (paragraphFormat.firstLineIndent);
                        if (!isNullOrUndefined(_this.leftIndent)) {
                            _this.leftIndent = _this.leftIndent + paragraphFormat.firstLineIndent;
                        }
                        else {
                            _this.leftIndent = paragraphFormat.firstLineIndent;
                        }
                    }
                    break;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeBySpacing = function () {
            if (isNullOrUndefined(_this.lineSpacing)) {
                return;
            }
            switch (_this.lineSpacing.index) {
                case 0:
                    _this.lineSpacingType = 'AtLeast';
                    _this.atIn.value = 12;
                    break;
                case 1:
                    _this.lineSpacingType = 'Exactly';
                    _this.atIn.value = 12;
                    break;
                case 2:
                    _this.lineSpacingType = 'Multiple';
                    _this.atIn.value = 1;
                    break;
            }
        };
        /* eslint-enable */
        /**
         * @private
         * @returns {void}
         */
        this.loadParagraphDialog = function () {
            if (_this.isStyleDialog) {
                _this.directionDiv.classList.add('e-de-disabledbutton');
            }
            else {
                _this.directionDiv.classList.remove('e-de-disabledbutton');
            }
            var selectionFormat;
            if (_this.paragraphFormat) {
                selectionFormat = _this.paragraphFormat;
            }
            else {
                selectionFormat = _this.documentHelper.selection.paragraphFormat;
            }
            var alignValue = _this.getAlignmentValue(selectionFormat.textAlignment);
            _this.alignment.index = alignValue;
            _this.beforeSpacingIn.value = selectionFormat.beforeSpacing;
            _this.afterSpacingIn.value = selectionFormat.afterSpacing;
            _this.leftIndentIn.value = selectionFormat.leftIndent;
            _this.rightIndentIn.value = selectionFormat.rightIndent;
            _this.byIn.value = Math.abs(selectionFormat.firstLineIndent);
            var lineSpaceValue = _this.lineSpacing.index;
            _this.keepWithNextValue = undefined;
            _this.keepLineTogetherValue = undefined;
            if (selectionFormat.firstLineIndent > 0) {
                _this.special.index = 1;
            }
            else if (selectionFormat.firstLineIndent < 0) {
                _this.special.index = 2;
                _this.leftIndentIn.value = selectionFormat.leftIndent - _this.byIn.value;
            }
            if (selectionFormat.lineSpacingType === 'AtLeast') {
                lineSpaceValue = 0;
            }
            else if (selectionFormat.lineSpacingType === 'Exactly') {
                lineSpaceValue = 1;
            }
            else {
                lineSpaceValue = 2;
            }
            _this.lineSpacing.index = lineSpaceValue;
            _this.atIn.value = selectionFormat.lineSpacing;
            if (_this.documentHelper.selection.caret.style.display !== 'none') {
                _this.documentHelper.selection.caret.style.display = 'none';
            }
            if (selectionFormat.bidi) {
                _this.rtlButton.checked = true;
                _this.ltrButton.checked = false;
            }
            else {
                _this.ltrButton.checked = true;
                _this.rtlButton.checked = false;
            }
            if (isNullOrUndefined(_this.keepWithNext)) {
                _this.keepWithNext.indeterminate = true;
            }
            else {
                _this.keepWithNext.checked = selectionFormat.keepWithNext;
            }
            if (isNullOrUndefined(_this.keepLinesTogether)) {
                _this.keepLinesTogether.indeterminate = true;
            }
            else {
                _this.keepLinesTogether.checked = selectionFormat.keepLinesTogether;
            }
            _this.contextSpacing.checked = selectionFormat.contextualSpacing;
        };
        /**
         * @private
         * @returns {void}
         */
        this.applyParagraphFormat = function () {
            var paraFormat;
            var isApply;
            if (_this.paragraphFormat) {
                paraFormat = _this.paragraphFormat;
                isApply = false;
            }
            else {
                paraFormat = new WParagraphFormat();
                isApply = true;
            }
            if (!isNullOrUndefined(_this.beforeSpacing)) {
                paraFormat.beforeSpacing = _this.beforeSpacing;
            }
            if (!isNullOrUndefined(_this.afterSpacing)) {
                paraFormat.afterSpacing = _this.afterSpacing;
            }
            if (!isNullOrUndefined(_this.lineSpacingType)) {
                paraFormat.lineSpacingType = _this.lineSpacingType;
            }
            if (!isNullOrUndefined(_this.leftIndent)) {
                paraFormat.leftIndent = _this.leftIndent;
            }
            if (!isNullOrUndefined(_this.rightIndent)) {
                paraFormat.rightIndent = _this.rightIndent;
            }
            if (!isNullOrUndefined(_this.lineSpacingIn)) {
                paraFormat.lineSpacing = _this.lineSpacingIn;
            }
            if (!isNullOrUndefined(_this.firstLineIndent)) {
                paraFormat.firstLineIndent = Math.abs(_this.firstLineIndent);
                if (_this.special.index === 2) {
                    paraFormat.firstLineIndent = -paraFormat.firstLineIndent;
                }
            }
            if (!isNullOrUndefined(_this.bidi)) {
                paraFormat.bidi = _this.bidi;
            }
            if (!isNullOrUndefined(_this.textAlignment)) {
                paraFormat.textAlignment = _this.textAlignment;
            }
            if (!isNullOrUndefined(_this.contextualSpacing)) {
                paraFormat.contextualSpacing = _this.contextualSpacing;
            }
            if (!isNullOrUndefined(_this.keepWithNextValue)) {
                paraFormat.keepWithNext = _this.keepWithNextValue;
            }
            else if (_this.documentHelper.selection.paragraphFormat.keepWithNext) {
                paraFormat.keepWithNext = _this.documentHelper.selection.paragraphFormat.keepWithNext;
            }
            if (!isNullOrUndefined(_this.keepLineTogetherValue)) {
                paraFormat.keepLinesTogether = _this.keepLineTogetherValue;
            }
            else if (_this.documentHelper.selection.paragraphFormat.keepLinesTogether) {
                paraFormat.keepLinesTogether = _this.documentHelper.selection.paragraphFormat.keepLinesTogether;
            }
            if (isApply) {
                _this.onParagraphFormat(paraFormat);
            }
            else {
                _this.documentHelper.owner.styleDialogModule.updateParagraphFormat();
            }
            _this.documentHelper.hideDialog();
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeParagraphDialog = function () {
            _this.leftIndent = undefined;
            _this.afterSpacing = undefined;
            _this.beforeSpacing = undefined;
            _this.firstLineIndent = undefined;
            _this.textAlignment = undefined;
            _this.rightIndent = undefined;
            _this.lineSpacingIn = undefined;
            _this.lineSpacingType = undefined;
            _this.paragraphFormat = undefined;
            _this.documentHelper.hideDialog();
        };
        this.documentHelper = documentHelper;
    }
    Object.defineProperty(ParagraphDialog.prototype, "owner", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @returns {string} Returns module name
     */
    ParagraphDialog.prototype.getModuleName = function () {
        return 'ParagraphDialog';
    };
    /* eslint-disable */
    /**
     * @private
     * @param {L10n} locale - Specifies the locale.
     * @returns {void}
     */
    ParagraphDialog.prototype.initParagraphDialog = function (locale) {
        var tabContainer = createElement('div');
        var ejtab = createElement('div');
        var instance = this;
        var ownerId = this.documentHelper.owner.containerId;
        var id = ownerId + '_paragraph_dialog';
        var indentContainer = createElement('div', { id: id, className: 'e-de-para-dlg-container' });
        this.target = tabContainer;
        tabContainer.appendChild(ejtab);
        var div = createElement('div', { id: 'property_div', styles: 'width:400px;' });
        var generalDiv = createElement('div', { id: 'genral_div', className: 'e-de-para-dlg-sub-container' });
        var genLabel = createElement('div', { id: ownerId + '_genLabel', className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('General') });
        var alignLabel = createElement('div', { id: ownerId + '_AlignLabel', className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('Alignment') });
        var alignment = createElement('select', {
            id: ownerId + '_Alignment',
            innerHTML: '<option value="Center">' + locale.getConstant('Center') +
                '</option><option value="Left">' + locale.getConstant('Left') +
                '</option><option value="Right">' + locale.getConstant('Right') +
                '</option><option value="Justify">' + locale.getConstant('Justify') + '</option>'
        });
        generalDiv.appendChild(genLabel);
        generalDiv.appendChild(alignLabel);
        generalDiv.appendChild(alignment);
        var dirLabel = createElement('div', {
            id: ownerId + '_DirLabel',
            className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('Direction')
        });
        this.directionDiv = createElement('div', { id: ownerId + '_DirDiv', styles: 'display:flex' });
        var rtlDiv = createElement('div', { id: ownerId + '_DirDiv', className: 'e-de-rtl-btn-div' });
        var rtlInputELe = createElement('input', { id: ownerId + '_rtlEle' });
        rtlDiv.appendChild(rtlInputELe);
        this.directionDiv.appendChild(rtlDiv);
        var isRtl = this.documentHelper.owner.enableRtl;
        if (isRtl) {
            rtlDiv.classList.add('e-de-rtl');
        }
        var ltrDiv = createElement('div', { id: ownerId + '_DirDiv', className: 'e-de-ltr-btn-div' });
        var ltrInputELe = createElement('input', { id: ownerId + '_ltrEle' });
        ltrDiv.appendChild(ltrInputELe);
        this.directionDiv.appendChild(ltrDiv);
        generalDiv.appendChild(dirLabel);
        generalDiv.appendChild(this.directionDiv);
        this.rtlButton = new RadioButton({
            label: locale.getConstant('Right-to-left'), enableRtl: isRtl,
            value: 'rtl', cssClass: 'e-small', change: this.changeBidirectional
        });
        this.rtlButton.appendTo(rtlInputELe);
        this.ltrButton = new RadioButton({
            label: locale.getConstant('Left-to-right'), enableRtl: isRtl,
            value: 'ltr', cssClass: 'e-small', change: this.changeBidirectional
        });
        this.ltrButton.appendTo(ltrInputELe);
        var indentionDiv = createElement('div', { id: 'indention_div', styles: 'width: 400px;', className: 'e-de-para-dlg-sub-container e-para-dlg-sub-height' });
        var indentLabel = createElement('div', {
            id: ownerId + '_indentLabel', className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('Indentation'), styles: 'float:top;position:relative'
        });
        indentionDiv.appendChild(indentLabel);
        var leftIndentionDiv = createElement('div', { id: 'left_indention', styles: 'float:left;position:relative;' });
        indentionDiv.appendChild(leftIndentionDiv);
        var rightIndentionDiv = createElement('div', { className: 'e-de-para-dlg-right-sub-container', styles: 'float:right;position:relative;' });
        indentionDiv.appendChild(rightIndentionDiv);
        var spacingDiv = createElement('div', { id: 'spacing_div' });
        var leftSpacingDiv = createElement('div', { id: 'left_spacing', styles: 'position:relative;' });
        spacingDiv.appendChild(leftSpacingDiv);
        var contextSpacingStyles = 'float:left';
        if (isRtl) {
            contextSpacingStyles = 'float:right;';
        }
        var contextSpacingDiv = createElement('div', { id: 'context_spacing', styles: contextSpacingStyles + 'position:relative;' });
        spacingDiv.appendChild(contextSpacingDiv);
        var rightSpacingDiv = createElement('div', { styles: 'display:inline-flex;' });
        spacingDiv.appendChild(rightSpacingDiv);
        var contextInputEle = createElement('input', {
            attrs: { type: 'checkbox' },
            id: ownerId + '_contextSpacing'
        });
        contextSpacingDiv.appendChild(contextInputEle);
        var beforeTextLabel = createElement('div', {
            id: ownerId + '_bfTextLabel',
            className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('Before text')
        });
        var leftIndent = createElement('input', { id: ownerId + '_leftIndent', attrs: { 'type': 'text' } });
        var specialLabel = createElement('div', { id: ownerId + '_specialLabel', className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('Special') });
        var special = createElement('select', {
            id: ownerId + '_special',
            innerHTML: '<option value="None">' + locale.getConstant('None') +
                '</option><option value="First Line">' + locale.getConstant('First line') +
                '</option><option value="Hanging">' + locale.getConstant('Hanging') + '</option> '
        });
        leftIndentionDiv.appendChild(beforeTextLabel);
        leftIndentionDiv.appendChild(leftIndent);
        leftIndentionDiv.appendChild(specialLabel);
        leftIndentionDiv.appendChild(special);
        var afterTextLabel = createElement('div', { id: ownerId + '_afTextLabel', className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('After text') });
        var rightIndent = createElement('input', { id: ownerId + '_rightIndent', attrs: { 'type': 'text' } });
        var byLabel = createElement('label', { id: ownerId + '_byLabel', className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('By') });
        var by = createElement('input', { id: ownerId + '_By', attrs: { 'type': 'text' } });
        rightIndentionDiv.appendChild(afterTextLabel);
        rightIndentionDiv.appendChild(rightIndent);
        rightIndentionDiv.appendChild(byLabel);
        rightIndentionDiv.appendChild(by);
        var spaceLabel = createElement('div', { innerHTML: locale.getConstant('Spacing'), className: 'e-de-para-dlg-heading', id: ownerId + '_spaceLabel' });
        var spacingWholeDiv = createElement('div', { id: ownerId + '_spacingWholeDiv', styles: 'display:inline-flex;' });
        var beforeSpacingWholeDiv = createElement('div', { id: ownerId + '_beforeSpacingWholeDiv' });
        var beforeLabel = createElement('div', { className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('Before'), id: ownerId + '_beforeLabel' });
        var beforeSpacing = createElement('input', { id: ownerId + '_beforeSpacing', attrs: { 'type': 'text' } });
        var afterSpacingWholeDiv = createElement('div', { id: ownerId + '_afterSpacingWholeDiv', className: 'e-de-para-dlg-spacing-div' });
        var afterLabel = createElement('div', { innerHTML: locale.getConstant('After'), className: 'e-de-dlg-sub-header', id: ownerId + '_afterLabel' });
        var afterSpacing = createElement('input', { id: ownerId + '_afterSpacing', attrs: { 'type': 'text' } });
        leftSpacingDiv.appendChild(spaceLabel);
        leftSpacingDiv.appendChild(spacingWholeDiv);
        beforeSpacingWholeDiv.appendChild(beforeLabel);
        beforeSpacingWholeDiv.appendChild(beforeSpacing);
        spacingWholeDiv.appendChild(beforeSpacingWholeDiv);
        afterSpacingWholeDiv.appendChild(afterLabel);
        afterSpacingWholeDiv.appendChild(afterSpacing);
        spacingWholeDiv.appendChild(afterSpacingWholeDiv);
        var lineSpacingDiv = createElement('div', { id: ownerId + '_lineSpacingWholeDiv' });
        var lineSpaceLabel = createElement('div', { id: ownerId + '_lineSpaceLabel', className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('Line Spacing') });
        var lineSpacing = createElement('select', {
            id: ownerId + '_lineSpacing', styles: 'width:180px;',
            innerHTML: '<option value="At least">' + locale.getConstant('At least') +
                '</option><option value="Exactly">' + locale.getConstant('Exactly') +
                '</option><option value="Multiple">' + locale.getConstant('Multiple') + '</option>'
        });
        var lineTypeDiv = createElement('div', { id: ownerId + '_lineTypeWholeDiv', className: 'e-de-para-dlg-spacing-div' });
        var atLabel = createElement('div', { innerHTML: locale.getConstant('At'), id: ownerId + '_atLabel', className: 'e-de-dlg-sub-header' });
        var lineSpacingAt = createElement('input', { id: ownerId + '_lineSpacingAt', attrs: { 'type': 'text' } });
        lineSpacingDiv.appendChild(lineSpaceLabel);
        lineSpacingDiv.appendChild(lineSpacing);
        rightSpacingDiv.appendChild(lineSpacingDiv);
        lineTypeDiv.appendChild(atLabel);
        lineTypeDiv.appendChild(lineSpacingAt);
        rightSpacingDiv.appendChild(lineTypeDiv);
        div.appendChild(generalDiv);
        div.appendChild(indentionDiv);
        div.appendChild(spacingDiv);
        indentContainer.appendChild(div);
        this.leftIndentIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1584, max: 1584, width: 180, enablePersistence: false, change: this.changeLeftIndent
        });
        this.leftIndentIn.appendTo(leftIndent);
        this.rightIndentIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1584, max: 1584, width: 180, enablePersistence: false, change: this.changeRightIndent
        });
        this.rightIndentIn.appendTo(rightIndent);
        this.byIn = new NumericTextBox({
            format: 'n1', value: 0, min: 0, max: 1584, width: 180, enablePersistence: false, change: this.changeFirstLineIndent
        });
        this.byIn.appendTo(by);
        this.beforeSpacingIn = new NumericTextBox({
            format: 'n1', value: 0, min: 0, max: 1584, width: 180, step: 6, enablePersistence: false,
            change: this.changeBeforeSpacing
        });
        this.beforeSpacingIn.appendTo(beforeSpacing);
        this.afterSpacingIn = new NumericTextBox({
            format: 'n1', value: 0, min: 0, max: 1584, width: 180, step: 6, enablePersistence: false,
            change: this.changeAfterSpacing
        });
        this.afterSpacingIn.appendTo(afterSpacing);
        this.atIn = new NumericTextBox({
            format: 'n1', value: 0, min: 1, max: 1584, width: 180, step: 0.5, enablePersistence: false, change: this.changeLineSpacingValue
        });
        this.special = new DropDownList({ change: this.changeByValue, width: 180, enableRtl: isRtl });
        this.special.appendTo(special);
        this.lineSpacing = new DropDownList({ change: this.changeBySpacing, width: '180px', enableRtl: isRtl });
        this.lineSpacing.appendTo(lineSpacing);
        this.alignment = new DropDownList({ width: 180, change: this.changeByTextAlignment, enableRtl: isRtl });
        this.alignment.appendTo(alignment);
        this.atIn.appendTo(lineSpacingAt);
        this.contextSpacing = new CheckBox({
            change: this.changeContextualSpacing,
            label: locale.getConstant("Contextual Spacing"),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.contextSpacing.appendTo(contextInputEle);
        indentContainer.addEventListener('keyup', instance.keyUpParagraphSettings);
        if (isRtl) {
            afterSpacingWholeDiv.classList.add('e-de-rtl');
            lineTypeDiv.classList.add('e-de-rtl');
        }
        var lineBreakContainer = createElement('div');
        var paginationDiv = createElement('div', { className: 'e-de-para-dlg-sub-container' });
        var paginationLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('Pagination') });
        paginationDiv.appendChild(paginationLabel);
        var keepNextContainer = createElement('div', { styles: 'display:block' });
        paginationDiv.appendChild(keepNextContainer);
        var keepLines = createElement('div', { styles: 'display:block' });
        paginationDiv.appendChild(keepLines);
        var keepWithNext = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        keepNextContainer.appendChild(keepWithNext);
        this.keepWithNext = new CheckBox({
            change: this.changeKeepWithNext,
            label: locale.getConstant('Keep With Next'),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.keepWithNext.appendTo(keepWithNext);
        var keepLinesTogether = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        keepLines.appendChild(keepLinesTogether);
        this.keepLinesTogether = new CheckBox({
            change: this.changeKeepLinesTogether,
            label: locale.getConstant('Keep Lines Together'),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.keepLinesTogether.appendTo(keepLinesTogether);
        lineBreakContainer.appendChild(paginationDiv);
        var items = [
            { header: { text: locale.getConstant('Indents and Spacing') }, content: indentContainer },
            { header: { text: locale.getConstant('Line and Page breaks') }, content: lineBreakContainer }
        ];
        this.tabObj = new Tab({ items: items, enableRtl: isRtl }, ejtab);
        this.tabObj.isStringTemplate = true;
    };
    ParagraphDialog.prototype.changeAlignmentByBidi = function () {
        if (this.textAlignment === 'Left') {
            this.textAlignment = 'Right';
        }
        else if (this.textAlignment === 'Right') {
            this.textAlignment = 'Left';
        }
        if (!isNullOrUndefined(this.textAlignment)) {
            this.alignment.index = this.getAlignmentValue(this.textAlignment);
        }
        else {
            if (this.alignment.index === 0) {
                this.textAlignment = 'Center';
            }
            else {
                this.textAlignment = 'Justify';
            }
        }
    };
    ParagraphDialog.prototype.getAlignmentValue = function (textAlignment) {
        var alignValue;
        if (textAlignment === 'Center') {
            alignValue = 0;
        }
        else if (textAlignment === 'Left') {
            alignValue = 1;
        }
        else if (textAlignment === 'Right') {
            alignValue = 2;
        }
        else {
            alignValue = 3;
        }
        return alignValue;
    };
    /**
     * Applies Paragraph Format
     *
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    ParagraphDialog.prototype.onParagraphFormat = function (paragraphFormat) {
        var selection = this.documentHelper.selection;
        var isListBidi = paragraphFormat.bidi && selection.paragraphFormat.listId !== -1;
        if (!isListBidi) {
            this.documentHelper.layout.isBidiReLayout = true;
        }
        this.documentHelper.owner.editor.setPreviousBlockToLayout();
        this.documentHelper.owner.editorModule.initHistory('ParagraphFormat');
        this.documentHelper.owner.isShiftingEnabled = true;
        if (this.documentHelper.selection.isEmpty) {
            this.documentHelper.owner.editorModule.applyParaFormatProperty(selection.start.paragraph, undefined, paragraphFormat, false);
            this.documentHelper.owner.editor.layoutItemBlock(selection.start.paragraph, false);
        }
        else {
            this.documentHelper.owner.editorModule.updateSelectionParagraphFormatting('ParagraphFormat', paragraphFormat, false);
        }
        this.documentHelper.owner.editorModule.reLayout(selection);
        if (!isListBidi) {
            this.documentHelper.layout.isBidiReLayout = false;
        }
    };
    /**
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    ParagraphDialog.prototype.show = function (paragraphFormat) {
        if (paragraphFormat) {
            this.isStyleDialog = true;
            this.paragraphFormat = paragraphFormat;
        }
        else {
            this.isStyleDialog = false;
        }
        var local = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        local.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initParagraphDialog(local);
        }
        this.loadParagraphDialog();
        this.documentHelper.dialog.header = local.getConstant('Paragraph');
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.buttons = [{
                click: this.applyParagraphFormat,
                buttonModel: { content: local.getConstant('Ok'), cssClass: 'e-flat e-para-okay', isPrimary: true }
            },
            {
                click: this.closeParagraphDialog,
                buttonModel: { content: local.getConstant('Cancel'), cssClass: 'e-flat e-para-cancel' }
            }];
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.close = this.documentHelper.updateFocus;
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
    };
    /**
     * @private
     * @returns {void}
     */
    ParagraphDialog.prototype.destroy = function () {
        if (this.afterSpacingIn) {
            this.afterSpacingIn.destroy();
            this.afterSpacingIn = undefined;
        }
        if (this.beforeSpacingIn) {
            this.beforeSpacingIn.destroy();
            this.beforeSpacingIn = undefined;
        }
        if (this.leftIndentIn) {
            this.leftIndentIn.destroy();
            this.leftIndentIn = undefined;
        }
        if (this.rightIndentIn) {
            this.rightIndentIn.destroy();
            this.rightIndentIn = undefined;
        }
        if (this.byIn) {
            this.byIn.destroy();
            this.byIn = undefined;
        }
        if (this.special) {
            this.special.destroy();
            this.special = undefined;
        }
        if (this.atIn) {
            this.atIn.destroy();
            this.atIn = undefined;
        }
        if (this.alignment) {
            this.alignment.change = undefined;
            this.alignment.destroy();
        }
        this.alignment = undefined;
        if (this.lineSpacing) {
            this.lineSpacing.change = undefined;
            this.lineSpacing.destroy();
        }
        this.lineSpacing = undefined;
        if (this.special) {
            this.special.change = undefined;
            this.special.destroy();
        }
        this.special = undefined;
        this.documentHelper = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var q = 0; q < this.target.childNodes.length; q++) {
                this.target.removeChild(this.target.childNodes[q]);
                q--;
            }
            this.target = undefined;
        }
    };
    return ParagraphDialog;
}());
export { ParagraphDialog };
