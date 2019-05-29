const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { Dropdown, Tooltip } = wp.components
import '../css/typography.scss'
import FontList from "./assets/FontList"
const { RichText } = wp.editor;
import { Range, Select, Toggle, Wrapper } from '../FieldRender'

class Typography extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showFontFamily: false,
            filterText: '',
            changeType: '',
            showFontFamiles: false,
            showFontWeights: false,
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        const { showFontFamiles, showFontWeights } = this.state
        if (showFontFamiles) {
            const qubelyFontFamilyWrapper = this.refs.qubelyFontFamilyWrapper
            const qubelySelectedFontFamily = this.refs.qubelySelectedFontFamily
            if (qubelyFontFamilyWrapper && !qubelyFontFamilyWrapper.contains(event.target)) {
                qubelySelectedFontFamily && !qubelySelectedFontFamily.contains(event.target) && this.setState({ showFontFamiles: false })
            }
        } else if (showFontWeights) {
            const qubelyFontWeightWrapper = this.refs.qubelyFontWeightWrapper
            const qubelySelectedFontWeight = this.refs.qubelySelectedFontWeight
            if (qubelyFontWeightWrapper && !qubelyFontWeightWrapper.contains(event.target)) {
                qubelySelectedFontWeight && !qubelySelectedFontWeight.contains(event.target) && this.setState({ showFontWeights: false })
            }
        }

    }

    _getWeight() {
        const { value } = this.props
        if (value && value.family) {
            return FontList.filter(o => { return o.n == value.family })[0].v
        } else {
            return [100, 200, 300, 400, 500, 600, 700, 800, 900];
        }
    }

    setSettings(type, val) {
        let prevValue = this.props.value
        if (type == 'family' && val) {
            val = { [type]: val, type: (FontList.filter(o => { return o.n == val })[0].f) }
        } else {
            val = { [type]: val }
        }
        this.props.onChange(Object.assign({}, prevValue, val))
    }
    findArrayIndex = (font) => {
        let index = 0
        let qubelyFonts = JSON.parse(localStorage.getItem('qubelyFonts'))
        while (index < 10) {
            if (qubelyFonts[index].n == font) {
                break
            }
            index++
        }
        return index
    }
    handleTypographyChange(val) {
        this.setSettings('family', val)

        let qubelyFonts = JSON.parse(localStorage.getItem('qubelyFonts'))
        let selectedFont = FontList.filter(font => font.n == val)

        if (qubelyFonts) {
            let oldFont = qubelyFonts.filter(font => font.n == val).length > 0
            if (oldFont) {
                let index = this.findArrayIndex(val)
                qubelyFonts.splice(index, 1)
                qubelyFonts.unshift(...selectedFont)
            } else {
                qubelyFonts.unshift(...selectedFont)
                qubelyFonts.length > 10 && qubelyFonts.pop()
            }

        } else {
            qubelyFonts = [...selectedFont]
        }

        localStorage.setItem('qubelyFonts', JSON.stringify(qubelyFonts))
    }
    render() {
        const { value, label, device, onDeviceChange } = this.props
        const { showFontFamiles, showFontWeights, filterText } = this.state
        let qubelyFonts = JSON.parse(localStorage.getItem('qubelyFonts'))
        let filteredFontList = [], newFontList = FontList
        if (qubelyFonts) {
            filteredFontList = FontList.filter(font => !qubelyFonts.filter(qubelyFont => qubelyFont.n == font.n).length > 0)
            newFontList = [...qubelyFonts, ...filteredFontList]
        }
        if (filterText.length >= 2) {
            newFontList = newFontList.filter(item =>
                item.n.toLowerCase().search(filterText.toLowerCase()) !== -1
            )
        }
        return (
            <div className="qubely-field qubely-field-typography">
                <Toggle
                    value={value.openTypography}
                    label={label || __('Typography')}
                    onChange={val => this.setSettings('openTypography', val)}
                />
                {(value && (value.openTypography == 1)) &&
                    <Fragment>
                        <Range
                            label={__('Font Size')}
                            value={value && value.size}
                            onChange={val => this.setSettings('size', val)}
                            min={8}
                            max={200}
                            step={1}
                            unit
                            responsive
                            device={device}
                            onDeviceChange={value => onDeviceChange(value)}
                        />

                        <div className="qubely-field-group qubely-65-35">
                            <div className="qubely-field qubely-field-font-family">
                                <label>{__('Font Family')}</label>
                                <div className="qubely-font-family-picker" ref="qubelySelectedFontFamily"
                                    onClick={() => { this.setState({ showFontFamiles: !showFontFamiles }) }
                                    }>
                                    <RichText
                                        tagName="span"
                                        className={`qubely-font-family-search${!showFontFamiles ? ' selected-font-family' : ''}`}
                                        placeholder={__(value.family || 'Search')}
                                        value={filterText}
                                        keepPlaceholderOnFocus
                                        onChange={value => this.setState({ filterText: value })}
                                    />
                                </div>
                            </div>
                            {
                                showFontFamiles && <div className="qubely-font-family-option-wrapper" ref="qubelyFontFamilyWrapper">
                                    <div className="qubely-font-family-options" >
                                        {newFontList.length > 0 ?
                                            newFontList.map((font, index) => {
                                                return (
                                                    <div className={`${font.n == value.family ? 'qubely-active-font-family' : 'qubely-font-family-option'}`}
                                                        id={`qubely-font-family-${index}`}
                                                        onClick={() => { this.setState({ showFontFamiles: false, filterText: '' }); this.handleTypographyChange(font.n) }}
                                                    >
                                                        {font.n}
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className={`qubely-font-family-option no-match`} onClick={() => this.setState({ showFontFamiles: false, filterText: '' })}  >  No matched font  </div>
                                        }
                                    </div>
                                </div>
                            }
                            <div className="qubely-field qubely-field-font-weight">
                                <label>{__('Weight')}</label>
                                <div className="qubely-font-weight-picker"
                                    ref="qubelySelectedFontWeight"
                                    onClick={() => this.setState({ showFontWeights: !showFontWeights })}>
                                    {value.weight ||'Select'}
                                </div>
                            </div>
                            {
                                showFontWeights && <div className="qubely-font-weight-wrapper" ref="qubelyFontWeightWrapper">
                                    <div className="qubely-font-family-weights" >
                                        {
                                            this._getWeight().map(font => {
                                                return (
                                                    <div
                                                        onClick={() => { this.setState({ showFontWeights: false }); this.setSettings('weight', font) }}
                                                        className={`${font == value.weight ? 'qubely-active-font-weight' : 'qubely-font-weight-option'}`}
                                                    >
                                                        {font}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            {/* <Select
                                direction={"right"}
                                label={__('Weight')}
                                value={value && value.weight}
                                clear
                                options={this._getWeight()}
                                onChange={val => this.setSettings('weight', val)}
                            /> */}
                        </div>

                        <Dropdown
                            className="qubely-field"
                            renderToggle={({ isOpen, onToggle }) => (
                                <div className="qubely-d-flex qubely-align-center">
                                    <label>{__('Advanced Typography')}</label>
                                    <div className="qubely-field-button-list qubely-ml-auto">
                                        <button className={(isOpen == 1 ? 'active' : '') + ' qubely-button qubely-button-rounded'} onClick={onToggle} aria-expanded={isOpen}>
                                            <i className="fas fa-cog" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            renderContent={() => (
                                <div style={{ padding: '15px' }}>
                                    {!this.props.disableLineHeight &&
                                        <Range
                                            label={__('Line Height')}
                                            value={value && value.height}
                                            onChange={val => this.setSettings('height', val)}
                                            min={8}
                                            max={200}
                                            step={1}
                                            unit
                                            responsive
                                            device={device}
                                            onDeviceChange={value => onDeviceChange(value)}
                                        />
                                    }
                                    <Range
                                        label={__('Letter Spacing')}
                                        value={value && value.spacing}
                                        onChange={val => this.setSettings('spacing', val)}
                                        min={-10}
                                        max={30}
                                        step={1}
                                        unit
                                        responsive
                                        device={device}
                                        onDeviceChange={value => onDeviceChange(value)}
                                    />
                                    <div className="qubely-d-flex qubely-align-center">
                                        <div>
                                            {__('Text Transform')}
                                        </div>
                                        <div className="qubely-field-button-list qubely-ml-auto">
                                            {
                                                ['none', 'capitalize', 'uppercase', 'lowercase'].map((data, index) => {
                                                    return (
                                                        <Tooltip text={data.charAt(0).toUpperCase() + data.slice(1)}>
                                                            <button className={(value.transform == data ? 'active' : '') + ' qubely-button'} key={index} onClick={() => this.setSettings('transform', data)}>
                                                                {data == 'none' &&
                                                                    <i class="fas fa-ban" />
                                                                }
                                                                {data == 'capitalize' &&
                                                                    <span>Aa</span>
                                                                }
                                                                {data == 'uppercase' &&
                                                                    <span>AA</span>
                                                                }
                                                                {data == 'lowercase' &&
                                                                    <span>aa</span>
                                                                }
                                                            </button>
                                                        </Tooltip>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </Fragment>
                }
            </div>
        )
    }
}
export default Typography