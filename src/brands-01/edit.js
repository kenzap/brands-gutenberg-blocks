const { __ } = wp.i18n; 
const { Component } = wp.element;
const { MediaUpload, InspectorControls } = wp.editor;
const { RangeControl, PanelBody, Popover, TextControl, ToggleControl } = wp.components;
import { defaultItem, getStyles } from './block';
import { InspectorContainer, ContainerEdit } from '../commonComponents/container/container';

/**
 * Keys for new blocks
 * @type {number}
 */
let key = 0;

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * The "edit" property must be a valid function.
 * @param {Object} props - attributes
 * @returns {Node} rendered component
 */
export default class Edit extends Component {
    state = {
        activeSubBlock: -1,
    };

    /**
     * Add a new item to list with default fields
     */
    addItem = () => {
        key++;
        this.props.setAttributes( {
            items: [ ...this.props.attributes.items, {
                ...defaultItem,
                title: defaultItem.title + ' ' + ( key ),
                key: 'new ' + new Date().getTime(),
            } ],
        } );
    };

    /**
     * Change any property of item
     * @param {string} property - editable field
     * @param {string} value - for field
     * @param {number} index - of items array
     * @param {boolean} withMutation - in some cases we should avoid mutation for force rerender component
     */
    onChangePropertyItem = ( property, value, index, withMutation = false ) => {
        const items = withMutation ? [ ...this.props.attributes.items ] : this.props.attributes.items;
        if ( ! items[ index ] || typeof items[ index ][ property ] !== 'string' ) {
            return;
        }
        items[ index ][ property ] = value;
        this.props.setAttributes( { items: items } );
    };

    /**
     * Toggle state of any property of item
     * @param {string} property - editable field
     * @param {string} value - for field
     * @param {number} index - of items array
     * @param {boolean} withMutation - in some cases we should avoid mutation for force rerender component
     */
    onStatePropertyItem = ( property, index, withMutation = false ) => {
        const items = withMutation ? [ ...this.props.attributes.items ] : this.props.attributes.items;
        if ( ! items[ index ] || typeof items[ index ][ property ] !== 'string' ) {
            return;
        }
        if ( items[ index ][ property ] ) {
            items[ index ][ property ] = false;
        }else{
            items[ index ][ property ] = true;
        }
        this.props.setAttributes( { items: items } );
    };

    /**
     * Remove item
     * It also add default item if we remove all elements from array
     * @param {number} index - of item
     */
    removeItem = ( index ) => {
        const items = [ ...this.props.attributes.items ];
        if ( items.length === 1 ) {
            this.props.setAttributes( { items: [ defaultItem ] } );
        } else {
            items.splice( index, 1 );
            this.props.setAttributes( { items: items } );
        }
    };

    /**
     * Add Link item
     * Activate popup per each block
     * @param {number} index - of item
     */
    addLink = ( index ) => {

        const items = [ ...this.props.attributes.items ];
        if(!items[ index ].ilv){
            items[ index ].ilv = true;
            this.props.setAttributes( { items: items } );
        }
    };

    /**
     * Close Link item
     * Deactivate link item popup
     * @param {number} index - of item
     */
    closeLink = ( index ) => {

        const items = [ ...this.props.attributes.items ];
        items[ index ].ilv = false;
        for (var i = 0; i < items.length; i++) { 
            items[ index ].ilv = false;
        }
        this.props.setAttributes( { items: items } );
    };

    render() {
        const {
            className,
            attributes,
            setAttributes,
            isSelected,
        } = this.props;

        const { vars, kenzapContanerStyles } = getStyles( attributes );
        return (
            <div>
                <InspectorControls>
                    <PanelBody
                            title={ __( 'General', 'kenzap-pricing' ) }
                            initialOpen={ false }
                        >
                        <RangeControl
                            label={ __( 'Image size', 'kenzap-pricing' ) }
                            value={ attributes.iconSize }
                            onChange={ ( iconSize ) => setAttributes( { iconSize } ) }
                            min={ 50 }
                            max={ 250 }
                        />
                    </PanelBody>
                    <InspectorContainer
                        setAttributes={ setAttributes }
                        { ...attributes }
                        withPadding
                        withWidth100
                        withBackground
                    />
                </InspectorControls>
                <div className={ className ? className : '' }>
   
                    <ContainerEdit
                        className={ `kenzap-clients-1 block-${ attributes.blockUniqId } ${ isSelected ? 'selected' : '' } ` }
                        attributes={ attributes }
                        style={ {
                            ...vars,
                        } }
                        withBackground
                        withPadding
                    >
                    <div className="kenzap-container kenzap-sm" style={ kenzapContanerStyles }>
                        <ul>
                            { attributes.items && attributes.items.map( ( item, index ) => (
                                <li>
                                    <button className="remove" onClick={ () => this.removeItem( index ) }>
                                        <i className="dashicons dashicons-no" />
                                    </button>
                                    <a>
                                        <button className="link" onClick={ () => this.addLink( index ) }>
                                            <i className="dashicons dashicons-admin-links" />
                                        </button>
                                        { item.ilv && (
                                            <Popover
                                                className="link-popover" >
                                                <TextControl
                                                    label={ __( 'Specify Link' ) }
                                                    placeholder={ __( 'http://www.example.com' ) }
                                                    value={ item.link }
                                                    className="link-text"
                                                    onChange={ ( link ) => {
                                                        this.onChangePropertyItem( 'link', link, index, true );
                                                    } }
                                                />
                                                <ToggleControl
                                                    label={ __( 'Settings' ) }
                                                    help={ attributes.items[ index ].linknew ? __( 'Open link in new window.' ) : __( 'Open link in current window' ) } 
                                                    checked={ attributes.items[ index ].linknew }
                                                    onChange={ ( state ) => {
                                                        
                                                        
                                                        if(attributes.items[ index ].linknew){ 
                                                            attributes.items[ index ].linknew = false;
                                                            this.onChangePropertyItem( 'linknew', false, index, true );
                                                        }else{
                                                            attributes.items[ index ].linknew = true;
                                                            this.onChangePropertyItem( 'linknew', true, index, true );
                                                        }

                                                        //TODO forces ToggleControl to rerender 
                                                        this.closeLink( index );
                                                        this.addLink( index );
                                                    } }
                                                />
                                                <button className="link-close button button-large" onClick={ () => { this.closeLink( index ) } } >
                                                    { __( 'Save & Close' ) }
                                                </button>
                                            </Popover>
                                        ) }
                                        <MediaUpload
                                            onSelect={ ( media ) => {
                                                this.onChangePropertyItem( 'iconMediaId', media.id, index );
                                                this.onChangePropertyItem( 'iconMediaUrl', media.url, index, true );
                                                this.onChangePropertyItem( 'title', media.title, index, true );
                                            } }
                                            value={ item.iconMediaId }
                                            allowedTypes={ [ 'image', 'image/svg' ] }
                                            render={ ( props ) => (
                                                <img
                                                    src={ ( item.iconMediaUrl != '' ) ? item.iconMediaUrl : item.iconMediaUrl }
                                                    alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                                    style={ {
                                                        cursor: 'pointer',
                                                        position: 'relative',
                                                        width: attributes.iconSize + 'px' 
                                                    } }
                                                    onClick={ props.open }
                                                    role="presentation"
                                                />
                                            ) }
                                        />
                                    </a>
                                </li>
                            ) ) }
                        </ul>
                    </div>
                    <div className="editPadding"/> 
                    <button 
                        className="addWhite"
                        onClick={ this.addItem }>
                        <svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-insert" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"></path>
                        </svg>
                        <span className="" />{ __( 'Add new brand' ) }
                    </button>

                    </ContainerEdit>
                </div>
            </div>
        );
    }
}
