/*
 * RecordFinder plugin
 *
 * Data attributes:
 * - data-control="recordfinder" - enables the plugin on an element
 * - data-option="value" - an option with a value
 *
 * JavaScript API:
 * $('a#someElement').recordFinder({ option: 'value' })
 *
 * Dependences:
 * - Some other plugin (filename.js)
 */

+function ($) { "use strict";

    var Base = $.oc.foundation.base,
        BaseProto = Base.prototype

    // RECORDFINDER CLASS DEFINITION
    // ============================

    var RecordFinder = function(element, options) {
        this.options   = options
        this.$el       = $(element)

        Base.call(this)
        this.init()
    }


    RecordFinder.prototype = Object.create(BaseProto)
    RecordFinder.prototype.constructor = RecordFinder

    RecordFinder.DEFAULTS = {
        refreshHandler: null,
        dataLocker: null
    }

    RecordFinder.prototype.init = function() {
        var self = this
        this.$el.on('dblclick', function () {
            $('.btn.find-record', self.$el).trigger('click')
        })

        this.$el.on('click', '.clear-record', this.proxy(this.clearRecord))
    }

    RecordFinder.prototype.updateRecord = function(linkEl, recordId) {
        if (!this.options.dataLocker) return
        var self = this
        $(this.options.dataLocker).val(recordId)

        this.$el.loadIndicator({ opaque: true })
        this.$el.request(this.options.refreshHandler, {
            success: function(data) {
                this.success(data)
                $(self.options.dataLocker).trigger('change')
            }
        })

        if(linkEl){
            $(linkEl).closest('.recordfinder-popup').popup('hide')
        }
    }

    RecordFinder.prototype.clearRecord = function() {
        this.updateRecord(false, '')
    }

    // RECORDFINDER PLUGIN DEFINITION
    // ============================

    var old = $.fn.recordFinder

    $.fn.recordFinder = function (option) {
        var args = Array.prototype.slice.call(arguments, 1), result
        this.each(function () {
            var $this   = $(this)
            var data    = $this.data('oc.recordfinder')
            var options = $.extend({}, RecordFinder.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('oc.recordfinder', (data = new RecordFinder(this, options)))
            if (typeof option == 'string') result = data[option].apply(data, args)
            if (typeof result != 'undefined') return false
        })

        return result ? result : this
    }

    $.fn.recordFinder.Constructor = RecordFinder

    // RECORDFINDER NO CONFLICT
    // =================

    $.fn.recordFinder.noConflict = function () {
        $.fn.recordFinder = old
        return this
    }

    // RECORDFINDER DATA-API
    // ===============
    $(document).render(function () {
        $('[data-control="recordfinder"]').recordFinder()
    })

}(window.jQuery);
