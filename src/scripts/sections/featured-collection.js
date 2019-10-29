/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {register} from '@shopify/theme-sections';
import $ from 'jquery';
import Flickity from 'flickity';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {

  init() {

    const selectors = {
      carouselAddToCart: '.carousel-cell__add-cart',
      siteHeaderCart: '.site-header__cart'
    }

    // Initialise Flickity
    var carousel = document.querySelector('.main-carousel');
    var flkty = new Flickity( carousel, {
      cellAlign: 'left',
      contain: true
    });

    // AJAX quick add to cart
    $(selectors.carouselAddToCart).on('click', function() {
      let productId = $(this).data('variant-id');
      let quantity = $(this).data('quantity');

      $.ajax({
        type: "POST",
        url: '/cart/add.js',
        data: {
          quantity: quantity,
          id: productId
        },
        success: function() {
          /**
          * On successful add, highlight cart icon
          * This a basic user feedback and should be replaced, possibly 
          * with pop-up notification
          */
          $(selectors.siteHeaderCart).css('color', '#59c359')
          setInterval( function() {
            $(selectors.siteHeaderCart).css('color', '#9B9B9B'); 
          }, 2000);
        }
      });
    })
  },

  publicMethod() {
    // Custom public section method
  },

  _privateMethod() {
    // Custom private section method
  },

  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    // Do something when a section instance is loaded
    this.init();
  },

  // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  onUnload() {
    // Do something when a section instance is unloaded
  },

  // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  onSelect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  onDeselect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  onBlockSelect() {
    // Do something when a section block is selected
  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  onBlockDeselect() {
    // Do something when a section block is deselected
  },
});
