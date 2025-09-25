import { NativeModule, requireNativeModule } from 'expo';

import { EventReminderModuleEvents } from './EventReminder.types';

declare class EventReminderModule extends NativeModule<EventReminderModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<EventReminderModule>('EventReminder');
