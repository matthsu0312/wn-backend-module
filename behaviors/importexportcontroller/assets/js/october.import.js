/*
 * Scripts for the Import/Export controller behavior.
 */
+function ($) { "use strict";

    var ImportBehavior = function() {

        this.bindColumnSorting = function() {
            /*
             * Unbind existing
             */
            $('#importDbColumns > ul, .import-column-bindings > ul').each(function(){
                var $this = $(this)
                if ($this.data('oc.sortable')) {
                    $this.sortable('destroyGroup')
                    $this.sortable('destroy')
                }
            })

            var sortableOptions = {
                group: 'import-fields',
                usePlaceholderClone: true,
                nested: false,
                onDrop: $.proxy(this.onDropColumn, this)
            }

            $('#importDbColumns > ul, .import-column-bindings > ul').sortable(sortableOptions)
        }

        this.onDropColumn = function ($dbItem, container, _super, event) {
            var
                dbColumnName = $dbItem.data('column-name'),
                $dbItemMatchInput = $('[data-column-match-input]' , $dbItem),
                $fileColumns = $('#importFileColumns'),
                $fileItem,
                isMatch = $.contains($fileColumns.get(0), $dbItem.get(0)),
                matchColumnId

            /*
             * Has a previous match?
             */
            matchColumnId = $dbItem.data('column-matched-id')
            if (matchColumnId !== null) {
                $fileItem = $('[data-column-id='+matchColumnId+']', $fileColumns)
                this.toggleMatchState($fileItem)
            }

            /*
             * Is a new match?
             */
            if (isMatch) {
                $fileItem = $dbItem.closest('[data-column-id]'),
                matchColumnId = $fileItem.data('column-id')

                this.toggleMatchState($fileItem)

                $dbItem.data('column-matched-id', matchColumnId)
                $dbItemMatchInput.attr('name', 'column_match['+matchColumnId+'][]')
                $dbItemMatchInput.attr('value', dbColumnName)
            }
            else {
                $dbItem.removeData('column-matched-id')
                $dbItemMatchInput.attr('name', '');
                $dbItemMatchInput.attr('value', '');
            }

            _super($dbItem, container)
        }

        this.toggleMatchState = function ($container) {
            var hasItems = !!$('.import-column-bindings li', $container).length
            $container.toggleClass('is-matched', hasItems)
        }

        this.ignoreFileColumn = function(el) {
            var $el = $(el),
                $column = $el.closest('[data-column-id]')

            $column.addClass('is-ignored')
            $('#showIgnoredColumnsButton').removeClass('disabled')
        }

        this.showIgnoredColumns = function(el) {
            $('#importFileColumns li.is-ignored').removeClass('is-ignored')
            $('#showIgnoredColumnsButton').addClass('disabled')
        }

        this.loadFileColumnSample = function(el) {
            var $el = $(el),
                $column = $el.closest('[data-column-id]'),
                columnId = $column.data('column-id')

            $el.popup({
                handler: 'onImportLoadColumnSampleForm',
                extraData: {
                    file_column_id: columnId
                }
            })
        }

        this.processImport = function () {
            var $form = $('#importFileColumns').closest('form')

            $form.request('onImport')
        }
    }

    $.oc.importBehavior = new ImportBehavior;
}(window.jQuery);