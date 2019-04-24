
/**
 *
 *  Main JavaScript
 *
 *  @package gleesik_scripts
 *
 **/

 // IIFE - Immediately Invoked Function Expression
(function($, window, document) {

  // The $ is now locally scoped

  // Listen for the jQuery ready event on the document
  $(function() {

    // The DOM is ready!

    // Global Variables
    var $window = $(window);

    /**
     *  Page Loader
     **/
    setTimeout(function() {
      $('.page-loader').addClass('load-complete');
    }, 1500);

    /**
     *  Parallax with Scrollax.js - Initialization
     **/
    'use strict';
    $.Scrollax();

    /**
     *  Main Menu Navigation
     **/
    var $body = $('body');
    var $nav_menu = $('.navigation-bar');
    var $nav_menu_link = $('#navMenu ul li a');
    var $toggle_menu_button = $('.navTrigger');

    // Navigation Menu Link
    $nav_menu_link.on('click', function() {

      // Select Current Navigation Item
      $nav_menu_link.parent().removeClass('current-menu-item');
      $(this).parent().addClass('current-menu-item');

      // Close Mobile Menu
      $nav_menu.removeClass('active');
      $toggle_menu_button.removeClass('active');
      $body.removeClass('no-scroll');

    });

    // Toggle Mobile Menu
    $toggle_menu_button.on('click', function() {
      $nav_menu.toggleClass('active');
      $body.toggleClass('no-scroll');
      $(this).toggleClass('active');
    });

    // Remove all classes on window resize
    $window.on('resize', function() {
      $nav_menu.removeClass('active');
      $body.removeClass('no-scroll');
      $toggle_menu_button.removeClass('active');
    });

    /**
     * Updating Article Links to open in new tabs
     */
    $('.article-content a').attr("target", "_blank");


    /**
     *  Video
     */
    var $site_header = $('.site-header');
    var $video_overlay = $site_header.find("#video_overlay");
    var $video_button = $site_header.find('#video_btn');

    $video_button.on('click', function(e) {
      e.preventDefault();
      //var $src = $(this).attr("href");
      var $iframe = '<iframe src="https://player.vimeo.com/video/318384993?autoplay=1" width="640" height="480" frameborder="0" allow="autoplay; fullscreen" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
      $video_overlay.html($iframe).fadeIn(200);

      // Lock Body Scroll
      $body.addClass('no-scroll');

    });
    // Hide Overlay Lightbox
    $video_overlay.on('click', function() {

      // Hide Overlay Image
      $(this).fadeOut(200);

      // Remove Image from DOM
      $video_overlay.children("iframe").remove();

      // Unlock Body Scroll
      $body.removeClass('no-scroll');

    });    
    
    /**
     *  Smooth Scrolling for Links
     **/
    $('a[href*="#"]:not([href="#"])').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
       var target = $(this.hash);
       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
       if (target.length) {
        $('html, body').animate({
           scrollTop: target.offset().top
        }, 1000);
        return false;
       }
      }
    });

  });

}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter
