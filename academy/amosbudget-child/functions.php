<?php
/**
 * Amos Budget Child Theme Functions
 *
 * @package AmosBudgetChildTheme
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue parent and child theme styles
 */
function amosbudget_child_enqueue_styles() {
    // Enqueue parent theme stylesheet
    wp_enqueue_style('amosbudget-parent-style', get_template_directory_uri() . '/style.css');

    // Enqueue child theme stylesheet
    wp_enqueue_style('amosbudget-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('amosbudget-parent-style'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'amosbudget_child_enqueue_styles');

/**
 * Add custom functions below this line
 * The child theme allows you to make modifications without touching the parent theme
 *
 * Examples:
 *
 * - Add custom post types
 * - Modify theme behavior
 * - Add custom shortcodes
 * - Override parent theme functions
 */

/*
 * Example: Custom shortcode
 *
 * function custom_shortcode() {
 *     return '<p>Hello from child theme!</p>';
 * }
 * add_shortcode('custom', 'custom_shortcode');
 */
