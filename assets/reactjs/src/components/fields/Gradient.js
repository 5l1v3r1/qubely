const { __ } = wp.i18n
import '../css/gradient.scss'
const { Component, Fragment } = wp.element
const { Dropdown, ColorPicker, Tooltip } = wp.components;
import Select from "./Select"
import GradientAngle from './GradientAngle'
import Range from "./Range"

const defaultState = { color1: '#16d03e', color2: '#1f91f3', type: 'linear', direction: '90', start: 5, stop: 80, radial: 'center', clip: false };

const colors = ['#30ac3d', '#fa9200', '#006fbf', '#ff1818', '#941f90']

const mm = '';

class Gradient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            enableGradient: false,
        }
    }

    componentWillMount() {
        this.props.onChange(Object.assign({}, defaultState, (this.props.clip ? { clip: this.props.clip } : {}), this.props.value))
    }

    setSettings(value, type) {
        this.props.onChange(Object.assign({}, this.props.value, { [type]: value }))
    }

    render() {
        const { value } = this.props
        return (
            <div className={"qubely-gradient qubely-field inline"}>

                <div className="qubely-field-gradient-preview qubely-mb-20" style={{ background: '-webkit-linear-gradient(' + (value.direction > 90 ? (90 - value.direction + 360) : 90 - value.direction) + 'deg,' + value.color1 + ' ' + value.start + '%, ' + value.color2 + ' ' + value.stop + '%' + ')', background: 'linear-gradient(' + value.direction + 'deg,' + value.color1 + ' ' + value.start + '%, ' + value.color2 + ' ' + value.stop + '%' + ')' }}>
                    <Dropdown
                        renderToggle={({ isOpen, onToggle }) => (
                            <Fragment>
                                <span className="qubely-color-picker-container qubely-position-left">
                                    <span className="qubely-color-picker" style={{ backgroundColor: value.color1 || '#cccccc' }} isPrimary onClick={onToggle} aria-expanded={isOpen} />
                                </span>
                            </Fragment>
                        )}
                        renderContent={() => (
                            <span>
                                <ColorPicker color={value.color1 || '#cccccc'} onChangeComplete={val => {
                                    if (val.rgb) {
                                        this.setSettings((val.rgb.a != 1 ? 'rgba(' + val.rgb.r + ', ' + val.rgb.g + ', ' + val.rgb.b + ', ' + val.rgb.a + ')' : val.hex), 'color1');
                                    }
                                }} />
                                <div className="qubely-rgba-palette" style={{ padding: '0px 0px 15px 15px' }}>
                                    {colors.map(
                                        color => <button style={{ color: color }} onClick={() => this.setSettings(color, 'color1')} />
                                    )}
                                </div>
                            </span>
                        )}
                    />

                    <Dropdown
                        renderToggle={({ isOpen, onToggle }) => (
                            <Fragment>
                                <span className="qubely-color-picker-container qubely-position-right">
                                    <span className="qubely-color-picker" style={{ backgroundColor: value.color2 || '#1f91f3' }} isPrimary onClick={onToggle} aria-expanded={isOpen} />
                                </span>
                            </Fragment>
                        )}
                        renderContent={() => (
                            <span>
                                <ColorPicker color={value.color2 || '#1f91f3'} onChangeComplete={val => {
                                    if (val.rgb) {
                                        this.setSettings((val.rgb.a != 1 ? 'rgba(' + val.rgb.r + ', ' + val.rgb.g + ', ' + val.rgb.b + ', ' + val.rgb.a + ')' : val.hex), 'color2');
                                    }
                                }} />
                                <div className="qubely-rgba-palette" style={{ padding: '0px 0px 15px 15px' }}>
                                    {colors.map(
                                        color => <button style={{ color: color }} onClick={() => this.setSettings(color, 'color2')} />
                                    )}
                                </div>
                            </span>
                        )}
                    />
                </div>

                <div className="qubely-d-flex qubely-align-center qubely-mb-20">
                    <div>{__('Gradient Type')}</div>
                    <div className="qubely-field-button-list qubely-ml-auto">
                        {
                            ['linear', 'radial'].map((data, index) => {
                                return (
                                    <button className={(value.type == data ? 'active' : '') + ' qubely-button'} key={index} onClick={() => this.setSettings(data, 'type')}>
                                        {data == 'linear' ?
                                            <Tooltip text={__('Linear')}>
                                                {(value.type == 'linear') ?
                                                    <svg width="18" height="17" viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a"><stop stop-color="#E7E8EB" offset="0%" /><stop stop-color="#2184F9" offset="100%" /></linearGradient></defs><g transform="translate(.526)" fill="none"><rect stroke="#2184F9" x=".5" y=".5" width="16" height="16" rx="2" /><rect fill="url(#a)" x="3.091" y="3.091" width="10.818" height="10.818" rx="1" /></g></svg>
                                                    :
                                                    <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b"><stop stop-color="#fff" offset="0%" /><stop stop-color="#D0D1D3" offset="100%" /></linearGradient></defs><g transform="translate(0 0)" fill="none"><rect stroke="#D0D1D3" x=".5" y=".5" width="16" height="16" rx="2" /><rect fill="url(#b)" x="3.091" y="3.091" width="10.818" height="10.818" rx="1" /></g></svg>
                                                }
                                            </Tooltip>
                                            :
                                            <Tooltip text={__('Radial')}>
                                                {(value.type == 'radial') ?
                                                    <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient fx="50%" fy="50%" r="49.832%" gradientTransform="matrix(0 1 -1.015 0 1.007 0)" id="c"><stop stop-color="#fff" offset="0%" /><stop stop-color="#2184F9" offset="100%" /></radialGradient></defs><g transform="translate(0 0)" fill="none"><rect stroke="#2184F9" x=".5" y=".5" width="16" height="16" rx="2" /><rect fill="#2184F9" x="3.091" y="3.091" width="10.818" height="10.818" rx="1" /><circle fill="url(#c)" cx="8.5" cy="8.5" r="5.409" /></g></svg>
                                                    :
                                                    <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient fx="50%" fy="50%" gradientTransform="matrix(0 1 -1.015 0 1.007 0)" id="d"><stop stop-color="#fff" offset="0%" /><stop stop-color="#D0D1D3" offset="100%" /></radialGradient></defs><g transform="translate(0 0)" fill="none"><rect stroke="#D0D1D3" x=".5" y=".5" width="16" height="16" rx="2" /><rect fill="#D0D1D3" x="3.091" y="3.091" width="10.818" height="10.818" rx="1" /><circle fill="url(#d)" cx="8.5" cy="8.5" r="5.409" /></g></svg>
                                                }
                                            </Tooltip>
                                        }
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>

                {value.type == 'radial' ?
                    <Select
                        label={__('Radial Pointer')}
                        className={(value.type && value.type == 'radial') ? 'half' : ''}
                        value={value.radial ? value.radial : 'center'}
                        options={['center', 'top left', 'top', 'top right', 'right', 'bottom right', 'bottom', 'bottom left', 'left']}
                        onChange={radial => this.setSettings(radial, 'radial')}
                    />
                    :
                    <Fragment>
                        {/* <Range
                            label={__('Gradient Angle')}
                            value={value.direction || 90}
                            onChange={direction => this.setSettings(direction, 'direction')}
                            min={0}
                            max={360}
                            step={1}
                            beforeIcon="image-rotate"
                            allowReset
                        /> */}
                        <GradientAngle
                            label={__('Gradient Angle')}
                            value={value.direction || 90}
                            onChange={value => this.setSettings(value, 'direction')}
                        />
                    </Fragment>


                }
                <Range
                    label={__('Color 1 Stop')}
                    value={value.start || 5}
                    onChange={start => this.setSettings(start, 'start')}
                    min={0}
                    max={100}
                    step={1}
                    beforeIcon="arrow-up-alt"
                    allowReset
                />
                <Range
                    label={__('Color 2 Start')}
                    value={value.stop || 80}
                    onChange={stop => this.setSettings(stop, 'stop')}
                    min={0}
                    max={100}
                    step={1}
                    beforeIcon="arrow-down-alt"
                    allowReset
                />
            </div>
        )
    }
}
export default Gradient;