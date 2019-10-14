const { select } = wp.data
const { CssGenerator: { CssGenerator } } = wp.qubelyComponents

const endpoint = '/qubely/v1/save_block_css'

const API_fetch = (post_id, block_css) => {
    const json = JSON.stringify(block_css.interaction)
    return wp.apiFetch({
        path: endpoint,
        method: 'POST',
        data: { block_css: block_css.css, interaction: json, post_id }
    }).then(data => data)
}
/**
 * Parse css for stylesheet
 * Create css file for each post. Call api for update css file each time hit save button
 */
let __CSS = ''
let interaction = {}
function innerBlocks(blocks, type = false) {
    if (type == true) {
        __CSS = ''
        interaction = {}
        type = false
    }
    blocks.map(row => {
        const { attributes, name } = row
        const blockName = name.split('/')
        if (blockName[0] === 'qubely' && attributes.uniqueId) {
            __CSS += CssGenerator(attributes, blockName[1], attributes.uniqueId, true)

            if( typeof attributes['interaction'] !== 'undefined' ){
                const { while_scroll_into_view, mouse_movement } = attributes.interaction
                
                if( typeof while_scroll_into_view !== 'undefined' && while_scroll_into_view.enable === true ){
                    let {action_list} = while_scroll_into_view 
                    action_list = action_list.sort( (a, b) => a.keyframe - b.keyframe )
                    const interactionObj = { 
                        blockId: attributes.uniqueId, 
                        enable_mobile: typeof while_scroll_into_view.enable_mobile === 'undefined' ? false : while_scroll_into_view.enable_mobile, 
                        enable_tablet: typeof while_scroll_into_view.enable_tablet === 'undefined' ? false : while_scroll_into_view.enable_tablet,
                        animation: action_list
                    }
                    let origin = { 
                        x_offset: typeof while_scroll_into_view.transform_origin_x === 'undefined' ? 'center' : while_scroll_into_view.transform_origin_x, 
                        y_offset: typeof while_scroll_into_view.transform_origin_y === 'undefined' ? 'center' : while_scroll_into_view.transform_origin_y, 
                    }
                    interactionObj.origin = origin
                    if( typeof interaction.while_scroll_view === 'undefined' ){
                        interaction.while_scroll_view = [interactionObj]
                    }else{
                        interaction.while_scroll_view.push(interactionObj)
                    }
                }
                if( typeof mouse_movement !== 'undefined' && mouse_movement.enable === true ){
                    const interactionObj = {
                            blockId: attributes.uniqueId, 
                            enable_mobile: typeof while_scroll_into_view.enable_mobile === 'undefined' ? false : while_scroll_into_view.enable_mobile, 
                            enable_tablet: typeof while_scroll_into_view.enable_tablet === 'undefined' ? false : while_scroll_into_view.enable_tablet,
                            animation: mouse_movement,
                        }
                    if( typeof interaction.mouse_movement === 'undefined' ){
                        interaction.mouse_movement = [interactionObj]
                    }else{
                        interaction.mouse_movement.push(interactionObj)
                    }
                }
            }
        }
        if (row.innerBlocks && (row.innerBlocks).length > 0) {
            innerBlocks(row.innerBlocks)
        }
    })
    return {css: __CSS,interaction}
}

const ParseCss = (setDatabase = true) => {
    window.bindCss = true
    const { getBlocks, getCurrentPostId } = select('core/block-editor')
    let __blocks = { css: '', interaction:{} };
    if (typeof window.globalData != 'undefined') {
        __blocks.css += CssGenerator(window.globalData.settings, 'pagesettings', '8282882', true)
    }
    let parseData = innerBlocks( getBlocks(), true )
    __blocks.interaction = parseData.interaction
    __blocks.css += parseData.css
    if( __blocks.css !== '' ){
        localStorage.setItem('qubelyCSS', __blocks)
        if(setDatabase){
            API_fetch(getCurrentPostId(), __blocks).then( data => {} )
        }
    }
    setTimeout(() => {
        window.bindCss = false
    }, 1000)
}

export default ParseCss