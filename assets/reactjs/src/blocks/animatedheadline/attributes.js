const {
    gloalSettings: {
        globalAttributes
    }
} = wp.qubelyComponents

export const attributes = {
    uniqueId: { type: 'string', default: '' },
    // Global
    ...globalAttributes,
    uniqueId: { type: 'string', default: '' },
    ...globalAttributes,  // Global Settings
    level: {
        type: 'number',
        default: 2
    },
    align: {
        type: 'string',
    },
    spacer: { type: 'object', default: { spaceTop: { md: '10', unit: 'px' }, spaceBottom: { md: '10', unit: 'px' } }, style: [{ selector: '{{QUBELY}}' }] },
    animatedText: { type: 'array', default: ['Apple', 'Banana', 'Orange'] },
    animationType: { type: 'string', default: 'blinds' },
    typography: {
        type: 'object',
        default: {
            openTypography: true,
            height: {
                md: "1.2",
                unit: "em"
            }
        },
        style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading .animated-heading-text' }]
    },
    textBorderRadius: {
        type: 'object',
        default: {
            openBorderRadius: 0,
            radiusType: 'global',
            global: { },
            unit: 'px',
        },
        style: [
            {
                selector: '{{QUBELY}}.qubely-block-animated-heading .qubely-animated-text'
            }
        ]
    },
    animatedTextTypography: {
        type: 'object',
        default: {},
        style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading .animated-text-words-wrapper' }]
    },
    titleBefore: {
        type: 'string',
        default: 'Before Text'
    },
    titleAfter: {
        type: 'string',
        default: 'After Text'
    },
    color: {
        type: 'string', default: '#000',
        style: [
            {

                selector: '{{QUBELY}}.qubely-block-animated-heading { color:{{color}}; }'
            }
        ]
    },
    barColor: {
        type: 'string', default: '#22b8f0',
        style: [
            {

                selector: '{{QUBELY}}.qubely-block-animated-heading .animated-heading-text.loading-bar .animated-text-words-wrapper::after { background:{{barColor}}; }'
            }
        ]
    },
    animatedTextColor: {
        type: 'object',
        default: {
            type: 'color',
            textColor: true,
            openColor: 1,
            color: '#2184F9',
            gradient: {
                color1: '#1066CC',
                color2: '#55cd37',
                direction: 0,
                start: 0,
                stop: 100
            }
        },
        style: [
            {

                selector: '{{QUBELY}}.qubely-block-animated-heading .animated-text-words-wrapper span'
            }
        ]
    },
    animatedTextBgColor: {
        type: 'object',
        default: {
            type: 'color',
            openColor: 0,
            color: '#eae212',
            gradient: {
                color1: '#1066CC',
                color2: '#55cd37',
                direction: 0,
                start: 0,
                stop: 100
            }
        },
        style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading .qubely-animated-text' }]
    },

    animatedTextPadding: {
        type: 'object',
        default: {
            openPadding: 0,
            paddingType: 'custom',
            global: { md: '5' },
            custom: { },
            unit: 'px'
        },
        style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading .qubely-animated-text' }]
    },
    animatedTextBorderRadius: {
        type: 'object',
        default: {
            radiusType: 'global',
            global: {},
            unit: 'px'
        },
        style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading .animated-text-words-wrapper' }]
    },
    border: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading' }] },
    bgBorderColorHover: { type: 'string', default: '', style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading:hover {border-color: {{bgBorderColorHover}};}' }] },

    bgShadow: { type: 'object', default: { openShadow: 0, horizontal: 1, vertical: 1, blur: 2, color: 'rgba(0, 0, 0, .2)', spread: 0 }, style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading' }] },
    bgShadowHover: { type: 'object', default: { color: '' }, style: [{ selector: '{{QUBELY}}.qubely-block-animated-heading:hover' }] },

    showGlobalSettings: {
        type: 'boolean',
        default: true
    },
    showContextMenu: {
        type: 'boolean',
        default: true
    }
};