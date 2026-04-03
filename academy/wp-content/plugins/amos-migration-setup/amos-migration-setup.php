<?php
/**
 * Plugin Name: Amos Migration Setup
 * Description: Automatic WordPress migration setup
 * Version: 1.0
 * Author: Migration Script
 * 
 * Copy this file to: wp-content/plugins/amos-migration-setup/amos-migration-setup.php
 * OR as mu-plugin: wp-content/mu-plugins/amos-migration-setup.php
 * 
 * Then access: /wp-admin/ and the setup will run automatically
 */

// Auto-execute on admin load
add_action('admin_init', 'amos_migration_auto_setup');

function amos_migration_auto_setup() {
    
    // Check if already run (safety check)
    if (get_option('amos_migration_complete')) {
        return;
    }
    
    // Only run once per session
    if (!isset($_SESSION['amos_migration_running'])) {
        $_SESSION['amos_migration_running'] = true;
        
        // Execute setup
        amos_migration_setup();
        
        // Mark as complete
        update_option('amos_migration_complete', true);
    }
}

function amos_migration_setup() {
    
    // ============ CREATE CATEGORIES ============
    $categories = array(
        'AI in Finance',
        'AI בפיננסים',
        'Automation',
        'אוטומציה',
        'CFO',
        'ChatGPT Projects',
        'Finance Tools',
        'כלי פיננסיים',
        'P&L Analysis',
        'ניתוח דוחות',
        'Small Business',
        'עסקים קטנים',
        'ERP',
        'Cash Flow',
        'תזרים מזומנים',
        'Power BI',
        'דו"חות'
    );
    
    foreach ($categories as $cat_name) {
        $term = get_term_by('name', $cat_name, 'category');
        if (!$term) {
            wp_insert_term($cat_name, 'category');
        }
    }
    
    // ============ CREATE PAGES ============
    $pages = array(
        array('title' => 'Register', 'slug' => 'register', 'content' => '[simple-membership-register redirect="member-dashboard"]'),
        array('title' => 'Login', 'slug' => 'login', 'content' => '[simple-membership-login redirect="member-dashboard"]'),
        array('title' => 'Pricing', 'slug' => 'pricing', 'content' => '[simple-membership-pricing-table]' . "\n\n" . '[simple-membership-checkout]'),
        array('title' => 'Dashboard', 'slug' => 'dashboard', 'content' => '[simple-membership-profile]'),
        array('title' => 'Member Dashboard', 'slug' => 'member-dashboard', 'content' => '[simple-membership-profile]'),
    );
    
    foreach ($pages as $page) {
        $existing = get_page_by_title($page['title']);
        if (!$existing) {
            wp_insert_post(array(
                'post_title' => $page['title'],
                'post_content' => $page['content'],
                'post_name' => $page['slug'],
                'post_status' => 'publish',
                'post_type' => 'page'
            ));
        }
    }
    
    // ============ SET RTL LANGUAGE ============
    update_option('blogname', 'Amos Budget Academy');
    update_option('WPLANG', 'he_IL');
    
    // ============ ADD RTL CSS ============
    $rtl_css = '
    /* RTL Support */
    html[lang="he-IL"], html[lang="he"] {
        direction: rtl;
        text-align: right;
    }
    body[dir="rtl"] {
        direction: rtl;
        text-align: right;
    }
    .entry-content {
        text-align: right;
        direction: rtl;
    }
    .comment {
        margin-right: 50px;
        margin-left: 0;
        text-align: right;
    }
    ';
    
    set_theme_mod('custom_css', get_theme_mod('custom_css') . $rtl_css);
    
    // ============ SETUP COMPLETED ============
    error_log('✅ Amos Migration Setup Complete!');
}

// Add admin notice
add_action('admin_notices', function() {
    if (get_option('amos_migration_complete')) {
        ?>
        <div class="notice notice-success is-dismissible">
            <p><strong>✅ Migration Setup Complete!</strong></p>
            <p>Categories, pages, and RTL support configured.</p>
            <p><strong>Next:</strong> Import Blogger content via Tools → Import</p>
        </div>
        <?php
    }
});
?>
