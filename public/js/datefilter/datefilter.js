/*
  Dependencies:
  moment
  jquery
  anime
  fontawesome
*/
(function() {
  this.DateFilter = function(options) {
    options = options || {};
    // State
    this._isOpen = false;
    // Target component
    this._button = options.button;
    // Options
    this._current = options.current || new Date('');
    this._level = options.level || 'month';
    this._range = options.range || 6;
    this._onDataChange = options.onDataChange;
    // Format
    this._buttonFormat = this._level === 'month'? 'MMM YYYY' : 'MMM DD YYYY';
    // Button
    $(this._button).addClass('datefilter-btn');
    $(this._button).append('<span class="datefilter-btn-content">'+
                            moment(this._current).format(this._buttonFormat)
                            +'</span>');
    // Month options
    const choices = this.generateChoices();
    $('body').prepend('<div class="datefilter-menu datefilter-hidden">\
      <div class="datefilter-months">\
        <button class="datefilter-backward"><i class="fas fa-angle-left"></i></button>\
        <div class="datefilter-choices">' + choices + '</div>\
        <button class="datefilter-forward"><i class="fas fa-angle-right"></i></button>\
      </div>\
    </div>');

    // Re-position menu (depends on date range)
    $('datefilter-menu').css('right', $(this._button).width() + 30);

    // Button click event
    this._button.on('click', (e) => {
      this._isOpen = ! this._isOpen;
      if(this._isOpen) this.open();
      else this.close();
    });
    // One selection of month
    $('.datefilter-choice').on('click', (e) => {
      const date = $(e.target).attr('date');
      if(this._level === 'month') {
        if(this._onDataChange) this._onDataChange(date)
        $('.datefilter-btn-content').text(moment(date).format(this._buttonFormat));
        this._isOpen = ! this._isOpen;
        this.close();
      } else {
        this.openDateOptions(new Date(date));
      }
    });

    return this;
  }

  DateFilter.prototype.openDateOptions = function(date) {
    // Adjust date
    $('.datefilter-dates').remove();
    const dates = this.generateDatesInMonth(date);
    $('.datefilter-menu')
      .append('<div class="datefilter-dates">' + dates + '</div>');
    // Date selection
    $('.datefilter-date-choice').on('click', (e) => {
      const date = $(e.target).attr('date');
      if(this._onDataChange) this._onDataChange(date)
      $('.datefilter-btn-content').text(moment(date).format(this._buttonFormat));
      this._isOpen = ! this._isOpen;
      this.close();
    });
    var cssProperties = anime({
      targets: '.datefilter-menu',
      height: '185px',
      easing: 'easeInOutCubic',
      elasticity: 100, duration: 300
    });
    return this;
  }

  // Public methods
  DateFilter.prototype.open = function() {
    // Animate the open of the menu
    var cssProperties = anime({
      targets: '.datefilter-menu',
      width: 1100, opacity: 1,
      easing: 'easeOutElastic',
      elasticity: 400, duration: 500,
      complete: () => {
        $('.datefilter-menu').removeClass('datefilter-hidden');
      }
    });

    return this;
  }
  DateFilter.prototype.close = function() {
    $('.datefilter-menu').addClass('datefilter-hidden');
    $('.datefilter-dates').remove();
    var cssProperties = anime({
      targets: '.datefilter-menu',
      width: '0px',
      opacity: 0,
      easing: 'easeInOutCubic',
      elasticity: 100, duration: 500,
      complete: () => $('.datefilter-menu').height(60)
    });
    return this;
  }

  DateFilter.prototype.generateChoices = function() {
    const today = this._current || new Date(),
          year = today.getFullYear(),
          month = today.getMonth();
    const firstDayOfMonth = moment(new Date(year, month, 1));

    // Move to starting of range
    firstDayOfMonth.add(-this._range+1, 'months');

    let html = '<ul>';
    for(let i = 0; i < this._range; i++) {
      const data = firstDayOfMonth.format('YYYY-MM-DD HH:mm:ss');
      const str = firstDayOfMonth.format('MMM YYYY');
      html+=`<li><a href="#" class="datefilter-choice" date="${data}">${str}</a></li>`;
      firstDayOfMonth.add(1, 'months');
    }
    html += '</ul>';
    return html;
  }

  DateFilter.prototype.generateDatesInMonth = function(date) {
    const today = date || new Date(),
          year = today.getFullYear(),
          month = today.getMonth();
    const firstDayOfMonth = moment(new Date(year, month, 1));

    let html = '';
    while(firstDayOfMonth.month() === month) {
      const data = firstDayOfMonth.format('YYYY-MM-DD HH:mm:ss');
      const str = firstDayOfMonth.format('DD');
      html+=`<div><a href="#" class="datefilter-date-choice" date="${data}">${str}</a></div>`;
      firstDayOfMonth.add(1, 'days');
    }
    return html;
  }
}());
