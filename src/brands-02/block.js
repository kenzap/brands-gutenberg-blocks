import './style.scss';
import './editor.scss';
import Edit from './edit';
import Save from './save';
import { blockProps } from '../commonComponents/container/container';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 

/**
 * Provides the initial data for new block
 * @type {{title: string, icon: string, iconMediaId: string, iconMediaUrl: string, description: string}}
 */
export const defaultItem = {
    title: __( 'Kenzap brands blocks' ),
    iconMediaId: '',
    iconMediaUrl: window.kenzap_brands_assets + 'client2-7.png',
    ilv: false,
    link: '',
    linknew: false
};

export const defaultSubBlocks = JSON.stringify( [
    { ...defaultItem, key: 'default1', iconMediaUrl: window.kenzap_brands_assets + 'client2-1.png' },
    { ...defaultItem, key: 'default2', iconMediaUrl: window.kenzap_brands_assets + 'client2-2.png' },
    { ...defaultItem, key: 'default3', iconMediaUrl: window.kenzap_brands_assets + 'client2-3.png' },
    { ...defaultItem, key: 'default4', iconMediaUrl: window.kenzap_brands_assets + 'client2-4.png' },
    { ...defaultItem, key: 'default5', iconMediaUrl: window.kenzap_brands_assets + 'client2-5.png' },
    { ...defaultItem, key: 'default6', iconMediaUrl: window.kenzap_brands_assets + 'client2-6.png' },
    { ...defaultItem, key: 'default7', iconMediaUrl: window.kenzap_brands_assets + 'client2-7.png' },
    { ...defaultItem, key: 'default8', iconMediaUrl: window.kenzap_brands_assets + 'client2-8.png' },
    { ...defaultItem, key: 'default9', iconMediaUrl: window.kenzap_brands_assets + 'client2-9.png' },
    { ...defaultItem, key: 'default10', iconMediaUrl: window.kenzap_brands_assets + 'client2-10.png' },
    { ...defaultItem, key: 'default11', iconMediaUrl: window.kenzap_brands_assets + 'client2-11.png' },
    { ...defaultItem, key: 'default12', iconMediaUrl: window.kenzap_brands_assets + 'client2-12.png' },
    { ...defaultItem, key: 'default13', iconMediaUrl: window.kenzap_brands_assets + 'client2-13.png' },
    { ...defaultItem, key: 'default14', iconMediaUrl: window.kenzap_brands_assets + 'client2-14.png' },
    { ...defaultItem, key: 'default15', iconMediaUrl: window.kenzap_brands_assets + 'client2-15.png' },
    { ...defaultItem, key: 'default16', iconMediaUrl: window.kenzap_brands_assets + 'client2-16.png' },
    { ...defaultItem, key: 'default17', iconMediaUrl: window.kenzap_brands_assets + 'client2-17.png' },
    { ...defaultItem, key: 'default18', iconMediaUrl: window.kenzap_brands_assets + 'client2-18.png' },
] );

/**
 * Generate inline styles for custom settings of the block
 * @param {Object} attributes - of the block
 * @returns {Node} generated styles
 */
export const getStyles = attributes => {
    const vars = {
    };

    const kenzapContanerStyles = {
        maxWidth: `${ attributes.containerMaxWidth === '100%' ? '100%' : attributes.containerMaxWidth + 'px' }`,
        '--maxWidth': `${ attributes.containerMaxWidth === '100%' ? '100wh' : attributes.containerMaxWidth + ' ' } `,
    };

    return {
        vars,
        kenzapContanerStyles,
    };
};

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'kenzap/brands-02', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Kenzap Brands 2' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'partners' ),
		__( 'clients' ),
		__( 'companies' ),
	],
	anchor: true,
    html: true,
    supports: {
        align: [ 'full', 'wide' ],
    },
    attributes: {
        ...blockProps,
        
        align: {
            type: 'string',
            default: 'full',
        },

        iconSize: {
            type: 'number',
            default: 130,
        },

        carousel: {
            type: 'boolean',
            default: true,
        },

        iconSpace: {
            type: 'number',
            default: 0,
        },

        cSize: {
            type: 'number',
            default: 10,
        },

        items: {
            type: 'array',
            default: [],
        },

        isFirstLoad: {
            type: 'boolean',
            default: true,
        },

        blockUniqId: {
            type: 'number',
            default: 0,
        },
    },
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: ( props ) => {

        if ( props.attributes.items.length === 0 && props.attributes.isFirstLoad ) {
            props.setAttributes( {
                items: [ ...JSON.parse( defaultSubBlocks ) ],
                isFirstLoad: false,
            } );
       
            props.attributes.items = JSON.parse( defaultSubBlocks );
            if ( ! props.attributes.blockUniqId ) {
                props.setAttributes( {
                    blockUniqId: new Date().getTime(),
                } );
            }
        }
        
		return ( <Edit { ...props } /> );
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {

        return ( <Save { ...props } /> );
	},
} );
