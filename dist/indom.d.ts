/*! InDom v1.0.1 MIT */
/**
 * Callback type returned by .on()/.onRemove() and accepted by .off()
 */
export type InDomHandler = EventListener | (() => void);
/**
 * Represents any normalized value that an InDom element can produce.
 * May be a string, array of strings, FileList, number, or null.
 */
export type InDomValue = string | string[] | FileList | null;
/**
 * Map of field names to their values, supporting nested objects for grouped dynamic fields.
 */
export type InDomValuesMap = Record<string, InDomValue | Record<string, InDomValue>>;
/**
 * Acceptable child types for insertion methods like append, prepend, before, after.
 */
export type InDomChild = string | Node | InDom;
/**
 * One or more children, or a single array of them (flattened internally).
 */
export type InDomChildren = InDomChild | InDomChild[];
/**
 * Array-like container for bulk DOM element operations.
 * Extends Array to provide chainable bulk operations on multiple InDom objects.
 *
 * @extends Array<InDom>
 */
export declare class InDomArray extends Array<InDom> {
    #private;
    constructor();
    constructor(length: number);
    /**
     * Creates a new InDomArray instance.
     * @param {...InDom} items - InDom objects to include in the array
     */
    constructor(...items: InDom[]);
    /**
     * Sets an attribute on all objects in the array.
     *
     * @param {string} k - Attribute name
     * @param {any} v - Attribute value (converted to string)
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If an element's underlying DOM node has been removed
     */
    setAttr(k: string, v: any): this;
    /**
     * Removes an attribute on all objects in the array.
     *
     * @param {string} k - Attribute name
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If an element's underlying DOM node has been removed
     */
    removeAttr(k: string): this;
    /**
     * Sets data attribute or in-memory data on all objects.
     * Only available for connected elements to guarantee cleanup and single-instance consistency.
     *
     * @param {any} k - Data key
     * @param {any} v - Data value
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     * @throws {Error} If any element is disconnected or DOM not ready
     */
    setData(k: any, v: any): this;
    /**
     * Removes data attribute or in-memory data on all objects.
     * Only available for connected elements to guarantee cleanup and single-instance consistency.
     *
     * @param {any} k - Data key
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     * @throws {Error} If any element is disconnected or DOM not ready
     */
    removeData(k: any): this;
    /**
     * Sets form value on all objects.
     *
     * @param {InDomValue} v - Value to assign
     * @param {Document | Element | InDom} [c] - Optional container for grouped inputs
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    setValue(v: InDomValue, c?: Document | Element | InDom): this;
    /**
     * Sets innerHTML on all objects.
     *
     * @param {string} c - HTML content
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    setHtml(c: string): this;
    /**
     * Sets style properties on all objects.
     *
     * @param {string | Record<string, string>} k - CSS property name or object map
     * @param {string} [v] - Value when `k` is a string
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    setStyle(k: string | Record<string, string>, v?: string): this;
    /**
     * Adds CSS classes to all objects.
     *
     * @param {...string} names - Class names to add
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    addClass(...names: string[]): this;
    /**
     * Removes CSS classes from all objects.
     *
     * @param {...string} names - Class names to remove
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    removeClass(...names: string[]): this;
    /**
     * Appends children to all objects.
     *
     * @param {...InDomChildren} children - Children to append
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    append(...children: InDomChildren[]): this;
    /**
     * Prepends children to all objects.
     *
     * @param {...InDomChildren} children - Children to prepend
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    prepend(...children: InDomChildren[]): this;
    /**
     * Inserts nodes or HTML after all objects (as next siblings).
     *
     * @param {...InDomChildren} siblings - Siblings to insert after
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    after(...siblings: InDomChildren[]): this;
    /**
     * Inserts nodes or HTML before all objects (as previous siblings).
     *
     * @param {...InDomChildren} siblings - Siblings to insert before
     * @returns {this} The current InDomArray for chaining
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    before(...siblings: InDomChildren[]): this;
    /**
     * Registers event listener(s) on all elements. Auto-removed on element removal.
     *
     * @param type - Event type or array of types
     * @param fn   - Handler function. Omit for mouse/click to auto-trigger
     * @param opts - Event options (once, passive, etc.)
     * @returns Array of handlers (one per element)
     * @throws If any element is disconnected or DOM not ready
     */
    on(type: string, fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler[];
    on(type: string[], fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * Adds one-time event listeners to all objects.
     *
     * @param {string} type - Event type
     * @param {(n: InDom, e: Event) => void} [fn] - Handler function
     * @param {AddEventListenerOptions} [opts={}] - Options
     * @returns {InDomHandler[]} Array of handlers
     */
    once(type: string, fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * Removes event listener(s) registered with `.on()`, its shorthand methods, or `onRemove()`.
     *
     * @param {string} [type] - Event type
     * @param {InDomHandler[]} [fnArr] - Handlers to remove
     * @returns {this} The current InDomArray for chaining
     * @throws {RangeError} If fnArr length doesn’t match array length
     * @throws {TypeError} If `type` is provided but is not a non-empty string
     * @throws {Error} If an element of an InDom object in the array has been removed
     */
    off(type?: string, fnArr?: InDomHandler[]): this;
    /**
     * Adds `click` event listeners to all objects in the array.
     *
     * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function to attach.
     *        Omit to trigger all existing click listeners programmatically.
     * @param {AddEventListenerOptions} [opts] - Optional event listener options (e.g. `once`, `passive`).
     * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
     *
     * @throws {Error} If auto-trigger is used with a non-mouse event.
     * @throws {TypeError} If `fn` is provided but not a function.
     * @throws {Error} If an element’s underlying DOM node has been removed.
     * @throws {Error} If an element’s underlying DOM node is not connected to the document.
     */
    onClick(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * Adds `dblclick` (double-click) event listeners to all objects in the array.
     *
     * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function to attach.
     *        Omit to trigger all existing double-click listeners programmatically.
     * @param {AddEventListenerOptions} [opts] - Optional event listener options.
     * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
     *
     * @throws {Error} If auto-trigger is used with a non-mouse event.
     * @throws {TypeError} If `fn` is provided but not a function.
     * @throws {Error} If an element’s underlying DOM node has been removed.
     * @throws {Error} If an element’s underlying DOM node is not connected to the document.
     */
    onDoubleClick(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * Adds `mouseenter` event listeners to all objects in the array.
     *
     * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function to attach.
     *        Omit to trigger all existing mouseenter listeners programmatically.
     * @param {AddEventListenerOptions} [opts] - Optional event listener options.
     * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
     *
     * @throws {Error} If auto-trigger is used with a non-mouse event.
     * @throws {TypeError} If `fn` is provided but not a function.
     * @throws {Error} If an element’s underlying DOM node has been removed.
     * @throws {Error} If an element’s underlying DOM node is not connected to the document.
     */
    onEnter(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * Adds `mouseleave` event listeners to all objects in the array.
     *
     * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function to attach.
     *        Omit to trigger all existing mouseleave listeners programmatically.
     * @param {AddEventListenerOptions} [opts] - Optional event listener options.
     * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
     *
     * @throws {Error} If auto-trigger is used with a non-mouse event.
     * @throws {TypeError} If `fn` is provided but not a function.
     * @throws {Error} If an element’s underlying DOM node has been removed.
     * @throws {Error} If an element’s underlying DOM node is not connected to the document.
     */
    onLeave(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * Adds `focus` event listeners to all objects in the array.
     *
     * @param {(n: InDom, e: FocusEvent) => void} [fn] - Handler function to attach.
     *        Omit to trigger all existing focus listeners programmatically.
     * @param {AddEventListenerOptions} [opts] - Optional event listener options.
     * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
     *
     * @throws {Error} If auto-trigger is used with a non-mouse event.
     * @throws {TypeError} If `fn` is provided but not a function.
     * @throws {Error} If an element’s underlying DOM node has been removed.
     * @throws {Error} If an element’s underlying DOM node is not connected to the document.
     */
    onFocus(fn?: (n: InDom, e: FocusEvent) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * Adds `blur` event listeners to all objects in the array.
     *
     * @param {(n: InDom, e: FocusEvent) => void} [fn] - Handler function to attach.
     *        Omit to trigger all existing blur listeners programmatically.
     * @param {AddEventListenerOptions} [opts] - Optional event listener options.
     * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
     *
     * @throws {Error} If auto-trigger is used with a non-mouse event.
     * @throws {TypeError} If `fn` is provided but not a function.
     * @throws {Error} If an element’s underlying DOM node has been removed.
     * @throws {Error} If an element’s underlying DOM node is not connected to the document.
     */
    onBlur(fn?: (n: InDom, e: FocusEvent) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * Adds `change` event listeners to all objects in the array.
     *
     * @param {(n: InDom, e: Event) => void} [fn] - Handler function to attach.
     *        Omit to trigger all existing change listeners programmatically.
     * @param {AddEventListenerOptions} [opts] - Optional event listener options.
     * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
     *
     * @throws {Error} If auto-trigger is used with a non-mouse event.
     * @throws {TypeError} If `fn` is provided but not a function.
     * @throws {Error} If an element’s underlying DOM node has been removed.
     * @throws {Error} If an element’s underlying DOM node is not connected to the document.
     */
    onChange(fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler[];
    /**
     * For each InDom object in this InDomArray:
     * Registers a callback function that runs after the object's internal state
     * (listeners, data) has been cleaned up, and just before its element is removed from the DOM.
     *
     * @param {(n: InDom) => void} fn - Handler function
     * @returns {InDomHandler[]} Array of handlers
     * @throws {Error} If any element is disconnected or DOM not ready
     */
    onRemove(fn: (n: InDom) => void): InDomHandler[];
    /**
     * Cleans the internal state of the InDom objects of the array and removes their underlying DOM elements from the document.
     *
     * @throws {Error} If any element’s underlying DOM node has been removed
     */
    remove(): void;
    /**
     * Executes a function for each InDom in the array.
     *
     * @param {(n: InDom, index: number, array: InDom[]) => void} fn - Callback
     * @returns {this} The current InDomArray for chaining
     */
    each(fn: (n: InDom, index: number, array: InDom[]) => void): this;
    filter<S extends InDom>(predicate: (value: InDom, index: number, array: InDom[]) => value is S, thisArg?: any): InDomArray;
    filter(predicate: (value: InDom, index: number, array: InDom[]) => unknown, thisArg?: any): InDomArray;
    filter(arg: string): InDomArray;
}
/**
 * Main InDom class — contains a single DOM element per instance and provides a modern,
 * chainable API for querying, manipulation, events, data storage, and lifecycle handling with built-in safety.
 */
export declare class InDom {
    #private;
    /**
     * Creates an InDom object that contains an Element or the Document,
     * or from an HTML string that produces a single Element.
     *
     * @param {Document | Element | string} source - DOM Element or HTML string of a DOM element
     * @throws {TypeError} If the source is not a valid DOM Element or HTML string of a single DOM Element
     */
    constructor(source: Document | Element | string);
    /**
     * Starts the global MutationObserver that automatically destroys InDom objects
     * when their underlying elements are removed from the DOM.
     *
     * Safe to call multiple times; subsequent calls have no effect once initialized.
     */
    static init(): void;
    /**
     * Checks whether the DOM content has been loaded
     * and the global InDom MutationObserver is initialized.
     *
     * @returns {boolean} True if InDom is ready
     */
    static isReady(): boolean;
    /**
     * Registers a function to run when the DOM is ready
     * (executed immediately if already ready).
     *
     * @param {() => void} fn - The callback function
     * @throws {TypeError} If the handler is not a function
     */
    static onReady(fn: () => void): void;
    /**
     * Queries the DOM using a CSS selector and returns an InDomArray of InDom objects
     * for each matching element. Returns an empty array if no matches found.
     *
     * @param {string} selector - The CSS selector to match
     * @param {ParentNode | InDom} [container=document] - The container to search within
     * @returns {InDomArray} - InDomArray object of InDom instances
     */
    static get(selector: string, container?: ParentNode | InDom): InDomArray;
    /**
     * Queries the DOM using a CSS selector and returns an InDom object
     * for the first matching element, or `null` if none found.
     *
     * @param {string} selector - The CSS selector to match
     * @param {ParentNode | InDom} [container=document] - The container element or InDom object to search within
     * @returns {InDom | null} - InDom object for the first match, or null if none
     */
    static getOne(selector: string, container?: ParentNode | InDom): InDom | null;
    /**
     * Fetches the element with the specified ID and returns an InDom object that contains it.
     * Returns `null` if no element with the given ID is found.
     *
     * @param {string} id - The ID of the element to fetch
     * @returns {InDom | null} - InDom object or null if not found
     */
    static getById(id: string): InDom | null;
    /**
     * Harvests form-field values into a plain object.
     *
     * - `getValues()` → all fields in document
     * - `getValues('name','size')` → only listed fields
     * - `getValues(container)` → all fields, scoped to container
     * - `getValues('name','size',container)` → scoped to container
     * - `getValues('name_')` → groups dynamic fields name_123, name_456 …
     * - `getValues([])` → all fields, no underscore grouping
     *
     * @param {...(string | string[] | InDom)} args - Field names or an InDom container
     * @returns {InDomValuesMap} Map of field names → normalized values
     * @throws {TypeError} If a given field name is not a non-empty string
     */
    static getValues(...args: (string | string[] | InDom)[]): InDomValuesMap;
    /**
     * Inserts nodes or HTML before the first child of the underlying element of this object.
     * Accepts multiple arguments or a single array (flattened internally).
     *
     * @param {...InDomChildren} children - Content to insert (variadic; a single array is allowed and will be flattened)
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    prepend(...children: InDomChildren[]): this;
    /**
     * Inserts nodes or HTML after the last child of the underlying element of this object.
     * Accepts multiple arguments or a single array (flattened internally).
     *
     * @param {...InDomChildren} children - Content to insert (variadic; a single array is allowed and will be flattened)
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    append(...children: InDomChildren[]): this;
    /**
     * Inserts nodes or HTML before the underlying element of this object
     * (as previous siblings). Accepts multiple arguments or a single array
     * (flattened internally).
     *
     * @param {...InDomChildren} siblings - Content to insert (variadic; a single array is allowed and will be flattened)
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    before(...siblings: InDomChildren[]): this;
    /**
     * Inserts nodes or HTML after the underlying element of this object
     * (as next siblings). Accepts multiple arguments or a single array
     * (flattened internally).
     *
     * Multiple items are processed in reverse order so that the first
     * argument appears first in the DOM.
     *
     * @param {...InDomChildren} siblings - Content to insert (variadic; a single array is allowed and will be flattened)
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    after(...siblings: InDomChildren[]): this;
    /**
     * Registers an event listener that is automatically removed when the element is
     * removed from the DOM (no matter how), preventing memory leaks.
     *
     * If no handler is provided and the event is a mouse/click event, it is auto-triggered.
     *
     * @param {string | string[]} type - Event type (e.g. `"click"`, `"keydown"`) or array of event types
     * @param {(n: InDom, e: Event) => void} [fn] - Handler function. Omit for mouse/click events to trigger automatically.
     * @param {AddEventListenerOptions} [opts] - Event options (`once`, `passive`, etc.)
     * @returns {InDomHandler} The internal wrapped handler. Pass it to `.off()` to remove manually.
     * @throws {Error} If the element is not connected to the document or DOM not ready
     * @throws {Error} If auto-trigger is used with non-mouse events
     * @throws {TypeError} If handler is not a function (when provided)
     */
    on(type: string, fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler;
    on(type: string[], fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Removes event listener(s) registered with `.on()`, its shorthand methods, or `onRemove()`.
     *
     * @param {string} [type] - Event type. If omitted, **all** listeners are removed.
     * @param {InDomHandler} [fn] - Handler returned by `.on()` / `.onRemove()`. If omitted, **all** listeners of `type` are removed.
     * @returns {this} The current InDom instance (chainable)
     * @throws {TypeError} If `type` is provided but is not a non-empty string
     * @throws {Error} If the underlying element has been removed
     */
    off(type?: string, fn?: InDomHandler): this;
    /**
     * Registers an event listener that fires only once, then removes itself.
     *
     * @param {string} type - Event type, e.g. `'click'`, `'keydown'`
     * @param {(n: InDom, e: Event) => void} [fn] - Handler function. Omit for mouse/click to auto-trigger event.
     * @param {AddEventListenerOptions} [opts] - Optional listener options (`passive`, `capture`, etc.)
     * @returns {InDomHandler} The internal wrapped listener (pass to `.off()` to remove manually)
     *
     * @throws {Error} If DOM is not ready or element is not connected
     * @throws {TypeError} If handler is not a function (when provided)
     */
    once(type: string, fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Registers a `click` event listener.
     * Omit the handler to auto-trigger a click immediately.
     *
     * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function or omit to trigger.
     * @param {AddEventListenerOptions} [opts] - Optional listener options.
     * @returns {InDomHandler} Wrapped listener.
     *
     * @throws {Error} If DOM not ready or element not connected
     * @throws {TypeError} If handler is not a function
     */
    onClick(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Registers a `dblclick` event listener.
     *
     * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function.
     * @param {AddEventListenerOptions} [opts] - Optional listener options.
     * @returns {InDomHandler} Wrapped listener.
     *
     * @throws {Error} If DOM not ready or element not connected
     * @throws {TypeError} If handler is not a function
     */
    onDoubleClick(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Registers a `mouseenter` event listener.
     *
     * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function.
     * @param {AddEventListenerOptions} [opts] - Optional listener options.
     * @returns {InDomHandler} Wrapped listener.
     *
     * @throws {Error} If DOM not ready or element not connected
     * @throws {TypeError} If handler is not a function
     */
    onEnter(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Registers a `mouseleave` event listener.
     *
     * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function.
     * @param {AddEventListenerOptions} [opts] - Optional listener options.
     * @returns {InDomHandler} Wrapped listener.
     *
     * @throws {Error} If DOM not ready or element not connected
     * @throws {TypeError} If handler is not a function
     */
    onLeave(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Registers a `focus` event listener.
     *
     * @param {(n: InDom, e: FocusEvent) => void} [fn] - Handler function.
     * @param {AddEventListenerOptions} [opts] - Optional listener options.
     * @returns {InDomHandler} Wrapped listener.
     *
     * @throws {Error} If DOM not ready or element not connected
     * @throws {TypeError} If handler is not a function
     */
    onFocus(fn?: (n: InDom, e: FocusEvent) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Registers a `blur` event listener.
     *
     * @param {(n: InDom, e: FocusEvent) => void} [fn] - Handler function.
     * @param {AddEventListenerOptions} [opts] - Optional listener options.
     * @returns {InDomHandler} Wrapped listener.
     *
     * @throws {Error} If DOM not ready or element not connected
     * @throws {TypeError} If handler is not a function
     */
    onBlur(fn?: (n: InDom, e: FocusEvent) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Registers a `change` event listener.
     *
     * @param {(n: InDom, e: Event) => void} [fn] - Handler function.
     * @param {AddEventListenerOptions} [opts] - Optional listener options.
     * @returns {InDomHandler} Wrapped listener.
     *
     * @throws {Error} If DOM not ready or element not connected
     * @throws {TypeError} If handler is not a function
     */
    onChange(fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler;
    /**
     * Registers a callback that runs after internal cleanup and just before removal from DOM.
     *
     * @param {(n: InDom) => void} fn - Callback to invoke before removal.
     * @returns {InDomHandler} Internal wrapped function — pass to `.off('onRemove', handler)` to unregister.
     *
     * @throws {TypeError} If `fn` is not a function
     * @throws {Error} If element is already removed
     */
    onRemove(fn: (n: InDom) => void): InDomHandler;
    /**
     *Exposes the underlying native DOM element (read-only reference).
     *
     * @returns {Document | Element} The underlying DOM element
     * @throws {Error} If the underlying element has been removed
     */
    el(): Document | Element;
    /**
     * Alias for {@link el}.
     * Exposes the underlying native DOM element (read-only reference).
     *
     * @returns {Document | Element} The underlying DOM element
     * @throws {Error} If the underlying element has been removed
     */
    getElement(): Document | Element;
    /**
     * Adds one or more CSS classes to the underlying element.
     *
     * @param {...string} names - Class names to add (variadic)
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    addClass(...names: string[]): this;
    /**
     * Tests whether the underlying element has the given CSS class.
     *
     * @param {string} name - Class name to test
     * @returns {boolean} `true` if the class is present, `false` otherwise
     * @throws {Error} If the underlying element has been removed
     */
    hasClass(name: string): boolean;
    /**
     * Removes one or more CSS classes from the underlying element.
     *
     * @param {...string} names - Class names to remove (variadic)
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    removeClass(...names: string[]): this;
    /**
     * Checks if the underlying element has an attribute.
     *
     * @param {string} k - Attribute name
     * @returns {boolean} `true` if the attribute exists, `false` otherwise
     * @throws {Error} If the underlying element has been removed
     */
    hasAttr(k: string): boolean;
    /**
     * Gets the value of an attribute of the underlying element.
     *
     * @param {string} k - Attribute name
     * @returns {string | null} The attribute value, or `null` if not present
     * @throws {Error} If the underlying element has been removed
     */
    getAttr(k: string): string | null;
    /**
     * Sets an attribute value on the underlying element.
     *
     * @param {string} k - Attribute name
     * @param {any} v - Attribute value (converted to string)
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    setAttr(k: string, v: any): this;
    /**
     * Removes an attribute from the underlying element.
     *
     * @param {string} k - Attribute name
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    removeAttr(k: string): this;
    /**
     * Checks if the underlying element has a `data-*` attribute
     * or if the InDom object has in-memory data for this key.
     *
     * @param {any} k - The data key
     * @returns {boolean} `true` if the data key exists, either as attribute or in memory
     * @throws {Error} If the underlying element has been removed
     */
    hasData(k: any): boolean;
    /**
     * Reads a `data-*` attribute or in-memory data.
     * Only available for connected elements to guarantee cleanup and single-instance consistency.
     *
     * @param {any} k - The data key
     * @returns {any} The value from `data-*` attribute or in-memory store
     * @throws {Error} If the element is not connected or removed
     */
    getData(k: any): any;
    /**
     * Stores a `data-*` attribute or in-memory data.
     * Only available for connected elements to guarantee cleanup and single-instance consistency.
     *
     * @param {any} k - The data key
     * @param {any} v - The value to store
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the element is not connected or removed
     */
    setData(k: any, v: any): this;
    /**
     * Removes a `data-*` attribute or in-memory data.
     * Only available for connected elements to guarantee cleanup and single-instance consistency.
     *
     * @param {any} k - The data key
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the element is not connected or removed
     */
    removeData(k: any): this;
    /**
     * Sets the `innerHTML` of the underlying element.
     *
     * @param {string} content - The new HTML content to set
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     */
    setHtml(content: string): this;
    /**
     * Returns the `innerHTML` of the underlying element.
     *
     * @returns {string} The current HTML content of the element
     * @throws {Error} If the underlying element has been removed
     */
    getHtml(): string;
    /**
     * Sets style properties (object map or single prop/value).
     *
     * @param {string | Record<string, string>} key - Property name or object map
     * @param {string} [value] - Value when first argument is a string
     * @returns {this} The current InDom instance (chainable)
     * @throws {Error} If the underlying element has been removed
     * @throws {TypeError} If the argument is not an object or string
     */
    setStyle(key: string | Record<string, string>, value?: string): this;
    /**
     * Gets computed CSS values for the underlying element.
     *
     * @returns {CSSStyleDeclaration} - When called with no arguments
     * @throws {Error} If the underlying element has been removed
     */
    getStyle(): CSSStyleDeclaration;
    /**
     * Gets a single computed CSS value.
     *
     * @param {string} property - The CSS property name (dash-case)
     * @returns {string} - The computed value
     * @throws {Error} If the underlying element has been removed
     */
    getStyle(property: string): string;
    /**
     * Gets multiple computed CSS values as an object map.
     *
     * @param {...string} properties - CSS property names (dash-case)
     * @returns {Record<string, string>} - Object of `{ prop: value }`
     * @throws {Error} If the underlying element has been removed
     */
    getStyle(...properties: string[]): Record<string, string>;
    /**
     * Checks if the underlying element matches a CSS selector.
     *
     * @param {string} selector - CSS selector to match against.
     * @returns {boolean} `true` if it matches, `false` otherwise
     * @throws {Error} If the underlying element has been removed
     */
    is(selector: string): boolean;
    /**
     * Gets the same InDom object if its underlying element matches the selector,
     * or the InDom object for its closest ancestor that matches,
     * or `null` if none match.
     *
     * @param {string} selector - CSS selector to test against.
     * @returns {InDom | null} The matching InDom object, or `null` if not found
     *
     * @throws {Error} If the underlying element has been removed
     */
    getSelfOrParent(selector: string): InDom | null;
    /**
     * Gets the closest ancestor that matches the selector, or the direct parent if no selector is provided.
     * (Important: does NOT include `this` element itself.)
     *
     * @param {string} [selector] - CSS selector to match against ancestors.
     *                              If omitted, returns the direct parent.
     * @returns {InDom | null} InDom object containing the parent/ancestor element, or `null` if not found
     * @throws {Error} If the underlying element has been removed
     */
    getParent(selector?: string): InDom | null;
    /**
     * Gets the previous sibling that matches the selector.
     * If no selector is supplied, the immediate previous element sibling is returned.
     * Returns `null` if nothing is found.
     *
     * @param {string} [selector] - CSS selector to test against
     * @returns {InDom | null} Wrapped sibling or `null` if not found
     * @throws {Error} If the underlying element has been removed
     */
    getPrev(selector?: string): InDom | null;
    /**
     * Gets the next sibling that matches the selector.
     * If no selector is supplied, the immediate next element sibling is returned.
     * Returns `null` if nothing is found.
     *
     * @param {string} [selector] - CSS selector to test against
     * @returns {InDom | null} Wrapped sibling or `null` if not found
     * @throws {Error} If the underlying element has been removed
     */
    getNext(selector?: string): InDom | null;
    /**
     * Returns a DOMRect with the underlying element’s viewport-relative bounding box.
     *
     * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom
     * @throws {Error} If the underlying element has been removed
     */
    getBox(): DOMRect;
    /**
     * Returns a DOMRect that expands the underlying element’s bounding box by its margins.
     *
     * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom
     * @throws {Error} If the underlying element has been removed
     */
    getOuterBox(): DOMRect;
    /**
     * Returns a DOMRect with coordinates relative to the underlying element’s offset parent
     * (borders of the parent are excluded).
     *
     * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom
     * @throws {Error} If the underlying element has been removed
     */
    getRelativeBox(): DOMRect;
    /**
     * Returns the current value of the element, normalized for its type.
     *
     * - Single value inputs (`input`, `textarea`, etc.): string
     * - `select` (single): string or `null`
     * - `select` (multiple): array of selected values or empty array
     * - `input[type=checkbox]`: array of checked values
     * - `input[type=radio]`: string of checked value or `null`
     * - `input[type=file]`: `FileList` (zero or more files)
     *
     * @param {Document | Element | InDom} [container] - Scope for checkbox and radio group lookups.
     *        When provided, only searches within this container for related elements. Defaults to `document`.
     * @returns {string | string[] | FileList | null}
     * @throws {Error} If the underlying element has been removed
     */
    getValue(container?: Document | Element | InDom): InDomValue;
    /**
     * Sets the element’s value, normalised for its type.
     * - `input`, `textarea`: value is coerced to string.
     * - `select` (single): chooses the matching option.
     * - `select` (multiple): array of values to select.
     * - `input[type=checkbox]` / `input[type=radio]` (same name group): array of values to check.
     *
     * @param {string | string[]} value - Value(s) to assign
     * @param {Document | Element | InDom} [container] - Scope for checkbox and radio group lookups.
     *        When provided, only searches within this container for related elements. Defaults to `document`.
     * @returns {this} The current InDom instance (chainable)
     * @throws {TypeError} If the element has no writable value
     * @throws {Error} If the underlying element has been removed
     */
    setValue(value: string | string[], container?: Document | Element | InDom): this;
    /**
     * Removes the underlying DOM element from the document and cleans the internal state.
     * Automatically invoked if the element is removed externally.
     *
     * @returns {void}
     * @throws {Error} If the underlying element has already been removed
     */
    remove(): void;
}
/**
 * Shortcut for {@link InDom.get}, returning a collection of elements.
 *
 * @function
 * @param {string|NodeListOf<Element>|Element[]|InDom[]} source - CSS selector, NodeList, array of elements, or InDom objects.
 * @param {Element|Document} [root=document] - Search root for CSS selector queries.
 * @returns {InDomArray} A wrapped collection of matching elements.
 */
export declare const $a: typeof InDom.get;
/**
 * Shortcut for {@link InDom.getOne}, returning the first matching element.
 *
 * @function
 * @param {string|Element|InDom} source - CSS selector, Element, or InDom instance.
 * @param {Element|Document} [root=document] - Search root for CSS selector queries.
 * @returns {InDom | null} Wrapped single element, or `null` if not found.
 */
export declare const $1: typeof InDom.getOne;
/**
 * Shortcut for {@link InDom.getById}, returning a single element by ID.
 *
 * @function
 * @param {string} id - The element’s ID (without `#`).
 * @returns {InDom | null} Wrapped element, or `null` if not found.
 */
export declare const $id: typeof InDom.getById;
/**
 * Shortcut constructor for creating a new {@link InDom} wrapper.
 *
 * @function
 * @param {Element|Document|string} source - DOM element, document, or CSS selector.
 * @returns {InDom} Wrapped instance for the element(s).
 */
export declare const $n: (source: Element | Document | string) => InDom;
/**
 * Shortcut for {@link InDom.getValues}, extracting normalized values from a form or container.
 *
 * @function
 * @param {Element|Document|InDom} container - Container element or wrapper.
 * @returns {InDomValuesMap} Object mapping field names to their values.
 */
export declare const $v: typeof InDom.getValues;
