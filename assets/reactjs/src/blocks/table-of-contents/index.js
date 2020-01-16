import './style.scss';
import Edit from './Edit';
import Save from './save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('qubely/table-of-contents', {
    title: __('Table of Contents'),
    description: 'Organize page/post contents with Qubely Table of Contents',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-team.svg'} alt={__('Team Block')} />,
    category: 'qubely',
    supports: {
        align: ['center', 'wide', 'full'],
    },
    keywords: [
        __('Table of Contents'),
        __('Table'),
        __('Contents'),
        __('Qubely')
    ],
    example: {

    },
    attributes,
    edit: Edit,
    save: Save,
    // save: function (props) {
    //     return null
    // },
});