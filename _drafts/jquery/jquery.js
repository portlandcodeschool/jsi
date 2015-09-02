// getter/setter

// chain

// badge grid
function badgeGrid(container, user) {
  this.$el = $(container); 
  this.badgeCount = function() {
    return user.badges.length;
  };
  this.badges = user.badges;
  this.render = function() {
    var height = Math.ceil(this.badgeCount()/6);
    this.$el.html('');

    var $grid = $('<table>');
    for (var i = 0; i < height; i++) {
      var $row = $('<tr>').appendTo($grid);
      for (var j = 0; j < 6; j++) {
        var cellId = i * 6 + j;
        if(cellId < this.badgeCount()) {
          var badge = this.badges[cellId];
          var $cell = $('<td class="badge" id="badge' + cellId + '">').appendTo($row);
          $('<img src="' + badge.icon_url + '">').appendTo($cell);
        }
      }
    }
    $grid.appendTo(this.$el);
  };
}
