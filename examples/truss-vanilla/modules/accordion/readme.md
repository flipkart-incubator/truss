
SAMPLE CONFIG :

/**
 * Accordion module
 *
 * USAGE:
 * The module placeholders contains the following items:
 *  autoCollapse : BOOLEAN (defaults to true)
 *  useCSS : BOOLEAN (defaults to false) : Set to true to enable class changes to the body div
 *   whenever it is opened or closed.
 *  items: ARRAY - Each object in the items array should specift a header config, a body config,
 *      and optionally can contain a isOpen and alwaysRerender fields
 *      - header : String or Object
 *      - body : String or Object
 *          - Both header or body, if objects, should specify either (templateURL and templateData)
 *          or (moduleName and modulePlaceholders)
 *      - isOpen : BOOLEAN - Should the item body be open when first rendered.
 *      - alwaysRerender: Should the body sub-module be re-rendered whenever the accordion item is opened.
 */


import datepickerInstance from 'modules/datepicker';
import accordionInstance from 'modules/accordion';

export default {
    modules: [
        {
            moduleName: 'accordion',
            instanceConfig: {
                container: '#accordion',
                placeholders: {
                    autoCollapse: true,
                    items: [
                        {
                            header: 'Header 1',
                            body: 'Body 1',
                            isOpen: true

                        },{
                            header: 'Header 2',
                            body: {
                                moduleName: 'datepickerModule',
                                instanceConfig:{
                                    placeholders: {
                                        options: {
                                            minDate: '-3m',
                                            maxDate: '-1d',
                                            placeholder: 'Enter the start date...',
                                            dateFormat: 'yy-mm-dd',
                                            defaultDate: new Date(new Date() - 1296e6)
                                        }
                                    }
                                },
                                instance: datepickerInstance
                            },
                            isOpen: true
                        }
                    ]
                }
            },
            instance: accordionInstance
        }
    ]
};
