import { DateTime } from 'luxon';

/**
 * DateTime control.
 *
 * This control uses the Luxon time library to display time and date values. It will be attached to
 * `<time data-control="datetime">` elements.
 *
 * Usage:
 *
 * <time
 *      data-control="datetime"
 *      data-datetime="2014-11-19 01:21:57"
 *      data-format="dddd Do [o]f MMMM YYYY hh:mm:ss A"
 *      data-timezone="Australia/Sydney"
 *      data-locale="en-au">This text will be replaced</time>
 *
 * Alias options:
 *
 * time             -> 6:28 AM
 * timeLong         -> 6:28:01 AM
 * date             -> 04/23/2016
 * dateMin          -> 4/23/2016
 * dateLong         -> April 23, 2016
 * dateLongMin      -> Apr 23, 2016
 * dateTime         -> April 23, 2016 6:28 AM
 * dateTimeMin      -> Apr 23, 2016 6:28 AM
 * dateTimeLong     -> Saturday, April 23, 2016 6:28 AM
 * dateTimeLongMin  -> Sat, Apr 23, 2016 6:29 AM
 *
 * @copyright 2022 Winter.
 * @author Ben Thomson <git@alfreido.com>
 */
export default class DateTimeControl extends Snowboard.PluginBase {
    /**
     * Constructor.
     *
     * @param {HTMLElement} element
     */
    construct(element) {
        this.element = element;
        this.config = this.snowboard.dataConfig(this, element);

        this.appTimezone = this.getAppTimezone();
        this.backendTimezone = this.getBackendTimezone();
        this.backendLocale = this.getBackendLocale();
        this.format = this.getFormat();

        if (!this.config.get('datetime')) {
            throw new Error('The "datetime" attribute is required for a DateTime control.');
        }

        this.updateElement();
    }

    /**
     * Sets the default options for this widget.
     *
     * Available options:
     *
     * - `data-datetime=""`: The date and time to format. This is required.
     * - `data-format=""`: The format to use for the date and time. See the DateTimeControl class docs for available formats.
     * - `data-format-alias=""`: An alternate way of defining the format, by using the alias as opposed to the format code.
     * - `data-ignore-timezone`: If set, the user and default timezone will be ignored and set to UTC.
     * - `data-time-since`: If set, the time will be displayed as a time since the given date.
     * - `data-time-tense`: If set, the time will be displayed in a full tense format.
     *
     * @returns {Object}
     */
    defaults() {
        return {
            datetime: null,
            format: 'ccc ff',
            formatAlias: null,
            ignoreTimezone: false,
            timeSince: false,
            timeTense: false,
        };
    }

    /**
     * Updates the element with the formatted date and time.
     */
    updateElement() {
        this.element.innerText = this.getFormattedValue();
    }

    /**
     * Gets the formatted date and time.
     *
     * @returns {String}
     */
    getFormattedValue() {
        const dateObj = DateTime.fromSQL(this.config.get('datetime'), {
            zone: this.appTimezone,
        }).setLocale(this.backendLocale).setZone(this.backendTimezone);

        if (this.config.get('timeSince')) {
            return dateObj.toRelative();
        }
        if (this.config.get('timeTense')) {
            const weekAgo = DateTime.now().minus({ weeks: 1 });
            if (weekAgo < dateObj) {
                // Add tooltip for full date
                this.element.setAttribute('title', dateObj.toFormat(this.format));
                this.element.setAttribute('data-toggle', 'tooltip');

                const relativeDate = dateObj.toRelativeCalendar({ unit: 'days' });
                return relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1);
            }
        }
        return dateObj.toFormat(this.format);
    }

    /**
     * Returns a map of format aliases to their format codes.
     *
     * @returns {Object}
     */
    formatAliases() {
        return {
            time: 't',
            timeLong: 'tt',
            date: 'D',
            dateMin: 'D',
            dateLong: 'DDD',
            dateLongMin: 'DD',
            dateTime: 'fff',
            dateTimeMin: 'ff',
            dateTimeLong: 'ffff',
            dateTimeLongMin: 'ccc ff',
        };
    }

    /**
     * Gets the configured format for this dateTime control.
     *
     * @returns {String}
     */
    getFormat() {
        if (
            this.config.get('formatAlias')
            && Object.keys(this.formatAliases()).includes(this.config.get('formatAlias'))
        ) {
            return this.formatAliases()[this.config.get('formatAlias')];
        }

        return this.config.get('format');
    }

    /**
     * Gets the app default timezome.
     *
     * @returns {String}
     */
    getAppTimezone() {
        return this.config.get('ignoreTimezone')
            ? 'UTC'
            : this.getMetaValue('app-timezone', 'UTC');
    }

    /**
     * Gets the backend timezone, which is user-configurable.
     *
     * @returns {String}
     */
    getBackendTimezone() {
        return this.config.get('ignoreTimezone')
            ? 'UTC'
            : this.getMetaValue('backend-timezone', 'UTC');
    }

    /**
     * Gets the backend locale.
     *
     * @returns {String}
     */
    getBackendLocale() {
        return this.getMetaValue('backend-locale', 'en-US');
    }

    /**
     * Gets the value from a given meta tag.
     *
     * @param {String} name
     * @param {*} defaultValue
     * @returns {String}
     */
    getMetaValue(name, defaultValue = null) {
        const meta = document.querySelector(`meta[name="${name}"]`);

        if (!meta) {
            return defaultValue;
        }

        return meta.getAttribute('content');
    }
};
