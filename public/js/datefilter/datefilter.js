/*
  Dependencies:
  moment
  jquery
  anime
  fontawesome
*/
function DateFilter(options) {
  options = options || {};

  // State
  this._isOpen = false;
  // Options
  this._current = options.current || new Date('');
  this._button = options.button;
  this._level = options.level || 'month';
  this._range = options.range || 6;
  this._onDataChange = options.onDataChange;

  // Button
  $(this._button).addClass('datefilter-btn');
  $(this._button).append('<span class="datefilter-btn-content">'+
                          moment(this._current).format('MMM YYYY')
                          +'</span>');

  // Date options
  const choices = this._generateChoices(this._current, this._level, this._range);
  this._menu = $('body').prepend('<div class="datefilter-menu datefilter-hidden">\
    <button class="datefilter-backward">\
      <i class="fas fa-angle-left"></i>\
    </button>\
    <div class="datefilter-choices">'+
      choices
    +'</div>\
    <button class="datefilter-forward">\
      <i class="fas fa-angle-right"></i>\
    </button>\
  </div>');

  // Button click event
  this._button.click(() => {
    this._isOpen = ! this._isOpen;
    if(this._isOpen) {
      this.open();
    } else {
      this.close();
    }

  });
  // On selection
  $('.datefilter-choice').on('click', (e) => {
    const date = $(e.target).attr('date');
    if(this._onDataChange) this._onDataChange(date)

    this._isOpen = ! this._isOpen;
    this.close();
  });
  return this;
}
DateFilter.prototype.open = () => {
  // TODO: Change both button and roll out
  var cssProperties = anime({
    targets: '.datefilter-menu',
    width: '1400px',
    opacity: 1,
    easing: 'easeOutElastic',
    elasticity: 100,
    duration: 500,
    complete: () => {
      $('.datefilter-menu').removeClass('datefilter-hidden');
    }
  });

  return this;
}
DateFilter.prototype.close = () => {
  // TODO: Change both button and roll out
  $('.datefilter-menu').addClass('datefilter-hidden');
  var cssProperties = anime({
    targets: '.datefilter-menu',
    width: '0px',
    opacity: 0,
    easing: 'easeInOutCubic',
    elasticity: 100,
    duration: 500
  });

  return this;
}
DateFilter.prototype._generateChoices = (_today, level, range) => {
  const today = _today || new Date(),
        year = today.getFullYear(),
        month = today.getMonth();
  let html = '';

  if(level === 'month') {
    const firstDay = moment(new Date(year, month, 1));
    html += '<ul>';
    for(let i = 0; i < range; i++) {
      const data = firstDay.format('YYYY-MM-DD HH:mm:ss');
      const str = firstDay.format('MMM YYYY');
      html+=`<li><a href="#" class="datefilter-choice" date="${data}">${str}</a></li>`;
      
      firstDay.add(1, 'months');
    }
    html += '</ul>';
  } else {

  }

  return html;
}
