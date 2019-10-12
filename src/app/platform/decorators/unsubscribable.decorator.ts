import { Subscription } from 'rxjs';

import { BaseComponent } from '../helpers/base.component';

export function Unsubscribable<T extends BaseComponent>() {
    return function(target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any) => Subscription>) {
        return {
            value(...args: any[]) {
                const result = descriptor.value.apply(this, args);
                this.subscriptions.push(result);
                return result;
            },
        };
    };
}
