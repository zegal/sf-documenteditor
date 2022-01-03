import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { WCharacterFormat } from '../index';
import { HelperMethods } from '../editor/editor-helper';
/**
 * @private
 */
var TextHelper = /** @class */ (function () {
    function TextHelper(documentHelper) {
        this.paragraphMarkInfo = {};
        this.documentHelper = documentHelper;
        if (!isNullOrUndefined(documentHelper)) {
            this.context = documentHelper.containerContext;
        }
    }
    Object.defineProperty(TextHelper.prototype, "paragraphMark", {
        get: function () {
            return '¶';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextHelper.prototype, "lineBreakMark", {
        get: function () {
            return '↲';
        },
        enumerable: true,
        configurable: true
    });
    TextHelper.prototype.getEnSpaceCharacter = function () {
        return String.fromCharCode(8194);
    };
    TextHelper.prototype.repeatChar = function (char, count) {
        var text = '';
        for (var i = 0; i < count; i++) {
            text += char;
        }
        return text;
    };
    TextHelper.prototype.getParagraphMarkWidth = function (characterFormat) {
        return this.getParagraphMarkSize(characterFormat).Width;
    };
    TextHelper.prototype.getParagraphMarkSize = function (characterFormat) {
        var format = this.getFormatText(characterFormat);
        if (this.paragraphMarkInfo[format]) {
            return this.paragraphMarkInfo[format];
        }
        // Gets the text element's width;
        var width = this.getWidth(this.paragraphMark, characterFormat);
        // Calculate the text element's height and baseline offset.
        var textHelper = this.getHeight(characterFormat);
        var textSizeInfo = {
            'Width': width, 'Height': textHelper.Height, 'BaselineOffset': textHelper.BaselineOffset
        };
        return this.paragraphMarkInfo[format] = textSizeInfo;
    };
    TextHelper.prototype.getTextSize = function (elementBox, characterFormat) {
        // Gets the text element's width;
        var textTrimEndWidth = 0;
        var isRTL = characterFormat.bidi || this.isRTLText(elementBox.text);
        var text = this.setText(elementBox.text, isRTL, characterFormat.bdo);
        textTrimEndWidth = this.getWidth(text, characterFormat);
        elementBox.width = textTrimEndWidth;
        // Calculate the text element's height and baseline offset.
        var textHelper = this.getHeight(characterFormat);
        elementBox.height = textHelper.Height;
        elementBox.baselineOffset = textHelper.BaselineOffset;
        if (elementBox.text[elementBox.text.length - 1] === ' ') {
            textTrimEndWidth = this.getWidth(HelperMethods.trimEnd(elementBox.text), characterFormat);
        }
        elementBox.trimEndWidth = textTrimEndWidth;
        return textTrimEndWidth;
    };
    TextHelper.prototype.getHeight = function (characterFormat) {
        // Get character format property as  below predefined structure to make it easy to check and retrieve
        // Predefined static structure `[FontName];[FontSize];bold;italic` to maintain as key in the collection
        var key = this.getFormatText(characterFormat);
        if (!isNullOrUndefined(this.documentHelper.heightInfoCollection[key])) {
            return this.documentHelper.heightInfoCollection[key];
        }
        var sizeInfo = this.getHeightInternal(characterFormat);
        this.documentHelper.heightInfoCollection[key] = sizeInfo;
        return sizeInfo;
    };
    TextHelper.prototype.getFormatText = function (characterFormat) {
        var formatText = characterFormat.fontFamily.toLocaleLowerCase();
        formatText += ';' + characterFormat.fontSize;
        if (characterFormat.bold) {
            formatText += ';' + 'bold';
        }
        if (characterFormat.italic) {
            formatText += ';' + 'italic';
        }
        return formatText;
    };
    TextHelper.prototype.getHeightInternal = function (characterFormat) {
        var textHeight = 0;
        var baselineOffset = 0;
        var spanElement = document.createElement('span');
        spanElement.innerText = 'm';
        this.applyStyle(spanElement, characterFormat);
        var parentDiv = document.createElement('div');
        parentDiv.setAttribute('style', 'display:inline-block;position:absolute;');
        var tempDiv = document.createElement('div');
        tempDiv.setAttribute('style', 'display:inline-block;width: 1px; height: 0px;vertical-align: baseline;');
        parentDiv.appendChild(spanElement);
        parentDiv.appendChild(tempDiv);
        document.body.appendChild(parentDiv);
        // Sets the text element's height.
        textHeight = spanElement.offsetHeight;
        // Calculate the text element's baseline offset.
        var textTopVal = spanElement.offsetTop;
        var tempDivTopVal = tempDiv.offsetTop;
        // let width: number = (parentDiv.offsetWidth - spanElement.offsetWidth);
        // if ((textTopVal - width) === 1) {
        //     tempDivTopVal += width;
        // }
        baselineOffset = tempDivTopVal - textTopVal;
        document.body.removeChild(parentDiv);
        return { 'Height': textHeight, 'BaselineOffset': baselineOffset };
    };
    TextHelper.prototype.measureTextExcludingSpaceAtEnd = function (text, characterFormat) {
        return this.getWidth(HelperMethods.trimEnd(text), characterFormat);
    };
    TextHelper.prototype.getWidth = function (text, characterFormat) {
        if (text.match('\v')) {
            text.replace('\v', this.lineBreakMark);
        }
        var bold = '';
        var italic = '';
        var fontFamily = '';
        var fontSize = characterFormat.fontSize;
        bold = characterFormat.bold ? 'bold' : '';
        italic = characterFormat.italic ? 'italic' : '';
        fontFamily = characterFormat.fontFamily;
        fontSize = fontSize === 0 ? 0.5 : fontSize / (characterFormat.baselineAlignment === 'Normal' ? 1 : 1.5);
        this.context.font = bold + ' ' + italic + ' ' + fontSize + 'pt' + ' ' + fontFamily;
        if (characterFormat.allCaps) {
            text = text.toUpperCase();
        }
        return this.context.measureText(text).width;
    };
    TextHelper.prototype.setText = function (textToRender, isBidi, bdo, isRender) {
        if (isNullOrUndefined(isRender)) {
            isRender = false;
        }
        if (textToRender.length === 0) {
            return '';
        }
        var isRtlText = isBidi;
        if ((!isRtlText && (bdo === 'RTL')) || (isRtlText && (bdo === 'LTR'))) {
            textToRender = HelperMethods.reverseString(textToRender);
        }
        else if (isRender && isRtlText && HelperMethods.endsWith(textToRender)) {
            var spaceCount = textToRender.length - HelperMethods.trimEnd(textToRender).length;
            textToRender = HelperMethods.addSpace(spaceCount) + HelperMethods.trimEnd(textToRender);
        }
        return textToRender;
    };
    TextHelper.prototype.applyStyle = function (spanElement, characterFormat) {
        if (!isNullOrUndefined(spanElement) && !isNullOrUndefined(characterFormat)) {
            var style = 'white-space:nowrap;';
            if (characterFormat.fontFamily !== '') {
                style += 'font-family:' + characterFormat.fontFamily + ';';
            }
            var fontSize = characterFormat.fontSize;
            if (fontSize <= 0.5) {
                fontSize = 0.5;
            }
            style += 'font-size:' + fontSize.toString() + 'pt;';
            if (characterFormat.bold) {
                style += 'font-weight:bold;';
            }
            if (characterFormat.italic) {
                style += 'font-style:italic;';
            }
            spanElement.setAttribute('style', style);
        }
    };
    TextHelper.prototype.measureText = function (text, characterFormat) {
        // Gets the text element's width;
        var width = this.getWidth(text, characterFormat);
        // Calculate the text element's height and baseline offset.
        var textHelper = this.getHeight(characterFormat);
        return {
            'Width': width, 'Height': textHelper.Height, 'BaselineOffset': textHelper.BaselineOffset
        };
    };
    TextHelper.prototype.updateTextSize = function (elementBox, paragraph) {
        var format = new WCharacterFormat(undefined);
        var listCharacterFormat = elementBox.listLevel.characterFormat;
        var breakCharacterFormat = paragraph.characterFormat;
        format.fontSize = listCharacterFormat.fontSize === 11 ? breakCharacterFormat.fontSize : listCharacterFormat.fontSize;
        format.fontFamily = listCharacterFormat.fontFamily === 'Verdana' ? breakCharacterFormat.fontFamily
            : listCharacterFormat.fontFamily;
        var bold = '';
        var italic = '';
        var baselineAlignment = listCharacterFormat.baselineAlignment === 'Normal' ?
            breakCharacterFormat.baselineAlignment : listCharacterFormat.baselineAlignment;
        bold = listCharacterFormat.hasValue('bold') ? listCharacterFormat.bold ? 'bold' : '' : breakCharacterFormat.bold ? 'bold' : '';
        italic = listCharacterFormat.hasValue('italic') ? listCharacterFormat.italic ? 'italic' : ''
            : breakCharacterFormat.italic ? 'italic' : '';
        format.baselineAlignment = baselineAlignment;
        if (bold) {
            format.bold = true;
        }
        if (italic) {
            format.italic = true;
        }
        var isRTL = format.bidi || this.isRTLText(elementBox.text);
        var text = this.setText(elementBox.text, isRTL, format.bdo);
        elementBox.width = this.getWidth(text, format);
        // Calculate the text element's height and baseline offset.
        var textHelper = this.getHeight(format);
        elementBox.height = textHelper.Height;
        elementBox.baselineOffset = textHelper.BaselineOffset;
    };
    TextHelper.prototype.containsSpecialCharAlone = function (text) {
        /* eslint-disable */
        var specialChars = '*|.\:[]{}-`\;()@&$#%!~?' + ' ' + "'";
        for (var i = 0; i < text.length; i++) {
            if (specialChars.indexOf(text.charAt(i)) === -1) {
                return false;
            }
        }
        return true;
    };
    TextHelper.prototype.containsNumberAlone = function (text) {
        /* eslint-disable */
        var number = '0123456789';
        if (text === '') {
            return false;
        }
        for (var i = 0; i < text.length; i++) {
            if (number.indexOf(text.charAt(i)) === -1) {
                return false;
            }
        }
        return true;
    };
    TextHelper.prototype.inverseCharacter = function (ch) {
        switch (ch) {
            //Specify the '('
            case '(':
                //Specify the ')'
                return ')';
            //Specify the ')'
            case ')':
                //Specify the '('
                return '(';
            //Specify the '<'
            case '<':
                //Specify the '>'
                return '>';
            //Specify the '>'
            case '>':
                //Specify the '<'
                return '<';
            //Specify the '{'
            case '{':
                //Specify the '}'
                return '}';
            //Specify the '}'
            case '}':
                //Specify the '{'
                return '{';
            //Specify the '['
            case '[':
                //Specify the ']'
                return ']';
            //Specify the ']'
            case ']':
                //Specify the '['
                return '[';
            default:
                return ch;
        }
    };
    TextHelper.prototype.containsSpecialChar = function (text) {
        var specialChars = '*|.\:[]{}-`\;()@&$#%!~?' + ' ';
        for (var i = 0; i < text.length; i++) {
            if (specialChars.indexOf(text.charAt(i)) !== -1) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @param {string} text - Specifies the text
     * @returns {boolean} - Returns true if given text it right to left.
     */
    TextHelper.prototype.isRTLText = function (text) {
        var isRTL = false;
        if (!isNullOrUndefined(text)) {
            for (var i = 0; i < text.length; i++) {
                var temp = text[i];
                if ((temp >= '\u0590' && temp <= '\u05ff') //Hebrew characters
                    || (temp >= '\u0600' && temp <= '\u06ff') //Arabic - Urdu characters
                    || (temp >= '\u0750' && temp <= '\u077f') //Arabic - Urdu characters
                    || (temp >= '\u08a0' && temp <= '\u08ff') //Arabic characters
                    || (temp >= '\ufb50' && temp <= '\ufdff') //Arabic - Urdu characters
                    || (temp >= '\ufe70' && temp <= '\ufeff') //Arabic - Urdu characters
                    || (temp >= '\ua980' && temp <= '\ua9df') //Javanese characters
                    || (temp >= '\u0700' && temp <= '\u074f') //Syriac characters
                    || (temp >= '\u0780' && temp <= '\u07bf') //Thaana characters
                    || (temp >= '\u0840' && temp <= '\u085f') //Mandiac characters
                    || (temp >= '\u07c0' && temp <= '\u07ff') //N'Ko characters
                    || (temp >= '\u0800' && temp <= '\u083f') //Samaritan characters
                    //Tifinag characters 
                    || (temp >= '\u2d30' && temp <= '\u2d7f')) {
                    isRTL = true;
                    break;
                }
            }
        }
        return isRTL;
    };
    /**
     * @private
     * @param {string} text - Specifies the text
     * @returns {RtlInfo} - Returns the text info.
     */
    TextHelper.prototype.getRtlLanguage = function (text) {
        if (isNullOrUndefined(text) || text === '') {
            return { isRtl: false, id: 0 };
        }
        if (text >= '\u0590' && text <= '\u05ff') {
            return { isRtl: true, id: 1 };
            //Arabic - Urdu characters
        }
        else if ((text >= '\u0600' && text <= '\u06ff')
            || (text >= '\u0750' && text <= '\u077f')
            || (text >= '\u08a0' && text <= '\u08ff')
            || (text >= '\ufb50' && text <= '\ufdff')
            || (text >= '\ufe70' && text <= '\ufeff')) {
            return { isRtl: true, id: 2 };
        }
        else if (text >= '\ua980' && text <= '\ua9df') {
            return { isRtl: true, id: 3 };
        }
        else if (text >= '\u0700' && text <= '\u074f') {
            return { isRtl: true, id: 4 };
        }
        else if (text >= '\u0780' && text <= '\u07bf') {
            return { isRtl: true, id: 5 };
        }
        else if (text >= '\u0840' && text <= '\u085f') {
            return { isRtl: true, id: 6 };
        }
        else if (text >= '\u07c0' && text <= '\u07ff') {
            return { isRtl: true, id: 7 };
        }
        else if (text >= '\u0800' && text <= '\u083f') {
            return { isRtl: true, id: 8 };
        }
        else if (text >= '\u2d30' && text <= '\u2d7f') {
            return { isRtl: true, id: 9 };
        }
        return { isRtl: false, id: 0 };
    };
    TextHelper.prototype.destroy = function () {
        this.documentHelper = undefined;
        this.context = undefined;
        this.paragraphMarkInfo = {};
        this.paragraphMarkInfo = undefined;
    };
    return TextHelper;
}());
export { TextHelper };
