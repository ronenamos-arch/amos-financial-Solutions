<?php
define( 'WP_CACHE', true );

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u596170547_DV3A0' );

/** Database username */
define( 'DB_USER', 'u596170547_c9icK' );

/** Database password */
define( 'DB_PASSWORD', 'zrHr88GcHJ' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '}tmw{LSlXd.|JF*&gV31*fI*{SwJdc$eu&o}6hbc?QEu6^K<jS>EVmlddj>]P4/m' );
define( 'SECURE_AUTH_KEY',   ']qB_g^=[JQ9uI=*pDFBj/53k>-DGHY}X~xMXb/!p2Jo&&!;f?3? uja/TsF(yTKx' );
define( 'LOGGED_IN_KEY',     '({eH|l~NQIr3^HmDX{9&{m;&46VGf>$;9> k*|ejZkkc?#Xw$P;;(HdpQ}*K2Q7p' );
define( 'NONCE_KEY',         'gWL8,z!inFw[3f )dMv[#l;ped.>D]r7ZycScx?Eo0PdQIK]BgUP}.m_4n>e+pe.' );
define( 'AUTH_SALT',         'L63*o8W^ZZBevHl;`:?0e0@?0udmCQK6J4]D-t+nxZ{h~v+*Rh%BgM0?G9s{eC0N' );
define( 'SECURE_AUTH_SALT',  '<e.At0fMWHj:r2(EV|^;(8.+IIy^w f=|38c/>X@.$X*:QEW+wmW:r AZIN9hlup' );
define( 'LOGGED_IN_SALT',    'gRzJ6N.pHto@cQ]g`t`Gzq#]LB$;[RYH{z&LGbVE]FP8I!R:FM[wJ buAuFmFT,X' );
define( 'NONCE_SALT',        'uG=iyZ[k%[|pk!#~%`H2Tqy}T )@xi&uI;wfVh,$qxVf8>H&=v<aQ6_Pt7kcHXv_' );
define( 'WP_CACHE_KEY_SALT', 'D9%(}6XG{_REk;U`tcgsNY563W|(. A@a}$wKBK52TK-o%|?a#V?}afk@l!bhVC?' );
define('JWT_AUTH_SECRET_KEY', '*aM0(wxcPWV7ZEZ)amjpdtj<?]$#P}_.wUgZU^]c#z(Hcb=hk#XcPsEYj%]@9]L(');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', 'bd152469c09c634233ec6b01a2500ca4' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';