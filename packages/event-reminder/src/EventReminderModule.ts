import { NativeModule, requireNativeModule } from 'expo';
import { EventReminderModuleEvents, ProductReminderResult } from './EventReminder.types';

declare class EventReminderModule extends NativeModule<EventReminderModuleEvents> {
  // Calendar functions
  requestCalendarPermission(): Promise<boolean>;
  addProductReminder(productName: string): Promise<ProductReminderResult>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<EventReminderModule>('EventReminder');
