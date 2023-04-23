//****************************************
// Website scripts
//****************************************
'use strict';

/** 
* Handle Load More
*/
const handleFilter = () => {
  // getFilterCategory
  let filterCategory = document.location.hash ? document.location.hash.substring(1) : '';
  filterCategory = filterCategory.includes('/portal/') ? '' : filterCategory === 'resources' ? '' : filterCategory;
  const resources = document.querySelector('.resources');
  const filters = document.querySelectorAll('.resources-filter a');
  const clearFilters = document.querySelector('.resource-btn.all');

  // check for filter on page load
  if (filters && clearFilters) {
    clearFilters.querySelector('span[data-count]').innerText = document.querySelectorAll('.js-resource-card').length;
    filters.forEach(el => { el.classList.remove('is-active')});
    const resourceFilter = resources.querySelector(`[href="#${filterCategory}"]`);
    if (resourceFilter) { resourceFilter.classList.add('is-active'); }
    filterResources(filterCategory);
    resources.setAttribute('data-category', filterCategory);
    filterCategory === '' ? clearFilters.classList.add('is-active') : clearFilters.classList.remove('is-active');
  }

  filters.forEach(el => {
    el.onclick = (e) => {
      clearFilters.classList.remove('is-active');
      filters.forEach(el => el.classList.remove('is-active'));
      el.classList.add('is-active');
      filterResources(el.getAttribute('data-category'));
      resources.setAttribute('data-category', el.getAttribute('data-category'));
      document.querySelector('#resources').scrollIntoView(true);
    }
  })

  if (clearFilters) {
    clearFilters.onclick = (e) => {
      clearFilters.classList.add('is-active');
      filters.forEach(el => el.classList.remove('is-active'));
      filterResources('');
      history.pushState(null, null, ' ');
      resources.setAttribute('data-category', 'all');
      document.querySelector('#resources').scrollIntoView(true);
    }
  }

  // set the filterCounts
  filterResourcesCount();
}

/** 
* Handle Load More
*/
const handleLoadMore = () => {
  // init
  const loadMoreBtn = document.querySelector('.js-load-more');

  if (loadMoreBtn && themeGlobal.lastPage) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('btn--disabled');
  }

  // event
  if (loadMoreBtn) {
    loadMoreBtn.onclick = (event) => {
      loadMorePosts(event.srcElement);
    }
  }
}

/** 
* Handle Image Gallery
*/
const handleImageGallery = () => {
  const galleryImages = document.querySelectorAll('.kg-gallery-image img');

  // Gallery style
  galleryImages.forEach(image => {
    image.setAttribute('alt', 'Gallery Image');
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = `${ratio} 1 0%`;
  })
}

/** 
* Handle Lightbox
*/
const handleLightbox = () => {
  if (!themeGlobal.imageLightbox) return

  const images = document.querySelectorAll('.kg-image-card img, .kg-gallery-card img');

  // Lighbox function
  images.forEach(image => {
    const link = image.parentNode.nodeName === 'A' ? image.parentNode.getAttribute('href') : '';
    var lightboxWrapper = link ? image.parentNode : document.createElement('a');

    lightboxWrapper.setAttribute('data-no-swup', '');
    lightboxWrapper.setAttribute('data-fslightbox', '');
    lightboxWrapper.setAttribute('href', image.src);
    lightboxWrapper.setAttribute('aria-label', 'Click for Lightbox');

    if (link) {
      var linkButton = document.createElement('a');
      linkButton.innerHTML = `<i class="icon icon-link icon--sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
          <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
        </svg>
      </i>`
      linkButton.setAttribute('class', 'image-link');
      linkButton.setAttribute('href', link);
      linkButton.setAttribute('target', '_blank');
      linkButton.setAttribute('rel', 'noreferrer noopener');
      lightboxWrapper.parentNode.insertBefore(linkButton, lightboxWrapper.parentNode.firstChild);
    } else {
      image.parentNode.insertBefore(lightboxWrapper, image.parentNode.firstChild);
      lightboxWrapper.appendChild(image);
    }
  });

  refreshFsLightbox();
}

/** 
* Handle Menu
*/
const handleMenu = () => {
  // menu
  const menu = document.querySelector('.js-menu');
  if (!menu) return; 
  
  // menu open
  const menuOpenBtn = document.querySelector('.js-menu-open');
  if (menuOpenBtn) {
    menuOpenBtn.onclick = (event) => {
      document.body.setAttribute('data-menu', 'open');
      menuCloseBtn.focus();
    }
  }

  // menu close
  const menuCloseBtn = document.querySelector('.js-menu-close');
  if (menuCloseBtn) {
    menuCloseBtn.onclick = (event) => {
      document.body.setAttribute('data-menu', 'closed');
      menuOpenBtn.focus();
    }
  }

  // Click event outside menu and not menu open button
  window.addEventListener('click', (event) => {
    if (!event.target.closest('.js-menu') && !event.target.closest('.js-menu-open, .js-member-btn, .js-exclude')) {
      if(!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){
        document.activeElement.blur();
      }
      document.body.setAttribute('data-menu', 'closed');
    }

    if (!event.target.closest('.js-search-modal,.js-search-open')) {
      const searchModal = document.querySelector('.js-search-modal');
      searchModal && searchModal.classList.remove('is-active');
    }
  });
}

/** 
* Handle Theme Toggle
*/
const handleColorScheme = () => {
  // handle change event
  const themeSelect = document.querySelector('.js-color-scheme-select');
  if (themeSelect) {
    themeSelect.onchange = (event) => {
      const options = event.target.options
      const theme = options[options.selectedIndex].value
      setTheme(theme);
    }
  }

  // set current value
  const option = themeSelect.querySelector(`[value=${document.documentElement.getAttribute('data-color-scheme')}]`)
  themeSelect.selectedIndex = option.index;
}

/** 
* Handle User Menu
*/
const handleUserMenu = () => {
  const memberBtn = document.querySelector('.js-member-btn');
  const memberMenu = document.querySelector('.js-member-menu');
  let isMemberFocus = false;
  if (memberBtn) {
    memberBtn.onfocus = (event) => {
      isMemberFocus=true;
      memberMenu.classList.add('is-active');
    }

    memberBtn.onblur = (event) => {
      isMemberFocus=false;
      memberMenu.classList.remove('is-active');
    }

    memberBtn.onclick = (event) => {
      !isMemberFocus ? memberMenu.classList.toggle('is-active')
                     : isMemberFocus = false;
    }
  }
}

/** 
* Handle Scroll Top
*/
const handleScrollTop = () => {
  const scrollTopBtn = document.querySelector('.js-scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.onclick = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
}


/** 
* Handle Floating Header
*/
const handleFloatingHeader = () => {

  const header = document.querySelector('.js-header');

  if (header && header.getAttribute('data-header') === 'floating') {
    var options = {
      offset : 100,
      tolerance : 0,
      classes : {
        initial : "is-floating",
        pinned : "is-pinned",
        unpinned : "is-unpinned",
        top : "is-top",
        notTop : "is-not-top",
        bottom : "is-bottom",
        notBottom : "is-not-bottom",
        frozen: "is-frozen",
      }
    };

    const headroom = new Headroom(header, options);
    headroom.init();
  }
}

/**
* Handle Keyboard events
*/
const handleKeyboardEvents = () => {
  // Key press event handling
  window.onkeydown = (evt) => {
    const sourceClass = evt.srcElement.className;

    switch(evt.key) {
      case 'Escape':
        removeClass('.js-menu', 'is-active');
        removeClass('.js-menu-toggle', 'is-active');
        removeClass('.js-search', 'is-active');
        document.activeElement.blur();
        document.body.setAttribute('data-menu', 'closed');
        break;
      default:
        break;// nothing to do
    }
  }
}

/**
* Handle Keyboard events
*/
const handleProgressBar = () => {
  const progressBar = document.querySelector('.progress-bar');

  if (progressBar) {
    window.addEventListener('scroll', (event) => {
      // Progressbar
      var scrollTop = document.querySelector('.post')["scrollTop"] ||
                      document.documentElement["scrollTop"] || 
                      document.body["scrollTop"];
  
      var scrollBottom = ( document.querySelector('.post')["scrollHeight"] ||
                          document.documentElement["scrollHeight"] ||
                          document.body["scrollHeight"] -
                          document.documentElement.scrollHeight);
  
      scrollPercent = Math.round(scrollTop / scrollBottom * 100) + "%";
      progressBar.style.setProperty("--scroll", scrollPercent);
    }, false);
  }
}

/** 
* Toggle Scheme
* @param
*/ 
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-color-scheme', theme);
  localStorage.setItem('PREFERRED_COLOR_SCHEME', theme);
}

/** 
* Toggle Class
* @param: el_class
* @param: target_class
*/ 
const toggleClass = (el_class, target_class) => {
  const el = document.querySelector(el_class);
  if (el) el.classList.toggle(target_class);
}

/** 
* Add Class
* @param: el_class
* @param: target_class
*/ 
const addClass = (el_class, target_class) => {
  const el = document.querySelector(el_class);
  if (el) el.classList.add(target_class);
}

/** 
* Remove Class
* @param: el_class
* @param: target_class
*/ 
const removeClass = (el_class, target_class) => {
  const el = document.querySelector(el_class);
  if (el) el.classList.remove(target_class);
}

/** 
* Check if element in Viewport
* @param: el
*/ 
const isInViewport = (el) => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return(
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

/** 
* Filter resources
* @param: button
*/ 
const filterResources = (category) => {
  const resourceCards = document.querySelectorAll('.js-resource-card');
  const resourceFeed = document.querySelector('.js-resources-feed');
  const resourceCount = document.querySelector('.js-resource-count');

  resourceCards.forEach(card => {
    const tags = card.getAttribute('data-tags').split(",");
    if ( tags.includes(category) || category === 'all' || category === '' ) {
      card.setAttribute('data-show', 'true')
    } else {
      card.setAttribute('data-show', 'false')
    }
  })

  const visibleResourceCount = document.querySelectorAll('.js-resource-card[data-show="true"').length;
  visibleResourceCount ? resourceFeed.classList.remove('not-found') : resourceFeed.classList.add('not-found');
  if (resourceCount) { resourceCount.innerText = visibleResourceCount }
}

/** 
* Filter resources count
* @param: button
*/ 
const filterResourcesCount = () => {
  const resourceCards = Array.from(document.querySelectorAll('.js-resource-card'));
  const filters = document.querySelectorAll('.resources-filter a');

  filters.forEach(filter => {
    const category = filter.getAttribute('data-category');
    const categoryCards = resourceCards.filter(card => {
      return card.getAttribute('data-tags').split(",").includes(category)
    })
    filter.querySelector('span[data-count]').innerText = categoryCards.length;
  })
}

/** 
* Load more posts
* @param: button
*/ 
const loadMorePosts = (button) => {
  // next link
  const nextPage = document.querySelector('link[rel=next]');
  themeGlobal.nextPageLink = nextPage && !themeGlobal.nextPageLink ? nextPage.getAttribute('href') : themeGlobal.nextPageLink;

  // Update current page value
  if (themeGlobal.nextPageLink && !themeGlobal.lastPage) {
    button ? button.classList.add('loading') : '';

    // Fetch next page content
    fetch(themeGlobal.nextPageLink).then(res => res.text())
    .then(text => new DOMParser().parseFromString(text, 'text/html'))
    .then(doc => {
      // Get posts
      const posts = doc.querySelectorAll('.js-resource-card');
      const postContainer = document.querySelector('.js-resources-feed');
      const nextPage = doc.querySelector('link[rel=next]');

      // Add each post to the page
      posts.forEach(post => {
        postContainer.appendChild(post);
      });

      // Update themeGlobalS
      themeGlobal.currentPage = themeGlobal.currentPage + 1;
      themeGlobal.nextPageLink =  nextPage ? nextPage.getAttribute('href') : '';
      themeGlobal.nextPage = themeGlobal.nextPageLink ? themeGlobal.nextPage + 1 : NaN;
      themeGlobal.lastPage = themeGlobal.currentPage === themeGlobal.maxPages ? true : false;

      // Disable button on last page
      if (button && themeGlobal.lastPage) {
        button.disabled = true;
        button.classList.add('btn--disabled');
      }

      button ? button.classList.remove('loading') : '';

      // Filter resources
      handleFilter();
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }
}

/** 
* DOM Loaded event
*/ 
const pageLoaded = () => {
  fitvids();
  handleFilter();
  handleLoadMore();
  handleImageGallery();
  handleLightbox();
  handleMenu();
  handleUserMenu();
  handleColorScheme();
  handleFloatingHeader();
  handleScrollTop();
  handleKeyboardEvents();
  handleProgressBar();

  addEventListener('hashchange', (event) => { 
    handleFilter();
  });
};

if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  pageLoaded();
} else {
  document.addEventListener('DOMContentLoaded', pageLoaded);
}