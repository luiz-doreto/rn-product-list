import ExpoModulesCore
import EventKit

public class EventReminderModule: Module {

  private let eventStore = EKEventStore()
  
  public func definition() -> ModuleDefinition {
    Name("EventReminder")

    AsyncFunction("requestCalendarPermission", { (promise: Promise) in
      if #available(iOS 17.0, *) {
        self.eventStore.requestFullAccessToEvents { granted, error in
          if let error = error {
            promise.resolve(false)
          } else {
            promise.resolve(granted)
          }
        }
      } else if #available(iOS 13.0, *) {
        // iOS 13-16 uses the write access request
        self.eventStore.requestAccess(to: .event) { granted, error in
          if let error = error {
            promise.resolve(false)
          } else {
            promise.resolve(granted)
          }
        }
      } else {
        promise.resolve(false)
      }
    })
    
    AsyncFunction("addProductReminder") { (productName: String) in
        // Check calendar access permission
        let authStatus: EKAuthorizationStatus
        if #available(iOS 17.0, *) {
          authStatus = EKEventStore.authorizationStatus(for: .event)
        } else {
          authStatus = EKEventStore.authorizationStatus(for: .event)
        }
        
        switch authStatus {
        case .authorized, .fullAccess:
          let event = EKEvent(eventStore: self.eventStore)
          event.title = "Buy \(productName)"
          event.notes = "Reminder to purchase \(productName)"
          
          let tomorrow = Calendar.current.date(byAdding: .day, value: 1, to: Date()) ?? Date()
          let noon = Calendar.current.date(bySettingHour: 12, minute: 0, second: 0, of: tomorrow) ?? tomorrow
          
          event.startDate = noon
          event.endDate = Calendar.current.date(byAdding: .hour, value: 1, to: noon) ?? noon
          
          let alarm = EKAlarm(relativeOffset: -3600) // 1 hour in seconds
          event.addAlarm(alarm)

          event.calendar = self.eventStore.defaultCalendarForNewEvents
          
          do {
            try self.eventStore.save(event, span: .thisEvent)
            return [
              "success": true,
              "eventId": event.eventIdentifier ?? "",
              "message": "Reminder set for \(productName)"
            ]
          } catch {
            throw error
          }
          
        case .denied, .restricted:
          throw NSError(domain: "EventReminder", code: 403, userInfo: [NSLocalizedDescriptionKey: "Calendar access permission denied"])
          
        case .notDetermined:
          throw NSError(domain: "EventReminder", code: 401, userInfo: [NSLocalizedDescriptionKey: "Calendar permission not determined, request permission first"])
          
        @unknown default:
          throw NSError(domain: "EventReminder", code: 500, userInfo: [NSLocalizedDescriptionKey: "Unknown authorization status"])
        }
    }
  }
}
