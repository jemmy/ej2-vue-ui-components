import Vue from 'vue';
import { isUndefined } from '@syncfusion/ej2-base';
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { Accordion } from '@syncfusion/ej2-navigations';
import { AccordionItemsDirective, AccordionItemDirective, AccordionItemsPlugin, AccordionItemPlugin } from './items.directive'


export const properties: string[] = ['animation', 'dataSource', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'expandMode', 'expandedIndices', 'headerTemplate', 'height', 'itemTemplate', 'items', 'locale', 'width', 'clicked', 'created', 'destroyed', 'expanded', 'expanding'];
export const modelProps: string[] = ['expandedIndices'];

/**
 * Represents the VueJS Accoridon Component.
 * ```html
 * <ejs-accordion></ejs-accordion>
 * ```
 */
@EJComponentDecorator({
    props: properties,
    model: {
        event: 'modelchanged'
    }
})
export class AccordionComponent extends ComponentBase {
    
    public ej2Instances: any;
    public propKeys: string[] = properties;
    public models: string[] = modelProps;
    public hasChildDirective: boolean = true;
    protected hasInjectedModules: boolean = false;
    public tagMapper: { [key: string]: Object } = {"e-accordionitems":"e-accordionitem"};
    public tagNameMapper: Object = {"e-accordionitems":"e-items"};
    
    constructor() {
        super();
        this.ej2Instances = new Accordion({});        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;

        this.bindProperties();
        this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        this.ej2Instances.setProperties = this.setProperties;
    }
    public setProperties(prop: any, muteOnChange: boolean): void {
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map((key: string): void => {
                this.models.map((model: string): void => {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        this.$emit('update:' + key, prop[key]);
                    }
                });
            });
        }
    }
    public trigger(eventName: string, eventProp: {[key:string]:Object}, successHandler?: Function): void {
        if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
            let key: string[] = this.models.toString().match(/checked|value/) || [];
            let propKey: string = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                (this as any).$emit('update:'+ propKey, eventProp[propKey]);
                (this as any).$emit('modelchanged', eventProp[propKey]);
            }
        } else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
            let key: string[] = this.models.toString().match(/currentView|selectedDate/) || [];
            let propKey: string = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                (this as any).$emit('update:'+ propKey, eventProp[propKey]);
                (this as any).$emit('modelchanged', eventProp[propKey]);
            }
        }
        if (this.ej2Instances && this.ej2Instances._trigger) {
            this.ej2Instances._trigger(eventName, eventProp, successHandler);
        }            
    }

    public render(createElement: any) {
        return createElement('div', (this as any).$slots.default);
    }
    
    public addItem(item: Object | Object[] | Object | Object[], index?: number): void {
        return this.ej2Instances.addItem(item, index);
    }

    public enableItem(index: number, isEnable: boolean): void {
        return this.ej2Instances.enableItem(index, isEnable);
    }

    public expandItem(isExpand: boolean, index?: number): void {
        return this.ej2Instances.expandItem(isExpand, index);
    }

    public hideItem(index: number, isHidden?: Object): void {
        return this.ej2Instances.hideItem(index, isHidden);
    }

    public refresh(): void {
        return this.ej2Instances.refresh();
    }

    public removeItem(index: number): void {
        return this.ej2Instances.removeItem(index);
    }

    public select(index: number): void {
        return this.ej2Instances.select(index);
    }
}

export const AccordionPlugin = {
    name: 'ejs-accordion',
    install(Vue: any) {
        Vue.component(AccordionPlugin.name, AccordionComponent);
        Vue.component(AccordionItemPlugin.name, AccordionItemDirective);
        Vue.component(AccordionItemsPlugin.name, AccordionItemsDirective);

    }
}
