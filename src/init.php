<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function kenzap_brands_cgb_block_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'kenzap-brands', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Pass assets url variable to Gutenberg
	wp_add_inline_script( 'wp-blocks', 'var kenzap_brands_assets = "' .plugins_url( 'dist/images/', dirname( __FILE__ ) ).'"', 'before');

	// Include owl carousel script
	wp_enqueue_script( 
		'owl-carousel', 
		plugins_url( 'dist/assets/owl.carousel.min.js', dirname( __FILE__ ) ),
		array( 'jquery')
	);

	// Include owl carousel styles
	wp_enqueue_style( 
		'owl-carousel', 
		plugins_url( 'dist/assets/owl.carousel.min.css', dirname( __FILE__ ) )
	);

	wp_enqueue_script( 
		'owl-carusel', 
		plugins_url( 'brands-02/script.js', __FILE__ ), 
		array('owl-carousel', 'jquery') 
	);
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'kenzap_brands_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function kenzap_brands_cgb_editor_assets() { // phpcs:ignore
	
	// Scripts.
	wp_enqueue_script(
		'kenzap-brands-editor', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-compose' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'kenzap-brands-editor', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'kenzap_brands_cgb_editor_assets' );


echo plugin_basename( __FILE__ );
