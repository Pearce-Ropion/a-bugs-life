/**
 * @file
 * @summary A set of funtions that build the drop down menu options in a formrequired by semantic UI
 */

import { StatusTypes, ResolutionTypes } from './constants/Status';
import { PriorityLevels, SeverityLevels, ComponentTypes } from './constants/Ticket';
import { capitalize } from './Utils';

/**
 * @export
 * @constant {Object} sortOptions
 * @summary Available sorting options with their associated types. If a type !== 'base' then that is
 *          the name of the key within the object of the that property to use instead
 */
export const sortOptions = {
    summary: 'base',
    assignee: 'base',
    reporter: 'base',
    component: 'base',
    priority: 'level',
    severity: 'base',
    status: 'base',
    resolution: 'base',
    created: 'base',
    modified: 'base',
};

/**
 * @export
 * @function buildStaticOptions
 * @summary Builds the dropdown options for objects that have a simple key => string relationship
 *
 * @param {Object} options - the options to map
 * 
 * @return {Array} of dropdown menu options
 */
export const buildStaticOptions = options => {
    return Object.values(options).map((option, idx) => {
        return {
            key: idx,
            value: option,
            text: option,
        };
    });
};

/**
 * @export
 * @function buildArrayOptions
 * @summary Builds the dropdown options for arrays that contain strings
 *
 * @param {Array} options - the options to map
 * 
 * @return {Array} of dropdown menu options
 */
export const buildArrayOptions = options => {
    return options.map((option, idx) => {
        return {
            key: idx,
            value: option,
            text: option,
        };
    });
};

/**
 * @export
 * @function buildStatusOptions
 * @summary Builds the dropdown options for objects that have a name attribute
 *
 * @param {Object} options - the options to map
 * 
 * @return {Array} of dropdown menu options
 */
export const buildStatusOptions = options => {
    return Object.values(options).map((option, idx) => {
        return {
            key: idx,
            value: option.name,
            text: option.name,
        };
    });
};

/**
 * @export
 * @function buildIconOptions
 * @summary Builds the dropdown options for objects that have a name and icon attribute
 *
 * @param {Object} options - the options to map
 * 
 * @return {Array} of dropdown menu options
 */
export const buildIconOptions = options => {
    return Object.values(options).map((option, idx) => {
        return {
            key: idx,
            value: option.name,
            text: option.name,
            icon: option.icon,
        };
    });
};

/**
 * @export
 * @function sortDDoptions
 * @summary Builds the dropdown options for the sorting options
 *
 * @param {Object} options - the options to map
 * 
 * @return {Array} of dropdown menu options
 */
export const sortDDoptions = () => {
    return Object.keys(sortOptions).map(key => {
        return {
            key,
            value: key,
            text: capitalize(key),
        };
    });
};

/**
 * @export
 * @default
 * @constant {Object} DropdownOptions
 * @summary The available dropdown menu builders
 */
export default {
    StatusTypes: buildStatusOptions(StatusTypes),
    ResolutionTypes: buildStaticOptions(ResolutionTypes),
    PriorityLevels: buildIconOptions(PriorityLevels),
    SeverityLevels: buildStaticOptions(SeverityLevels),
    ComponentTypes: buildArrayOptions(ComponentTypes),
    SortingOptions: sortDDoptions(),
};

