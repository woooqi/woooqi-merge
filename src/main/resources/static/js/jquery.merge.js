/*
 * jQuery Merge Plugin
 * version: 0.0.1-2018.05.04
 * Requires jQuery v1.9 or later
 * Copyright (c) 2018 WoooQi
 * Examples and documentation at: https://github.com/woooqi/woooqi-merge
 * Project repository: https://github.com/woooqi/woooqi-merge
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/woooqi/woooqi-merge#copyright-and-license
 */
;(function($) {
	$.fn.mergeCell = function(options) {
		return this.each(function() {
			var cols = options.cols;
			var rows = options.rows;
			for (var j = rows[0]; j < rows[1]; j++) {
				mergeRowCell($(this), j,cols[1]);
			}
			for (var i = cols[1] - 1; i>=cols[0]; i--) {
				mergeColCell($(this), i,rows[1]);
			}
			dispose($(this));
		});
	};
	function mergeColCell($table, colIndex,rowNum) {
		$table.data('col-content', ''); 
		$table.data('col-rowspan', 1);
		$table.data('col-td', $()); 
		$table.data('rowNum', rowNum); 
		$('tbody tr', $table).each(
				function(index) {
					var $td = $('td:eq(' + colIndex + ')', this);
					var currentContent = $td.html();
					if ($table.data('col-content') == '') {
						$table.data('col-content', currentContent);
						$table.data('col-td', $td);
					} else {
						if ($table.data('col-content') == currentContent) {
							var rowspan = $table.data('col-rowspan') + 1;
							$table.data('col-rowspan', rowspan);
							$td.hide();
							if (++index == $table.data('rowNum')){
								$table.data('col-td').attr('rowspan',$table.data('col-rowspan'));
							}
						} else { 
							if ($table.data('col-rowspan') != 1) {
								$table.data('col-td').attr('rowspan',$table.data('col-rowspan'));
							}
							$table.data('col-td', $td);
							$table.data('col-content', $td.html());
							$table.data('col-rowspan', 1);
						}
					}
				});
	}
	function mergeRowCell($table, rowIndex,colNum){
		$table.data('row-content', ''); 
		$table.data('row-colspan', 1);
		$table.data('row-td', $()); 
		$table.data('colNum', colNum); 
		$('tbody tr', $table).each(function(index) {
			if(rowIndex == index){
				$('td', this).each(
						function(i){
							var $td = $(this);
							var currentContent = $td.html();
							if ($table.data('row-content') == '') {
								$table.data('row-content', currentContent);
								$table.data('row-td', $td);
							}else{
								if ($table.data('col-content') == currentContent || currentContent == '') {
									var colspan = $table.data('row-colspan') + 1;
									$table.data('row-colspan', colspan);
									$td.hide();
									if (++i == $table.data('colNum')){
										$table.data('row-td').attr('colspan',$table.data('row-colspan'));
									}
								}else{
									if ($table.data('row-colspan') != 1) {
										$table.data('row-td').attr('colspan',$table.data('row-colspan'));
									}
									$table.data('row-td', $td);
									$table.data('row-content', $td.html());
									$table.data('row-colspan', 1);
								}
							}
						});
				
			}
		});
	}
	function dispose($table) {
		$table.removeData();
	}
})(jQuery);