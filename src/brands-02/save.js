const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;

import { defaultItem, getStyles } from './block';
import { blockProps, ContainerSave } from '../commonComponents/container/container';

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
        setTimeout( () => {
            const element = document.querySelector( '.owl-carousel' );
            element.scrollLeft = element.scrollWidth;
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
     * Set active sub block to edit icon
     * @param {number} index from sub block array
     */
    setActiveSubBlock = ( index ) => {
        if ( this.state.activeSubBlock !== index ) {
            this.setState( { activeSubBlock: index } );
        }
    };

    /**
     * Set active sub block to edit icon
     * @param {number} width from sub block array
     */
    mediaQueries = ( width ) => {

        if ( width < 480 ) { return 'kenzap-xs'; }
        if ( width < 768 ) { return 'kenzap-sm'; }
        if ( width < 992 ) { return 'kenzap-md'; }
        return '';
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

    render() {
        const {
            className,
            attributes,
            setAttributes,
            isSelected,
        } = this.props;

        const { vars, kenzapContanerStyles } = getStyles( attributes );
        return (

            <div className={ className ? className : '' }>
                <ContainerSave
                    className={ `kenzap-clients-2 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                >
                    <div 
                        className={ `kenzap-container ${ this.mediaQueries( attributes.containerMaxWidth ) } `}
                        style={ kenzapContanerStyles }
                        >
                        <ul className="owl-carousel">
                            { attributes.items && attributes.items.map( ( item, index ) => (
                                <li>
                                    <a 
                                        href={ item.link ? item.link : 'javascript:;' }
                                        target={ item.linknew ? '_blank':'_self' }
                                    >
                                        <img
                                            src={ ( item.iconMediaUrl != '' ) ? item.iconMediaUrl : item.iconMediaUrl }
                                            alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                            style={ {
                                                cursor: 'pointer',
                                                position: 'relative',
                                            } }
                                            role="presentation"
                                        />
                                    </a>
                                </li>
                            ) ) }
                        </ul>
                    </div>
                </ContainerSave>
            </div>
        );
    }
}
