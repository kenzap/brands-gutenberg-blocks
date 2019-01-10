<?php
/**
 * Plugin Name: Kenzap Brands Gutenberg Blocks
 * Plugin URI: https://github.com/kenzap/kenzap-brands-gutenberg-blocks/
 * Description: Easily create and customize brand, client blocks on your website
 * Author: Kenzap
 * Author URI: https://kenzap.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: kenzap-brands
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

//load body class
function kenzap_brands_body_class( $classes ) {

	if ( is_array($classes) ){ $classes[] = 'kenzap'; }else{ $classes.=' kenzap'; }
	return $classes;
}
add_filter( 'body_class', 'kenzap_brands_body_class' );
add_filter( 'admin_body_class', 'kenzap_brands_body_class' );

//Check plugin requirements
if (version_compare(PHP_VERSION, '5.6', '<')) {
    if (! function_exists('kenzap_brands_disable_plugin')) {
        /**
         * Disable plugin
         *
         * @return void
         */
        function kenzap_brands_disable_plugin(){

            if (current_user_can('activate_plugins') && is_plugin_active(plugin_basename(__FILE__))) {
                deactivate_plugins(__FILE__);
                unset($_GET['activate']);
            }
        }
    }

    if (! function_exists('kenzap_brands_show_error')) {
        /**
         * Show error
         *
         * @return void
         */
        function kenzap_brands_show_error(){

            echo '<div class="error"><p><strong>Kenzap Brands Gutenberg Blocks</strong> need at least PHP 5.6 version, please update php before installing the plugin.</p></div>';
        }
    }

    //Add actions
    add_action('admin_init', 'kenzap_brands_disable_plugin');
    add_action('admin_notices', 'kenzap_brands_show_error');

    //Do not load anything more
    return;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
